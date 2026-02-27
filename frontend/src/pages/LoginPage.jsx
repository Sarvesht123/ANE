import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GENERATE_CUSTOMER_TOKEN } from '../graphql/operations';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [generateCustomerToken] = useMutation(GENERATE_CUSTOMER_TOKEN);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await generateCustomerToken({ variables: { email, password } });
      const token = data?.generateCustomerToken?.token;
      if (token) {
        window.localStorage.setItem('customerToken', token);
        navigate('/account');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form className="stack" onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {message ? <p className="notice error">{message}</p> : null}
    </section>
  );
}
