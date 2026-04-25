import { ShoppingCart } from 'lucide-react';

export default function OrdersPage() {
  return (
    <>
      <div className="adminTopbar">
        <h1 className="adminTopbarTitle">Orders</h1>
      </div>
      <div className="adminContent">
        <div className="adminCard">
          <div className="adminEmptyState">
            <ShoppingCart size={48} />
            <h3>Orders Coming Soon</h3>
            <p>Order management will be available once payment integration is set up.</p>
          </div>
        </div>
      </div>
    </>
  );
}
