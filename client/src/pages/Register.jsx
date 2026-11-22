import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';

export default function Register() {
  const [f, setF] = useState({ name: '', email: '', password: '', rollNo: '', department: '' });
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const set = k => e => setF({ ...f, [k]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', f);
      login(data);
      nav('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not connect to server');
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Student Registration</h2>
      {err && <p className="err">{err}</p>}
      <input placeholder="Full name" onChange={set('name')} required />
      <input placeholder="Roll number" onChange={set('rollNo')} required />
      <input placeholder="Department" onChange={set('department')} required />
      <input placeholder="Email" onChange={set('email')} required />
      <input type="password" placeholder="Password" onChange={set('password')} required />
      <button>Register</button>
    </form>
  );
}