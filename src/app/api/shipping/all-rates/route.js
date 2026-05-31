import { NextResponse } from 'next/server';
import { getNimbusToken } from '@/lib/nimbus';

export async function POST(req) {
  try {
    const { destination, weight, paymentType, orderAmount } = await req.json();
    const token = await getNimbusToken();
    const origin = process.env.NIMBUS_ORIGIN_PIN || '324010';

    const res = await fetch('https://api.nimbuspost.com/v1/courier/serviceability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ origin, destination, payment_type: paymentType || 'prepaid', order_amount: orderAmount || 0, weight: weight || 1000, length: 40, breadth: 25, height: 25 }),
      cache: 'no-store'
    });

    const data = await res.json();

    if (data.status && data.data && data.data.length > 0) {
      const couriers = data.data
        .map(c => ({ id: c.id, name: c.name || c.courier_name, charges: parseFloat(c.total_charges), eta: c.expected_delivery_date, min_weight: c.min_weight, rto: c.rto_charges }))
        .sort((a, b) => a.charges - b.charges);
      return NextResponse.json({ success: true, count: couriers.length, couriers });
    } else {
      return NextResponse.json({ success: false, error: data.message || 'No couriers' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
