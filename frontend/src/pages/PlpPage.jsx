import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/operations';
import { useCart } from '../context/CartContext';

export function PlpPage() {
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const { data, loading, refetch } = useQuery(GET_PRODUCTS, { variables: { search: '' } });
  const { addToCart } = useCart();

  const products = data?.products?.items ?? [];

  const onSearch = async (event) => {
    event.preventDefault();
    await refetch({ search });
  };

  return (
    <section>
      <h1>Product Listing (PLP)</h1>
      <form className="row" onSubmit={onSearch}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
        <button type="submit">Search</button>
      </form>
      {notice && <p className="notice">{notice}</p>}
      {loading ? <p>Loading...</p> : null}
      <div className="grid cards">
        {products.map((product) => (
          <article key={product.uid} className="card product-card">
            <h3>{product.name}</h3>
            <p>{product.price_range?.minimum_price?.regular_price?.value} {product.price_range?.minimum_price?.regular_price?.currency}</p>
            <div className="row">
              <Link to={`/pdp/${product.url_key}`}>View PDP</Link>
              <button
                type="button"
                onClick={async () => {
                  await addToCart(product.sku, 1);
                  setNotice(`${product.name} added to cart.`);
                }}
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
