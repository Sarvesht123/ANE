import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_CUSTOMER } from '../graphql/operations';

export function RegisterPage() {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [createCustomer] = useMutation(CREATE_CUSTOMER);
  const navigate = useNavigate();

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCustomer({ variables: form });
      setMessage('Account created. Please log in.');
      setTimeout(() => navigate('/login'), 800);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form className="stack" onSubmit={onSubmit}>
        <input name="firstname" placeholder="First name" value={form.firstname} onChange={onChange} required />
        <input name="lastname" placeholder="Last name" value={form.lastname} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button type="submit">Create account</button>
      </form>
      {message ? <p className="notice">{message}</p> : null}
    </section>
  );
}
