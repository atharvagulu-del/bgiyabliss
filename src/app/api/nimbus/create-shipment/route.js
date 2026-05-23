import { NextResponse } from 'next/server';
import { getNimbusToken } from '@/lib/nimbus';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(req) {
  try {
    const orderData = await req.json();
    
    // We need the orderId and order details
    if (!orderData || !orderData.orderId) {
      return NextResponse.json({ error: 'Order data is required' }, { status: 400 });
    }

    const token = await getNimbusToken();

    const paymentType = orderData.paymentMethod === 'cod' ? 'cod' : 'prepaid';
    const weight = orderData.totalWeight || 1000;

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
          weight: weight,
          length: 25,
          breadth: 15,
          height: 10
        })
      });
      const courierData = await courierRes.json();

      if (courierData.status && courierData.data && courierData.data.length > 0) {
        // Sort by total_charges and pick the cheapest
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
      package_weight: weight,
      package_length: 25,
      package_breadth: 15,
      package_height: 10,
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
      // Successfully created AWB
      const awb = data.data.awb_number;
      const courier = data.data.courier_name;
      const shipmentId = data.data.shipment_id;

      // Now we should ideally update the order in Firebase to save the AWB
      // But since this route is just a helper, we'll return it so the frontend can update, 
      // or we can update it right here if we have the firestore doc ID.
      // Usually orderData.orderId is the custom string we save, but the doc ID might be different,
      // or we use the custom orderId as the doc ID. 
      // In checkout/page.js, `createOrder` might use auto-generated ID or `orderId`. Let's assume frontend will handle updating if needed, or we just return it.
      
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
