import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(() => JSON.parse(localStorage.getItem('tt_user') || 'null'));
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const login = async (email, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('tt_user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, message: err.response?.data?.message };
    } finally { setLoading(false); }
  };

  const register = async (firstName, lastName, email, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/register', { firstName, lastName, email, password });
      setUser(data);
      localStorage.setItem('tt_user', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, message: err.response?.data?.message };
    } finally { setLoading(false); }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tt_user');
    localStorage.removeItem('tt_cart');
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('tt_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
