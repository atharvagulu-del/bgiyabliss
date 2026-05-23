let cachedToken = null;
let tokenExpiry = null;

export async function getNimbusToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const email = process.env.NIMBUS_EMAIL;
  const password = process.env.NIMBUS_PASSWORD;

  if (!email || !password) {
    throw new Error('Nimbus credentials not configured');
  }

  try {
    const res = await fetch('https://api.nimbuspost.com/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      // cache: 'no-store' is important for Next.js to not cache this POST forever
      cache: 'no-store' 
    });

    const data = await res.json();
    
    if (data.status && data.data) {
      cachedToken = data.data;
      // Tokens usually last 24h or more, let's cache for 1 hour locally
      tokenExpiry = Date.now() + 60 * 60 * 1000;
      return cachedToken;
    } else {
      console.error('Nimbus login failed:', data);
      throw new Error(data.message || 'Failed to login to Nimbus');
    }
  } catch (error) {
    console.error('Error fetching Nimbus token:', error);
    throw error;
  }
}
