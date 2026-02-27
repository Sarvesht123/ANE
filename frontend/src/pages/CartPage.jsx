import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CART } from '../graphql/operations';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { getCartId } = useCart();
  const cartId = getCartId();
  const { data, loading } = useQuery(GET_CART, {
    variables: { cartId: cartId ?? '' },
    skip: !cartId,
  });

  if (!cartId) {
    return (
      <section>
        <h1>Cart</h1>
        <p>Your cart is empty. Start from the <Link to="/plp">PLP</Link>.</p>
      </section>
    );
  }

  const cart = data?.cart;

  return (
    <section>
      <h1>Cart</h1>
      {loading ? <p>Loading cart...</p> : null}
      {cart?.items?.map((item) => (
        <article key={item.uid} className="card">
          <h3>{item.product.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>
            {item.prices?.row_total?.value} {item.prices?.row_total?.currency}
          </p>
        </article>
      ))}
      <p>
        <strong>Total:</strong> {cart?.prices?.grand_total?.value ?? 0} {cart?.prices?.grand_total?.currency ?? ''}
      </p>
      <Link to="/checkout">Proceed to checkout</Link>
    </section>
  );
}
