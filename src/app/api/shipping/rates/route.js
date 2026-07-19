import { NextResponse } from 'next/server';
import { getShiprocketToken } from '@/lib/shiprocket';

export async function POST(req) {
  try {
    const { destination, weight, paymentType, orderAmount } = await req.json();

    if (!destination) {
      return NextResponse.json({ error: 'Destination PIN is required' }, { status: 400 });
    }

    const token = await getShiprocketToken();
    const origin = process.env.SHIPROCKET_ORIGIN_PIN || '324005';

    // Weight comes in grams from CartContext, Shiprocket expects kg
    const finalWeightGrams = weight > 0 ? weight : 1000;
    const finalWeightKg = finalWeightGrams / 1000;

    // Estimate dimensions based on weight
    let length = 25, breadth = 15, height = 10;
    if (finalWeightGrams >= 10000) {
      length = 40; breadth = 30; height = 40;
    } else if (finalWeightGrams >= 3000) {
      length = 40; breadth = 25; height = 15;
    }

    const cod = (paymentType || 'prepaid').toLowerCase() === 'cod' ? 1 : 0;

    const url = `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${origin}&delivery_postcode=${destination}&weight=${finalWeightKg}&cod=${cod}`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    });

    const data = await res.json();

    const couriers = data?.data?.available_courier_companies || [];

    if (couriers.length > 0) {
      const cheapest = couriers.reduce((prev, curr) =>
        (prev.rate < curr.rate) ? prev : curr
      );

      return NextResponse.json({
        success: true,
        rate: cheapest.rate,
        courier: cheapest.courier_name,
        estimatedDelivery: cheapest.etd
      });
    } else {
      return NextResponse.json({
        success: false,
        error: data.message || 'No couriers available for this PIN code.'
      });
    }
  } catch (error) {
    console.error('Shipping rates error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
