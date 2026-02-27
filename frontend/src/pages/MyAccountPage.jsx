import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_CUSTOMER } from '../graphql/operations';

export function MyAccountPage() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('customerToken');
  const { data, loading, error } = useQuery(GET_CUSTOMER, { skip: !token });

  if (!token) {
    return (
      <section>
        <h1>My Account</h1>
        <p>Please login first.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>My Account</h1>
      {loading ? <p>Loading customer details...</p> : null}
      {error ? <p className="notice error">{error.message}</p> : null}
      {data?.customer ? (
        <article className="card">
          <p><strong>Name:</strong> {data.customer.firstname} {data.customer.lastname}</p>
          <p><strong>Email:</strong> {data.customer.email}</p>
          <button
            onClick={() => {
              window.localStorage.removeItem('customerToken');
              navigate('/login');
            }}
          >
            Logout
          </button>
        </article>
      ) : null}
    </section>
  );
}
