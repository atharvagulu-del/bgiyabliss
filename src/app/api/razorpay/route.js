import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials are not set');
      return NextResponse.json(
        { error: 'Payment configuration error' },
        { status: 500 }
      );
    }

    // Razorpay amount is in paise (multiply by 100)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    // Direct REST API call instead of Razorpay SDK (which uses Node.js http module)
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${keyId}:${keySecret}`),
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.description || 'Failed to create order');
    }

    const order = await response.json();
    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json(
      { error: 'Failed to create Razorpay order', details: error.message },
      { status: 500 }
    );
  }
}
