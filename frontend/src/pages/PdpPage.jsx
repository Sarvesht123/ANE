import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT_BY_URL_KEY } from '../graphql/operations';
import { useCart } from '../context/CartContext';

export function PdpPage() {
  const { urlKey } = useParams();
  const { addToCart } = useCart();
  const { data, loading } = useQuery(GET_PRODUCT_BY_URL_KEY, { variables: { urlKey } });

  const product = data?.products?.items?.[0];

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section>
      <h1>Product Detail (PDP)</h1>
      <article className="card">
        <h2>{product.name}</h2>
        <p>
          {product.price_range?.minimum_price?.regular_price?.value}{' '}
          {product.price_range?.minimum_price?.regular_price?.currency}
        </p>
        <div dangerouslySetInnerHTML={{ __html: product.description?.html ?? '' }} />
        <button type="button" onClick={() => addToCart(product.sku, 1)}>
          Add to cart
        </button>
      </article>
    </section>
  );
}
