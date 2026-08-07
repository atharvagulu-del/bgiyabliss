import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification fields' },
        { status: 400 }
      );
    }

    // Create the expected signature using HMAC SHA256
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.error('RAZORPAY_KEY_SECRET is not set');
      return NextResponse.json(
        { error: 'Payment verification configuration error' },
        { status: 500 }
      );
    }

    // Use Web Crypto API instead of Node.js crypto module for Cloudflare Workers compatibility
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keySecret);
    const message = encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, message);

    // Convert ArrayBuffer to hex string
    const generatedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Compare signatures
    const isValid = generatedSignature === razorpay_signature;

    if (isValid) {
      return NextResponse.json({
        verified: true,
        message: 'Payment signature verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      return NextResponse.json(
        { verified: false, error: 'Invalid payment signature. Payment verification failed.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed', details: error.message },
      { status: 500 }
    );
  }
}
