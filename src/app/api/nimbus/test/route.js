import { NextResponse } from 'next/server';

export async function GET() {
  const email = process.env.NIMBUS_EMAIL;
  const password = process.env.NIMBUS_PASSWORD;
  const pin = process.env.NIMBUS_ORIGIN_PIN;

  if (!email || !password) {
    return NextResponse.json({ 
      error: 'Nimbus credentials missing from env vars',
      email: !!email,
      password: !!password,
      pin: !!pin
    }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.nimbuspost.com/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    });
    const data = await res.json();
    
    return NextResponse.json({
      envVarsPresent: { email: !!email, password: !!password, pin: !!pin },
      nimbusLogin: data.status ? 'SUCCESS' : 'FAILED',
      message: data.message || null
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
