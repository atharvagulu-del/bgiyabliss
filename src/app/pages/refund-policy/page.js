export const metadata = {
  title: 'Refund Policy | Bgiya Bliss',
  description: 'Our refund and cancellation policy.',
};

export default function RefundPolicy() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px', fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Refund & Cancellation Policy</h1>
      
      <p style={{ marginBottom: 16 }}>At Bgiya Bliss, we strive to ensure our customers receive the best quality plants and gardening products. Please read our policy carefully.</p>
      
      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>1. Order Cancellations</h2>
      <p style={{ marginBottom: 16 }}>Orders can be cancelled within 12 hours of placement. If the order has already been dispatched, cancellation is no longer possible.</p>
      
      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>2. Live Plants Guarantee</h2>
      <p style={{ marginBottom: 16 }}>Due to the nature of live plants, some wilting or minor transit shock is normal. Please allow the plant 2-3 days to recover after potting it and watering it adequately. If the plant arrives completely dead or severely damaged, you must contact us within 24 hours of delivery with clear photographs of the plant and the packaging.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>3. Refunds</h2>
      <p style={{ marginBottom: 16 }}>Approved refunds will be processed back to the original method of payment within 5-7 business days. For Cash on Delivery (COD) orders, refunds will be provided via bank transfer or store credit.</p>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>4. Non-Returnable Items</h2>
      <p style={{ marginBottom: 16 }}>Items such as seeds, fertilizers, and potting mixes cannot be returned once opened due to quality control reasons.</p>
      
      <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>Contact Us</h2>
      <p style={{ marginBottom: 16 }}>If you have any questions about our policy, please contact us at <strong>bgiyabliss73@gmail.com</strong>.</p>
    </div>
  );
}
