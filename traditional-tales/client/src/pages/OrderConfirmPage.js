// OrderConfirmPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Footer from '../components/layout/Footer';

const OrderConfirmPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(r => setOrder(r.data)).catch(() => {});
  }, [id]);

  if (!order) return <div className="spinner" style={{marginTop:'200px'}} />;

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'120px 20px',background:'var(--ivory)'}}>
      <div style={{background:'var(--white)',width:'600px',maxWidth:'100%',padding:'70px 60px',textAlign:'center'}}>
        <div style={{fontSize:'52px',marginBottom:'18px'}}>✅</div>
        <h1 style={{fontFamily:'var(--font-display)',fontSize:'38px',fontWeight:'300',marginBottom:'10px'}}>
          Shukran, <em style={{fontStyle:'italic',color:'var(--gold)'}}>Beautiful!</em>
        </h1>
        <p style={{fontSize:'13px',lineHeight:'2',color:'var(--muted)',marginBottom:'8px'}}>Your order has been placed successfully.<br />A confirmation email is on its way.</p>
        <p style={{fontFamily:'var(--font-display)',fontSize:'18px',color:'var(--accent)',letterSpacing:'.2em',marginBottom:'32px'}}>{order.orderNumber}</p>
        <div style={{background:'var(--ivory)',padding:'24px',marginBottom:'32px',textAlign:'left'}}>
          {[['Order Date', new Date(order.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})],
            ['Payment',   order.paymentMethod + ' · Pending'],
            ['Delivery',  '3–5 Business Days'],
            ['Total',     `₹${order.totalPrice?.toLocaleString()}`]
          ].map(([k,v]) => (
            <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'var(--muted)',padding:'8px 0',borderBottom:'1px solid var(--cream)'}}>
              <span>{k}</span><strong style={{color:'var(--charcoal)'}}>{v}</strong>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
          <Link to="/orders" className="btn-outline">View My Orders</Link>
        </div>
      </div>
    </div>
  );
};

export { OrderConfirmPage };
export default OrderConfirmPage;
