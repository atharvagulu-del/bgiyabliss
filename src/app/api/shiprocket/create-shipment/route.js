import { NextResponse } from 'next/server';
import { getShiprocketToken } from '@/lib/shiprocket';

// ── Calculate pickup date: order date + 2 days ──
function getPickupDate() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  const pickup = new Date(istNow);
  pickup.setDate(pickup.getDate() + 2);
  const year = pickup.getFullYear();
  const month = String(pickup.getMonth() + 1).padStart(2, '0');
  const day = String(pickup.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getOrderDate() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  const year = istNow.getFullYear();
  const month = String(istNow.getMonth() + 1).padStart(2, '0');
  const day = String(istNow.getDate()).padStart(2, '0');
  const hours = String(istNow.getHours()).padStart(2, '0');
  const minutes = String(istNow.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// ── Shipping weight & dimensions lookup ──
const PRODUCT_SHIPPING_INFO = [
  { match: '5 in 1',            weight: 3700,  l: 30, b: 20, h: 20 },
  { match: '5 in one',          weight: 3700,  l: 30, b: 20, h: 20 },
  { match: '5-in-1',            weight: 3700,  l: 30, b: 20, h: 20 },
  { match: 'neem cake',         weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'cow manure',        weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'cow dung',          weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'organic manure',    weight: 5000,  l: 40, b: 25, h: 15 },
  { match: '10kg',              weight: 10500, l: 40, b: 30, h: 40 },
  { match: '10 kg',             weight: 10500, l: 40, b: 30, h: 40 },
  { match: '5kg',               weight: 5000,  l: 40, b: 25, h: 15 },
  { match: '5 kg',              weight: 5000,  l: 40, b: 25, h: 15 },
  { match: 'potting mix',       weight: 3700,  l: 40, b: 25, h: 15 },
];

const DEFAULT_SHIPPING = { weight: 1000, l: 25, b: 15, h: 10 };

function getProductShipping(item) {
  const nameStr = (item.name || '').toLowerCase();

  // Hard override for 5-in-1
  if (nameStr.includes('5 in 1') || nameStr.includes('5 in one') || nameStr.includes('5-in-1')) {
    return { weight: 3700, l: 30, b: 20, h: 20 };
  }

  // Priority 1: Admin-set shipping data
  if (item.shippingWeight && item.shippingWeight > 0) {
    return {
      weight: item.shippingWeight * 1000,
      l: item.shippingLength || 25,
      b: item.shippingBreadth || 15,
      h: item.shippingHeight || 10,
    };
  }

  // Priority 2: Name-based lookup
  const name = (item.name || '').toLowerCase();
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
    const info = getProductShipping(item);
    const qty = item.quantity || 1;
    totalWeight += info.weight * qty;
    maxL = Math.max(maxL, info.l);
    maxB = Math.max(maxB, info.b);
    totalH += info.h * qty;
  }

  if (totalH > 100) totalH = 100;

  return {
    weight: totalWeight,           // grams
    weightKg: totalWeight / 1000,  // kg for Shiprocket
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

    const token = await getShiprocketToken();
    const paymentType = orderData.paymentMethod === 'cod' ? 'COD' : 'Prepaid';
    const dims = calculateShipmentDimensions(orderData.items || []);
    const pickupDate = getPickupDate();
    const orderDate = getOrderDate();

    console.log(`[Shiprocket] Creating order ${orderData.orderId}: ${dims.weightKg}kg, ${dims.length}x${dims.breadth}x${dims.height}cm, pickup ${pickupDate}`);

    // ── Step 1: Create Order ──
    const orderItems = (orderData.items || []).map(item => {
      let cleanName = item.name || '';
      cleanName = cleanName.replace(/[\u2013\u2014]/g, '-').replace(/[^\x00-\x7F]/g, '');
      return {
        name: cleanName.trim() || 'Product',
        sku: item.id || 'SKU-' + Math.random().toString(36).slice(2, 8),
        units: item.quantity || 1,
        selling_price: String(item.price || 0),
        discount: '',
        tax: '',
        hsn: '',
      };
    });

    const shiprocketPayload = {
      order_id: orderData.orderId,
      order_date: orderDate,
      pickup_location: 'warehouse',
      channel_id: '',
      comment: '',
      billing_customer_name: orderData.customer?.name || 'Customer',
      billing_last_name: '',
      billing_address: orderData.shipping?.address1 || '',
      billing_address_2: orderData.shipping?.address2 || '',
      billing_city: orderData.shipping?.city || '',
      billing_pincode: orderData.shipping?.pincode || '',
      billing_state: orderData.shipping?.state || '',
      billing_country: 'India',
      billing_email: orderData.customer?.email || '',
      billing_phone: orderData.customer?.phone || '',
      shipping_is_billing: true,
      shipping_customer_name: '',
      shipping_last_name: '',
      shipping_address: '',
      shipping_address_2: '',
      shipping_city: '',
      shipping_pincode: '',
      shipping_country: '',
      shipping_state: '',
      shipping_email: '',
      shipping_phone: '',
      order_items: orderItems,
      payment_method: paymentType,
      shipping_charges: orderData.shippingCost || 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: orderData.discount || 0,
      sub_total: orderData.subtotal || orderData.total || 0,
      length: dims.length,
      breadth: dims.breadth,
      height: dims.height,
      weight: dims.weightKg,
    };

    const createRes = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(shiprocketPayload),
      cache: 'no-store'
    });

    const createData = await createRes.json();

    if (!createData.order_id) {
      console.error('[Shiprocket] Order creation failed:', createData);
      return NextResponse.json({
        success: false,
        error: createData.message || createData.errors || 'Failed to create order on Shiprocket'
      });
    }

    const srOrderId = createData.order_id;
    const srShipmentId = createData.shipment_id;
    console.log(`[Shiprocket] Order created: order_id=${srOrderId}, shipment_id=${srShipmentId}`);

    // ── Step 2: Check courier serviceability & pick cheapest ──
    let courierId = null;
    try {
      const origin = process.env.SHIPROCKET_ORIGIN_PIN || '324005';
      const svcUrl = `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${origin}&delivery_postcode=${orderData.shipping?.pincode}&weight=${dims.weightKg}&cod=${paymentType === 'COD' ? 1 : 0}`;

      const svcRes = await fetch(svcUrl, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });
      const svcData = await svcRes.json();

      const couriers = svcData?.data?.available_courier_companies || [];
      if (couriers.length > 0) {
        const cheapest = couriers.sort((a, b) => a.rate - b.rate)[0];
        courierId = cheapest.courier_company_id;
        console.log(`[Shiprocket] Best courier: ${cheapest.courier_name} (ID: ${courierId}) at Rs.${cheapest.rate}`);
      }
    } catch (svcErr) {
      console.error('[Shiprocket] Courier serviceability check failed:', svcErr.message);
    }

    // ── Step 3: Assign AWB ──
    let awb = null;
    let courierName = null;
    try {
      const awbPayload = { shipment_id: srShipmentId };
      if (courierId) awbPayload.courier_id = courierId;

      const awbRes = await fetch('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(awbPayload),
        cache: 'no-store'
      });
      const awbData = await awbRes.json();

      if (awbData.response?.data?.awb_code) {
        awb = awbData.response.data.awb_code;
        courierName = awbData.response.data.courier_name;
        console.log(`[Shiprocket] AWB assigned: ${awb} via ${courierName}`);
      } else {
        console.error('[Shiprocket] AWB assignment response:', awbData);
      }
    } catch (awbErr) {
      console.error('[Shiprocket] AWB assignment failed:', awbErr.message);
    }

    // ── Step 4: Request Pickup ──
    try {
      await fetch('https://apiv2.shiprocket.in/v1/external/courier/generate/pickup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shipment_id: [srShipmentId] }),
        cache: 'no-store'
      });
      console.log(`[Shiprocket] Pickup requested for shipment ${srShipmentId}`);
    } catch (pickupErr) {
      console.error('[Shiprocket] Pickup request failed:', pickupErr.message);
    }

    return NextResponse.json({
      success: true,
      awb: awb,
      courier: courierName,
      shipmentId: srShipmentId,
      shiprocketOrderId: srOrderId,
      pickupDate: pickupDate,
      message: awb
        ? `Shipment created. AWB: ${awb}. Pickup scheduled for ${pickupDate}`
        : `Order created on Shiprocket (ID: ${srOrderId}). AWB will be assigned shortly.`
    });

  } catch (error) {
    console.error('[Shiprocket] Create shipment error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
