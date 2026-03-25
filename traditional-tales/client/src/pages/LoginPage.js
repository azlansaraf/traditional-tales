import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export const LoginPage = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login, loading }      = useAuth();
  const navigate                = useNavigate();
  const location                = useLocation();
  const from                    = location.state?.from?.pathname || '/';
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    const res = await login(email, password);
    if (res.success) navigate(from, { replace: true });
    else setError(res.message || 'Login failed');
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <Link to="/" className="auth-logo">Traditional <span>✦</span> Tales</Link>
        <p className="auth-subtitle">Welcome back</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field"><label>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="fatima@example.com" /></div>
          <div className="auth-field"><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" /></div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-auth" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create one →</Link></p>
        <p className="auth-switch"><Link to="/">← Continue as Guest</Link></p>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const [form, setForm]    = useState({ firstName:'', lastName:'', email:'', password:'', confirm:'' });
  const { register, loading } = useAuth();
  const navigate           = useNavigate();
  const [error, setError]  = useState('');

  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}));

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    const res = await register(form.firstName, form.lastName, form.email, form.password);
    if (res.success) navigate('/');
    else setError(res.message || 'Registration failed');
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <Link to="/" className="auth-logo">Traditional <span>✦</span> Tales</Link>
        <p className="auth-subtitle">Create your account</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row-2">
            <div className="auth-field"><label>First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Fatima" /></div>
            <div className="auth-field"><label>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Shaikh" /></div>
          </div>
          <div className="auth-field"><label>Email Address</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="fatima@example.com" /></div>
          <div className="auth-field"><label>Password</label><input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Create a password" /></div>
          <div className="auth-field"><label>Confirm Password</label><input type="password" name="confirm" value={form.confirm} onChange={handleChange} required placeholder="Repeat password" /></div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-auth" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in →</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
