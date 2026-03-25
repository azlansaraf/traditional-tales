import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Footer from '../components/layout/Footer';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await api.put('/users/profile', form);
      updateUser(data);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{paddingTop:'100px',background:'var(--ivory)',minHeight:'100vh'}}>
      <div className="container" style={{paddingTop:'40px',paddingBottom:'80px',maxWidth:'600px'}}>
        <span className="section-label">Account</span>
        <h1 className="page-heading">My <em>Profile</em></h1>
        <div style={{background:'var(--white)',padding:'40px',marginTop:'8px'}}>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px'}}>
              <div className="checkout-field"><label style={{fontSize:'10px',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--muted)'}}>First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} style={{padding:'13px 16px',border:'1px solid var(--sand)',background:'none',fontFamily:'var(--font-body)',fontSize:'13px',outline:'none'}} /></div>
              <div className="checkout-field"><label style={{fontSize:'10px',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--muted)'}}>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} style={{padding:'13px 16px',border:'1px solid var(--sand)',background:'none',fontFamily:'var(--font-body)',fontSize:'13px',outline:'none'}} /></div>
            </div>
            <div><label style={{fontSize:'10px',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--muted)',display:'block',marginBottom:'7px'}}>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} style={{width:'100%',padding:'13px 16px',border:'1px solid var(--sand)',background:'none',fontFamily:'var(--font-body)',fontSize:'13px',outline:'none'}} /></div>
            <div><label style={{fontSize:'10px',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--muted)',display:'block',marginBottom:'7px'}}>New Password (leave blank to keep)</label><input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" style={{width:'100%',padding:'13px 16px',border:'1px solid var(--sand)',background:'none',fontFamily:'var(--font-body)',fontSize:'13px',outline:'none'}} /></div>
            <button type="submit" className="btn-primary" disabled={loading} style={{alignSelf:'flex-start',padding:'14px 36px'}}>{loading ? 'Saving...' : 'Save Changes'}</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
