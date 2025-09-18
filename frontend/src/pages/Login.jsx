import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form,setForm] = useState({ email:'', password:'' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h2>Login</h2>
      <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" />
      <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
