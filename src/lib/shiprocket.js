let cachedToken = null;
let tokenExpiry = null;

export async function getShiprocketToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    throw new Error('Shiprocket credentials not configured');
  }

  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    });

    const data = await res.json();

    if (data.token) {
      cachedToken = data.token;
      // Shiprocket tokens last 10 days, cache for 9 days
      tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000;
      return cachedToken;
    } else {
      console.error('Shiprocket login failed:', data);
      throw new Error(data.message || 'Failed to login to Shiprocket');
    }
  } catch (error) {
    console.error('Error fetching Shiprocket token:', error);
    throw error;
  }
}
