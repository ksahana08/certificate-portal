import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', f);
      login(data);
      nav('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not connect to server');
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login</h2>
      {err && <p className="err">{err}</p>}
      <input
        placeholder="Email"
        onChange={e => setF({ ...f, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setF({ ...f, password: e.target.value })}
        required
      />
      <button>Login</button>
    </form>
  );
}