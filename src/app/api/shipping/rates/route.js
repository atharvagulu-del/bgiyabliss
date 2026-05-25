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
    
    // Use the weight sent from checkout (already calculated per-product in CartContext)
    // Fallback to 1kg if 0 or undefined
    const finalWeight = weight > 0 ? weight : 1000;

    // Estimate dimensions based on weight
    // Heavier orders (>5kg) likely contain 10kg bags
    let length = 25, breadth = 15, height = 10;
    if (finalWeight >= 10000) {
      length = 40; breadth = 30; height = 40;
    } else if (finalWeight >= 3000) {
      length = 40; breadth = 25; height = 15;
    }

    const payload = {
      origin,
      destination,
      payment_type: paymentType || 'prepaid',
      order_amount: orderAmount || 0,
      weight: finalWeight,
      length,
      breadth,
      height
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
      return NextResponse.json({ success: false, error: data.message || 'No couriers available for this PIN code.' });
    }
  } catch (error) {
    console.error('Shipping rates error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
