import React, { useState } from 'react';
import { FAQS } from '../data/reviews';
import { MapPin, Clock, Phone, MessageCircle, Send, Mail } from 'lucide-react';

export default function ContactPage({ onShowToast }) {
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    onShowToast?.("Thank you! Chef Diksha's team will contact you shortly 🍰", 'success');
    setContactForm({ name: '', phone: '', message: '' });
  };

  return (
    <div style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              backgroundColor: 'var(--color-primary-light)',
              paddingInline: '14px',
              paddingBlock: '4px',
              borderRadius: 'var(--radius-full)',
              marginBlockEnd: '10px',
            }}
          >
            <MapPin size={16} />
            <span>Store Locator & Support</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBlockEnd: '12px' }}>
            Contact Diksha's Cake House
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '640px', marginInline: 'auto' }}>
            We'd love to assist with your wedding cakes, corporate bulk orders, midnight deliveries, or custom inquiries.
          </p>
        </div>

        {/* Store & Form Grid */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '36px',
            marginBlockEnd: '60px',
          }}
        >
          {/* Store Info */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBlockEnd: '16px' }}>
              Flagship Studio & Kitchen
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBlockEnd: '28px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <MapPin size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Address:</strong><br />
                  Plot No. 37, Near Shikha Jewellers, Gopal Nagar
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Clock size={20} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Baking & Delivery Hours:</strong><br />
                  Open Every Day: 8:00 AM – 11:45 PM<br />
                  <em>(Midnight surprise delivery dispatch until 12:00 AM)</em>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Phone size={20} color="var(--color-veg)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Helpline & Order Desk:</strong><br />
                  +91 85650 98470
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <MessageCircle size={20} color="#25D366" style={{ flexShrink: 0 }} />
                <div>
                  <strong>WhatsApp Customization Desk:</strong><br />
                  +91 85650 98470 (Instant reply with chef)
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Mail size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Official Email Desk:</strong><br />
                  <a href="mailto:dagrahari415@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    dagrahari415@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20would%20like%20to%20order%20a%20cake!"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ backgroundColor: '#25D366', display: 'inline-flex', paddingInline: '22px', paddingBlock: '12px' }}
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>

          {/* Contact Inquiry Form */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBlockEnd: '6px' }}>
              Send Chef Diksha a Message
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBlockEnd: '18px' }}>
              Planning a tier wedding cake, anniversary event, or have a dietary question?
            </p>

            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />

              <input
                type="tel"
                required
                placeholder="Mobile Number"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />

              <textarea
                rows={4}
                required
                placeholder="Celebration date, expected guests, custom flavor, or special instructions..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  resize: 'none',
                }}
              />

              <button
                type="submit"
                className="btn-primary"
                style={{ paddingBlock: '12px', marginBlockStart: '4px' }}
              >
                <Send size={16} />
                <span>Send Inquiry</span>
              </button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div style={{ textAlign: 'center', marginBlockEnd: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
              Quick answers regarding our baking, ordering, deliveries, and eggless certification
            </p>
          </div>

          <div style={{ maxWidth: '780px', marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    overflow: 'clip',
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    style={{
                      inlineSize: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.94rem',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 300 }}>{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 16px 20px',
                        fontSize: '0.88rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
