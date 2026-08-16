import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      console.error('[Webhook] Missing x-razorpay-signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature using the webhook secret
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Webhook] RAZORPAY_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    // HMAC SHA256 verification using Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(webhookSecret);
    const messageData = encoder.encode(rawBody);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (expectedSignature !== signature) {
      console.error('[Webhook] Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Parse the verified payload
    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log(`[Webhook] Received event: ${event}`);

    if (event === 'payment.captured') {
      const payment = payload.payload?.payment?.entity;
      if (!payment) {
        console.error('[Webhook] No payment entity in payload');
        return NextResponse.json({ status: 'no_payment_entity' });
      }

      const razorpayOrderId = payment.order_id;
      const razorpayPaymentId = payment.id;
      const amount = payment.amount / 100; // Convert paise to rupees
      const notes = payment.notes || {};

      console.log(`[Webhook] Payment captured: ${razorpayPaymentId}, order: ${razorpayOrderId}, amount: ₹${amount}`);

      // Check if there's order data in the notes (we'll add this when creating Razorpay order)
      if (notes.bgiya_order_id) {
        console.log(`[Webhook] Found Bgiya order ID in notes: ${notes.bgiya_order_id}`);
        
        // Try to find the order in Firestore and create Shiprocket shipment if not already created
        try {
          const { getOrderById } = await import('@/lib/firestore');
          const order = await getOrderById(notes.firestore_doc_id || '');
          
          if (order && !order.shiprocketCreated) {
            console.log(`[Webhook] Order ${order.orderId} needs Shiprocket. Creating now...`);
            
            const shipRes = await fetch(new URL('/api/shiprocket/create-shipment', req.url).toString(), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(order),
            });
            const shipData = await shipRes.json();
            
            if (shipData.success) {
              // Mark order as shiprocket created
              const { updateOrderStatus } = await import('@/lib/firestore');
              // We just log success - the order status update is optional
              console.log(`[Webhook] Shiprocket created successfully for ${order.orderId}: AWB=${shipData.awb}`);
            } else {
              console.error(`[Webhook] Shiprocket FAILED for ${order.orderId}:`, shipData.error);
            }
          } else if (order) {
            console.log(`[Webhook] Order ${order.orderId} already has Shiprocket shipment. Skipping.`);
          } else {
            console.log(`[Webhook] Could not find order for notes:`, notes);
          }
        } catch (dbErr) {
          console.error('[Webhook] Database/Shiprocket error:', dbErr.message);
        }
      }
    }

    // Always return 200 to Razorpay so they don't retry
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    // Still return 200 to prevent Razorpay from retrying
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
