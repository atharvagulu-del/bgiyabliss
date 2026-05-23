import { NextResponse } from 'next/server';
import { getNimbusToken } from '@/lib/nimbus';

export async function POST(req) {
  try {
    const { destination, weight, paymentType, orderAmount } = await req.json();
    
    if (!destination) {
      return NextResponse.json({ error: 'Destination PIN is required' }, { status: 400 });
    }

    const token = await getNimbusToken();
    const origin = process.env.NIMBUS_ORIGIN_PIN || '324010';
    
    // Nimbus expects weight in grams. 
    // Fallback to 1kg if 0 or undefined
    const finalWeight = weight > 0 ? weight : 1000;

    const payload = {
      origin,
      destination,
      payment_type: paymentType || 'prepaid', // 'cod' or 'prepaid'
      order_amount: orderAmount || 0,
      weight: finalWeight,
      length: 25,
      breadth: 15,
      height: 10
    };

    const res = await fetch('https://api.nimbuspost.com/v1/courier/serviceability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    const data = await res.json();

    if (data.status && data.data && data.data.length > 0) {
      // Filter out any couriers that are disabled or unsupported if needed
      // Find the cheapest available courier
      const couriers = data.data;
      const cheapest = couriers.reduce((prev, curr) => {
        return (prev.total_charges < curr.total_charges) ? prev : curr;
      });
      
      return NextResponse.json({
        success: true,
        rate: cheapest.total_charges,
        courier: cheapest.courier_name,
        estimatedDelivery: cheapest.expected_delivery_date
      });
    } else {
      // No serviceability or error
      return NextResponse.json({ success: false, error: data.message || 'No couriers available for this PIN code.' });
    }
  } catch (error) {
    console.error('Shipping rates error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
