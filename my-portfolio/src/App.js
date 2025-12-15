import React, { useState, useEffect } from 'react';
import './App.css';
import { Code, Cloud, Database, Layers, Bug, FolderKanban } from 'lucide-react';
import { ReactComponent as ProfileSvg } from './asserts/images/my-avatar.svg';
import { ReactComponent as Devices } from './asserts/images/hero-devices.svg';
import gmailImg from './asserts/images/gmail_5968534.png';
import linkedinImg from './asserts/images/linkedin_4008233.png';
import { EMAIL_ID, GOOGLE_SHEET_URL, LINKED_IN_URL } from './constants';

export default function Portfolio() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });
  const [loading, setLoading] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState(null);

  useEffect(() => {
    if (alert.show) {
      if (alertTimeout) clearTimeout(alertTimeout);
      
      const timeout = setTimeout(() => {
        setAlert(prevAlert => ({ ...prevAlert, show: false }));
      }, 20000);
      
      setAlertTimeout(timeout);
    }
    
    return () => {
      if (alertTimeout) clearTimeout(alertTimeout);
    };
  }, [alert.show, alertTimeout]);

  const skills = {
    frontend: ['React.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Material UI', 'Responsive Design'],
    backend: ['Node.js', 'Express.js', 'REST APIs'],
    database: ['MySQL', 'PostgreSQL'],
    cloud: ['AWS EC2', 'AWS S3', 'AWS CloudFront', 'AWS Lambda', 'AWS RDS', 'AWS Container Service'],
    debugging: ['Frontend Debugging', 'Backend Debugging', 'Performance Optimization'],
  };

  const services = [
    { icon: <Code size={48} />, title: 'Web Applications', desc: 'Scalable, user-friendly applications' },
    { icon: <Layers size={48} />, title: 'Frontend Dev', desc: 'React & modern web tech' },
    { icon: <Database size={48} />, title: 'Backend APIs', desc: 'Node.js REST APIs' },
    { icon: <Cloud size={48} />, title: 'AWS Cloud', desc: 'Deployment & maintenance' },
    {
      icon: <Bug size={48} />,
      title: 'Debugging & Troubleshooting',
      desc: 'Diagnosis and resolution of issues in live/legacy applications.',
    },
  ];

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setAlert({ show: true, msg: 'Please fill all fields', type: 'error' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setAlert({ show: true, msg: 'Invalid email', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      setAlert({ show: true, msg: "Sent! I'll reply soon.", type: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setAlert({ show: true, msg: 'Error. Try again.', type: 'error' });
    }
    setLoading(false);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <nav className="site-nav">
        <div className="nav-inner">
          <h1 className="nav-brand" onClick={() => handleNavClick('hero')}>BalaG</h1>

          {/* Desktop links (hidden on small screens via CSS) */}
          <div className="nav-links">
            {['about', 'skills', 'services', 'projects'].map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className="nav-link-btn">{s}</button>
            ))}
            <button onClick={() => scrollTo('contact')} className="nav-cta">Get in Touch</button>
          </div>

          {/* Hamburger for mobile */}
          <button className="nav-hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <span className="hamburger-icon">☰</span>
          </button>
        </div>
      </nav>

      {/* Mobile side menu (slides in) */}
      <div className={`mobile-backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal={menuOpen} aria-hidden={!menuOpen}>
        <button className="mobile-menu__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        <div className="mobile-menu__nav">
          {['about', 'skills', 'services', 'projects'].map((s) => (
            <button key={s} onClick={() => handleNavClick(s)} className="mobile-menu__item">{s}</button>
          ))}
          <button onClick={() => handleNavClick('contact')} className="mobile-menu__item mobile-menu__cta">Get in Touch</button>
        </div>
      </aside>

      <section id="hero" style={{ background: 'white', padding: '80px 24px 100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '16px', color: '#1a1a1a', className: 'ubuntu-regular' }}>Full-Stack Developer</h2>
          <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: '#666', marginBottom: '32px', lineHeight: 1.6 }} className='ubuntu-regular-italic'>
            My focus is on transforming complex challenges into clean, modern, and high-performance web applications. I manage the end-to-end development lifecycle, ensuring solutions are scalable, maintainable, and deliver superior value to the end-user.
          </p>
          <div className="hero-avatar">
            <ProfileSvg aria-label="Profile" className="hero-avatar__svg" />
          </div>
          {/* <button onClick={() => scrollTo('contact')} style={{ padding: '16px 32px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 600 }}>
            Get in Touch
          </button> */}
        </div>
      </section>

      <div className="hero-devices-wrapper" style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', paddingBottom: '0px', backgroundColor: '#FFFFFF' }}>
        <Devices aria-label="Hero Devices" className="hero-devices" />
      </div>
      <section id="about" style={{ padding: '80px 24px', background: '#6E07F3' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: '#ffffff' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '16px' }} className='ubuntu-regular'>Hi, I'm a BalaG. Nice to meet you.</h2>
          <p style={{ fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.8, marginTop: '24px' }} className='ubuntu-regular-italic'>
            My passion for web development began with curiosity and has grown into a commitment to building elegant, efficient solutions. 
            I approach every project with a problem-solving mindset, focusing on clean code, scalable architecture, and user-centric design. 
            I'm naturally curious, detail-oriented, and constantly refining my skills to stay at the forefront of web technologies.
          </p>
        </div>
      </section>

      <section id="skills" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>Skills & Technologies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: <Code size={32} color="#6366f1" />, title: 'Frontend', items: skills.frontend },
              { icon: <Layers size={32} color="#6366f1" />, title: 'Backend', items: skills.backend },
              { icon: <Database size={32} color="#6366f1" />, title: 'Database', items: skills.database },
              { icon: <Cloud size={32} color="#6366f1" />, title: 'Cloud & DevOps', items: skills.cloud },
              { icon: <Bug size={32} color="#6366f1" />, title: 'Debugging', items: skills.debugging },
            ].map((cat, i) => (
              <div key={i} style={{ padding: '24px', border: '1px solid #e0e0e0', borderRadius: '8px', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <span>{cat.icon}</span>
                  <h3 style={{ paddingLeft: '20px', fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>{cat.title}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.items.map((skill) => (
                    <span key={skill} style={{ padding: '6px 12px', background: '#f0f0f0', borderRadius: '16px', fontSize: '0.9rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: '24px', border: '1px solid #e0e0e0', borderRadius: '8px', background: 'white', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ color: '#6366f1', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>My Recent Work</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', fontSize: '1.1rem' }}>Projects coming soon</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[1].map((p) => (
              <div key={p} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ height: '180px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FolderKanban size={64} color="white" />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Coming Soon</h3>
                  <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>Real-world full-stack applications</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>Let's Work Together</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>
            Have a project in mind? Send me a message!
          </p>
          <div style={{ padding: '32px', border: '1px solid #e0e0e0', borderRadius: '8px', background: 'white' }}>
            <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <textarea placeholder="Message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} style={{ width: '100%', padding: '14px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
            <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '16px', background: loading ? '#ccc' : '#6366f1', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600 }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px 24px', background: 'white', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
        <p style={{ color: '#666', marginBottom: '16px', fontSize: '0.95rem' }}>Living, learning, & leveling up one day at a time.</p>
        <a href={`mailto:${EMAIL_ID}?subject=Contact%20Request&body=Hi%20Bala,`}>
          <img src={gmailImg} alt="Email" style={{ width: 24, height: 24, cursor: 'pointer', verticalAlign: 'middle' }} />
        </a>
        <img
          src={linkedinImg}
          alt="LinkedIn"
          style={{ width: 24, height: 24, cursor: 'pointer', marginLeft: '8px', verticalAlign: 'middle' }}
          onClick={() => window.open(LINKED_IN_URL, '_blank')}
        />
        <p style={{ color: '#999', marginTop: '16px', fontSize: '0.9rem' }}>© 2025. BalaG Developed With Passion.</p>
      </footer>

      {alert.show && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: alert.type === 'error' ? '#ef4444' : '#10b981', color: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', maxWidth: '90%', zIndex: 9999, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', justifyContent: 'space-between' }}>
            <span style={{ flex: 1 }}>{alert.msg}</span>
            <button onClick={() => setAlert(prevAlert => ({ ...prevAlert, show: false }))} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1, padding: 0, flexShrink: 0 }}>×</button>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255,255,255,0.3)',
            animation: 'progressBar 30s linear forwards'
          }} />
        </div>
      )}
    </div>
  );
}