import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { PLACE_ORDER } from '../graphql/operations';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { getCartId, clearCartId } = useCart();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [placeOrder] = useMutation(PLACE_ORDER);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const cartId = getCartId();

    if (!cartId) {
      setMessage('No active cart found.');
      return;
    }

    try {
      const { data } = await placeOrder({ variables: { cartId } });
      const orderNumber = data?.placeOrder?.orderV2?.number;
      clearCartId();
      navigate('/order/success', { state: { orderNumber } });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h1>Checkout</h1>
      <p>Fill required details and place your order.</p>
      <form className="stack" onSubmit={handlePlaceOrder}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Place order</button>
      </form>
      {message ? <p className="notice error">{message}</p> : null}
    </section>
  );
}
