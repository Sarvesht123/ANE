import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_STORE_CONFIG } from '../graphql/operations';

export function HomePage() {
  const { data } = useQuery(GET_STORE_CONFIG);
  const config = data?.aneStoreConfig;

  return (
    <section>
      <h1>Magento + React Storefront</h1>
      <p>Starter storefront connected to your local Magento GraphQL backend.</p>
      <div className="grid two-up">
        <article className="card">
          <h2>Store details</h2>
          <p><strong>Name:</strong> {config?.store_name ?? 'N/A'}</p>
          <p><strong>Locale:</strong> {config?.locale ?? 'N/A'}</p>
          <p><strong>Currency:</strong> {config?.default_currency ?? 'N/A'}</p>
        </article>
        <article className="card">
          <h2>Quick start</h2>
          <ul>
            <li><Link to="/plp">Browse products (PLP)</Link></li>
            <li><Link to="/cart">Review cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/account">My account</Link></li>
          </ul>
        </article>
      </div>
    </section>
  );
}
