import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './StaticPages.css';

/* ── ABOUT ── */
export const AboutPage = () => (
  <div className="static-page">
    <div className="about-hero">
      <div className="about-hero-left">
        <span className="section-label">Since 2018</span>
        <h1 className="page-heading" style={{color:'var(--white)'}}>Our <em>Story</em></h1>
        <p style={{fontSize:'13px',lineHeight:'2',color:'rgba(255,255,255,.5)',maxWidth:'380px',marginTop:'20px'}}>
          Traditional Tales was born from a love of modest fashion and a belief that every woman deserves to feel beautiful, dignified, and seen — exactly as she is.
        </p>
      </div>
      <div className="about-hero-right">
        <img src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=900&q=85" alt="Our Story" />
      </div>
    </div>
    <div className="about-values">
      <div className="container">
        <span className="section-label" style={{display:'block',textAlign:'center'}}>What We Stand For</span>
        <h2 className="section-title" style={{textAlign:'center',marginBottom:'56px'}}>Crafted with <em>intention.</em></h2>
        <div className="values-grid">
          {[['🧵','Handcrafted Quality','Every abaya and burkha is stitched by skilled artisans using premium fabrics sourced from trusted mills across India and the Middle East.'],
            ['🌿','Sustainable Practices','We use eco-conscious packaging, natural dyes wherever possible, and work with artisans who receive fair wages.'],
            ['💛','Inclusive Sizing','From XS to 4XL, our collections are designed for every body. Modesty and elegance belong to all women.']
          ].map(([icon,title,desc]) => (
            <div key={title} className="value-card">
              <div className="value-icon">{icon}</div>
              <h3 className="value-title">{title}</h3>
              <p className="value-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

/* ── CONTACT ── */
export const ContactPage = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="static-page">
      <div className="container" style={{paddingTop:'120px',paddingBottom:'80px'}}>
        <span className="section-label">We'd Love to Hear From You</span>
        <h1 className="page-heading" style={{marginBottom:'48px'}}>Get in <em>Touch</em></h1>
        <div className="contact-grid">
          <div>
            {sent ? (
              <div style={{padding:'60px 0',textAlign:'center'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>✅</div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:'300',marginBottom:'8px'}}>Message Sent!</h3>
                <p style={{color:'var(--muted)',fontSize:'13px'}}>We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form style={{display:'flex',flexDirection:'column',gap:'20px'}} onSubmit={e=>{e.preventDefault();setSent(true);}}>
                {[['Your Name','text','Fatima Shaikh'],['Email Address','email','fatima@example.com']].map(([lbl,type,ph]) => (
                  <div key={lbl} className="checkout-field" style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                    <label style={{fontSize:'10px',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--muted)'}}>{lbl}</label>
                    <input type={type} placeholder={ph} required style={{padding:'13px 16px',border:'1px solid var(--sand)',background:'var(--white)',fontFamily:'var(--font-body)',fontSize:'13px',outline:'none'}} />
                  </div>
                ))}
                <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                  <label style={{fontSize:'10px',letterSpacing:'.3em',textTransform:'uppercase',color:'var(--muted)'}}>Message</label>
                  <textarea required rows={5} placeholder="Tell us how we can help…" style={{padding:'13px 16px',border:'1px solid var(--sand)',background:'var(--white)',fontFamily:'var(--font-body)',fontSize:'13px',outline:'none',resize:'vertical'}} />
                </div>
                <button type="submit" className="btn-primary" style={{alignSelf:'flex-start',padding:'14px 36px'}}>Send Message</button>
              </form>
            )}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'28px'}}>
            {[['📍','Studio Address','42, Craft Lane, Shivajinagar,\nBengaluru, Karnataka 560001'],
              ['📞','Phone / WhatsApp','+91 98765 43210'],
              ['✉️','Email','hello@traditionaltales.in'],
              ['🕐','Hours','Mon–Sat: 10am – 7pm IST\nSunday: By Appointment']
            ].map(([icon,title,info]) => (
              <div key={title} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <span style={{fontSize:'20px'}}>{icon}</span>
                <div>
                  <p style={{fontSize:'12px',fontWeight:'600',letterSpacing:'.1em',marginBottom:'4px'}}>{title}</p>
                  <p style={{fontSize:'13px',color:'var(--muted)',lineHeight:'1.8',whiteSpace:'pre-line'}}>{info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ── SIZE GUIDE ── */
export const SizeGuidePage = () => (
  <div className="static-page">
    <div className="container" style={{paddingTop:'120px',paddingBottom:'80px',maxWidth:'900px'}}>
      <span className="section-label">Traditional Tales</span>
      <h1 className="page-heading" style={{marginBottom:'10px'}}>Size <em>Guide</em></h1>
      <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'40px'}}>All measurements in centimetres (cm). When in doubt, size up.</p>
      <div style={{background:'var(--white)',overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
          <thead>
            <tr style={{background:'var(--deep)',color:'var(--ivory)'}}>
              {['Size','Bust','Waist','Hips','Length'].map(h => (
                <th key={h} style={{padding:'16px 20px',textAlign: h==='Size'?'left':'center',fontSize:'10px',letterSpacing:'.25em',fontWeight:'400'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[['XS','80–84','62–66','88–92','138'],['S','84–88','66–70','92–96','140'],['M','88–94','70–76','96–102','142'],['L','94–100','76–82','102–108','144'],['XL','100–108','82–90','108–116','146'],['2XL','108–116','90–98','116–124','148'],['3XL','116–126','98–108','124–134','150'],['4XL','126–136','108–118','134–144','152']].map((r,i) => (
              <tr key={r[0]} style={{borderBottom:'1px solid var(--cream)',background: i%2===0?'var(--ivory)':'var(--white)'}}>
                <td style={{padding:'14px 20px',fontWeight:'500',color:'var(--gold)',letterSpacing:'.1em'}}>{r[0]}</td>
                {r.slice(1).map((v,j) => <td key={j} style={{padding:'14px 20px',textAlign:'center',color:'var(--muted)'}}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
);

/* ── FAQ ── */
const FAQS = [
  ['What fabrics do you use?','We use premium crepe, chiffon, georgette, velvet, and silk depending on the collection.'],
  ['Do you offer custom sizing?','Yes! We offer custom stitching for all abayas and burkhas. Contact us with your measurements.'],
  ['How long does delivery take?','Standard delivery 3–5 business days. Express 1–2 days. Custom orders 7–10 days.'],
  ['Can I return an item?','Returns accepted within 7 days for unused, unwashed items with tags intact.'],
  ['Do you ship internationally?','We ship to UAE, UK, USA, and Canada. Rates calculated at checkout.'],
  ['How do I find my size?','See our Size Guide page. When in doubt, size up for a comfortable, modest fit.'],
  ['Can I cancel my order?','Orders can be cancelled within 2 hours of placing.'],
  ['Do you have a physical store?','Yes — Shivajinagar, Bengaluru. Visit by appointment for fittings.'],
];

export const FAQPage = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="static-page">
      <div className="container" style={{paddingTop:'120px',paddingBottom:'80px',maxWidth:'800px'}}>
        <span className="section-label">Help Centre</span>
        <h1 className="page-heading" style={{marginBottom:'48px'}}>Frequently Asked <em>Questions</em></h1>
        <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
          {FAQS.map(([q,a],i) => (
            <div key={i} style={{background:'var(--white)',borderBottom:'1px solid var(--cream)'}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'22px 28px',background:'none',border:'none',textAlign:'left'}}>
                <span style={{fontSize:'14px',letterSpacing:'.05em',color:'var(--charcoal)'}}>{q}</span>
                <span style={{color:'var(--gold)',fontSize:'20px',transition:'transform .3s',transform:open===i?'rotate(45deg)':'none',flexShrink:0,marginLeft:'16px'}}>+</span>
              </button>
              {open===i && <div style={{padding:'0 28px 22px',fontSize:'13px',lineHeight:'2',color:'var(--muted)'}}>{a}</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ── SHIPPING ── */
export const ShippingPage = () => (
  <div className="static-page">
    <div className="container" style={{paddingTop:'120px',paddingBottom:'80px',maxWidth:'860px'}}>
      <span className="section-label">Policies</span>
      <h1 className="page-heading" style={{marginBottom:'48px'}}>Shipping & <em>Returns</em></h1>
      {[
        ['🚚 Shipping Policy','var(--gold)', [
          ['Standard Delivery (3–5 days)','Free on orders above ₹2,000. ₹99 below.'],
          ['Express Delivery (1–2 days)','₹199 flat rate across India.'],
          ['International Shipping','Available to UAE, UK, USA, Canada.'],
          ['Processing Time','Dispatched within 1–2 business days. Custom orders 7–10 days.'],
        ]],
        ['↩️ Returns Policy','var(--accent)', [
          ['Return Window','7 days from delivery for unused, unwashed items with tags.'],
          ['Refunds','5–7 business days after receiving return. Refunded to original method.'],
          ['Non-Returnable','Accessories and custom orders cannot be returned.'],
          ['Exchanges','We happily exchange for different size or colour, subject to availability.'],
        ]],
      ].map(([title,color,items]) => (
        <div key={title} style={{background:'var(--white)',padding:'36px',borderTop:`3px solid ${color}`,marginBottom:'20px'}}>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:'300',marginBottom:'20px'}}>{title}</h3>
          {items.map(([k,v]) => (
            <p key={k} style={{fontSize:'13px',lineHeight:'2',color:'var(--muted)',marginBottom:'10px'}}>
              <strong style={{color:'var(--charcoal)'}}>{k}:</strong> {v}
            </p>
          ))}
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

/* ── NOT FOUND ── */
export const NotFoundPage = () => (
  <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--ivory)',textAlign:'center',padding:'40px'}}>
    <div>
      <p style={{fontFamily:'var(--font-display)',fontSize:'120px',fontWeight:'300',color:'var(--cream)',lineHeight:'1'}}>404</p>
      <h1 style={{fontFamily:'var(--font-display)',fontSize:'36px',fontWeight:'300',marginBottom:'12px'}}>Page <em style={{fontStyle:'italic',color:'var(--accent)'}}>not found</em></h1>
      <p style={{color:'var(--muted)',fontSize:'13px',marginBottom:'32px'}}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  </div>
);

export default AboutPage;
