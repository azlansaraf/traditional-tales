import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Footer from '../components/layout/Footer';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/myorders').then(r => setOrders(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statusColor = { Pending:'var(--gold)', Processing:'var(--accent)', Shipped:'var(--success)', Delivered:'var(--success)', Cancelled:'var(--danger)' };

  return (
    <div style={{paddingTop:'100px',background:'var(--ivory)',minHeight:'100vh'}}>
      <div className="container" style={{paddingTop:'40px',paddingBottom:'80px'}}>
        <span className="section-label">Account</span>
        <h1 className="page-heading">My <em>Orders</em></h1>
        <p className="page-subheading">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        {loading ? <div className="spinner" /> : orders.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 20px',color:'var(--muted)'}}>
            <p style={{marginBottom:'20px'}}>You haven't placed any orders yet.</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
            {orders.map(o => (
              <div key={o._id} style={{background:'var(--white)',padding:'28px 32px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr auto',gap:'20px',alignItems:'center'}}>
                <div>
                  <p style={{fontSize:'10px',letterSpacing:'.25em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'4px'}}>Order Number</p>
                  <p style={{fontFamily:'var(--font-display)',fontSize:'16px'}}>{o.orderNumber}</p>
                </div>
                <div>
                  <p style={{fontSize:'10px',letterSpacing:'.25em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'4px'}}>Date</p>
                  <p style={{fontSize:'13px'}}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p style={{fontSize:'10px',letterSpacing:'.25em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'4px'}}>Total</p>
                  <p style={{fontSize:'15px',fontFamily:'var(--font-display)'}}>₹{o.totalPrice?.toLocaleString()}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
                  <span style={{fontSize:'10px',letterSpacing:'.18em',textTransform:'uppercase',color:statusColor[o.status]||'var(--muted)',padding:'5px 12px',border:`1px solid ${statusColor[o.status]||'var(--sand)'}`}}>{o.status}</span>
                  <Link to={`/order/${o._id}`} style={{fontSize:'10px',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--muted)',transition:'color .3s'}} onMouseOver={e=>e.target.style.color='var(--charcoal)'} onMouseOut={e=>e.target.style.color='var(--muted)'}>Details →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
