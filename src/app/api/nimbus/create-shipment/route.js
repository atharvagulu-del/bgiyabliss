import { NextResponse } from 'next/server';
import { getNimbusToken } from '@/lib/nimbus';

// ── Shipping weight & dimensions lookup ──
// Keys are lowercase substrings matched against item names.
// weight = actual shipping weight in grams (with packaging)
// l/b/h = box dimensions in cm
const PRODUCT_SHIPPING_INFO = [
  // ── Specific product names FIRST (before generic weight patterns) ──
  { match: '5 in 1',            weight: 3700,  l: 30, b: 20, h: 20 },
  { match: '5 in one',          weight: 3700,  l: 30, b: 20, h: 20 },
  { match: '5-in-1',            weight: 3700,  l: 30, b: 20, h: 20 },
  { match: 'neem cake',         weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'cow manure',        weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'cow dung',          weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'organic manure',    weight: 5000,  l: 40, b: 25, h: 15 },
  // ── Generic weight-based patterns LAST ──
  { match: '10kg',              weight: 10500, l: 40, b: 30, h: 40 },
  { match: '10 kg',             weight: 10500, l: 40, b: 30, h: 40 },
  { match: '5kg',               weight: 5000,  l: 40, b: 25, h: 15 },
  { match: '5 kg',              weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'potting mix',       weight: 3700,  l: 40, b: 25, h: 15 },
];

// Default for anything not matched (small items like seeds, tools, etc.)
const DEFAULT_SHIPPING = { weight: 1000, l: 25, b: 15, h: 10 };

function getProductShipping(itemName) {
  const name = (itemName || '').toLowerCase();
  // Try matches in order — first match wins (10kg before generic potting mix)
  for (const entry of PRODUCT_SHIPPING_INFO) {
    if (name.includes(entry.match)) {
      return entry;
    }
  }
  return DEFAULT_SHIPPING;
}

function calculateShipmentDimensions(items) {
  let totalWeight = 0;
  let maxL = 0, maxB = 0, totalH = 0;

  for (const item of items) {
    const info = getProductShipping(item.name);
    const qty = item.quantity || 1;
    totalWeight += info.weight * qty;
    // Use the largest L and B among all items
    maxL = Math.max(maxL, info.l);
    maxB = Math.max(maxB, info.b);
    // Stack height for multiple items
    totalH += info.h * qty;
  }

  // Cap height at a reasonable max
  if (totalH > 100) totalH = 100;

  return {
    weight: totalWeight,
    length: maxL || DEFAULT_SHIPPING.l,
    breadth: maxB || DEFAULT_SHIPPING.b,
    height: totalH || DEFAULT_SHIPPING.h,
  };
}

export async function POST(req) {
  try {
    const orderData = await req.json();
    
    if (!orderData || !orderData.orderId) {
      return NextResponse.json({ error: 'Order data is required' }, { status: 400 });
    }

    const token = await getNimbusToken();

    const paymentType = orderData.paymentMethod === 'cod' ? 'cod' : 'prepaid';
    
    // Calculate real shipping weight & dimensions from the order items
    const dims = calculateShipmentDimensions(orderData.items || []);
    console.log(`Shipment dimensions for ${orderData.orderId}: ${dims.weight}g, ${dims.length}x${dims.breadth}x${dims.height}cm`);

    // Step 1: Fetch available couriers and pick the cheapest one
    let courierId = null;
    try {
      const courierRes = await fetch('https://api.nimbuspost.com/v1/courier/serviceability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          origin: process.env.NIMBUS_ORIGIN_PIN || '324010',
          destination: orderData.shipping.pincode,
          payment_type: paymentType,
          order_amount: orderData.total,
          weight: dims.weight,
          length: dims.length,
          breadth: dims.breadth,
          height: dims.height
        })
      });
      const courierData = await courierRes.json();

      if (courierData.status && courierData.data && courierData.data.length > 0) {
        const cheapest = courierData.data.sort((a, b) => 
          parseFloat(a.total_charges) - parseFloat(b.total_charges)
        )[0];
        courierId = cheapest.id;
        console.log(`Selected courier: ${cheapest.name} (ID: ${courierId}) at ₹${cheapest.total_charges}`);
      }
    } catch (courierErr) {
      console.error('Could not fetch couriers, will try without courier_id:', courierErr.message);
    }
    
    // Step 2: Build the shipment payload
    const nimbusPayload = {
      order_number: orderData.orderId,
      shipping_charges: orderData.shippingCost || 0,
      discount: orderData.discount || 0,
      cod_charges: 0,
      payment_type: paymentType,
      order_amount: orderData.total,
      package_weight: dims.weight,
      package_length: dims.length,
      package_breadth: dims.breadth,
      package_height: dims.height,
      request_auto_pickup: 'yes',
      ...(courierId && { courier_id: courierId }),
      consignee: {
        name: orderData.customer.name || 'Customer',
        address: orderData.shipping.address1,
        address_2: orderData.shipping.address2 || '',
        city: orderData.shipping.city,
        state: orderData.shipping.state,
        pincode: orderData.shipping.pincode,
        phone: orderData.customer.phone,
        email: orderData.customer.email || ''
      },
      pickup: {
        warehouse_name: 'Bgiya Bliss',
        name: 'Bgiya Bliss',
        address: '49 A Shrinathpuram near meena samudayik bhawan',
        city: 'Kota',
        state: 'Rajasthan',
        pincode: process.env.NIMBUS_ORIGIN_PIN || '324010',
        phone: '9571389234'
      },
      order_items: orderData.items.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        sku: item.id || 'N/A'
      }))
    };

    const res = await fetch('https://api.nimbuspost.com/v1/shipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(nimbusPayload),
      cache: 'no-store'
    });

    const data = await res.json();

    if (data.status && data.data) {
      const awb = data.data.awb_number;
      const courier = data.data.courier_name;
      const shipmentId = data.data.shipment_id;
      
      return NextResponse.json({
        success: true,
        awb: awb,
        courier: courier,
        shipmentId: shipmentId,
        message: 'Shipment created successfully on Nimbus'
      });
    } else {
      console.error('Nimbus shipment error:', data);
      return NextResponse.json({ success: false, error: data.message || 'Failed to create shipment on Nimbus' });
    }
  } catch (error) {
    console.error('Create shipment error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
