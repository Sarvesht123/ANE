import { Link, useLocation } from 'react-router-dom';

export function OrderSuccessPage() {
  const { state } = useLocation();
  const orderNumber = state?.orderNumber;

  return (
    <section>
      <h1>Order placed</h1>
      <p>Your order has been placed successfully.</p>
      <p>
        <strong>Order #:</strong> {orderNumber ?? 'N/A'}
      </p>
      <Link to="/">Back to home</Link>
    </section>
  );
}
