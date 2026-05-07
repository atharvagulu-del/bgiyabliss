export const metadata = {
  title: 'Shipping Policy | Bgiya Bliss',
  description: 'Our shipping and delivery policy.',
};

export default function ShippingPolicy() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px', fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Shipping & Delivery Policy</h1>
      
      <p style={{ marginBottom: 16 }}>We are dedicated to ensuring your plants arrive healthy, safe, and on time.</p>
      
      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>Processing Time</h2>
      <p style={{ marginBottom: 16 }}>All orders are processed within 1-2 business days. Orders are not shipped or delivered on Sundays or public holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>
      
      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>Shipping Rates & Delivery Estimates</h2>
      <p style={{ marginBottom: 16 }}>Shipping charges for your order will be calculated and displayed at checkout.</p>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li><strong>Prepaid Orders:</strong> Flat rate of ₹54. Delivery within 3-5 business days.</li>
        <li><strong>Cash on Delivery (COD):</strong> Flat rate of ₹84. Delivery within 4-7 business days.</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>Plant Packaging</h2>
      <p style={{ marginBottom: 16 }}>Live plants are packaged with extreme care in custom-designed corrugated boxes with adequate ventilation and soil moisture retention systems to ensure they survive transit unharmed.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>Contact Us</h2>
      <p style={{ marginBottom: 16 }}>If you have any questions regarding your order's shipping status, please contact us at <strong>bgiyabliss73@gmail.com</strong>.</p>
    </div>
  );
}
