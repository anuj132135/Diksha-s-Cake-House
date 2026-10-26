import React, { useState } from 'react';
import { FAQS } from '../data/reviews';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function AboutSection({ onShowToast }) {
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    onShowToast?.("Message received! Chef Diksha's team will contact you shortly 🍰", 'success');
    setContactForm({ name: '', phone: '', message: '' });
  };

  return (
    <section id="about" style={{ paddingBlock: 'clamp(3rem, 6vw, 5rem)', backgroundColor: 'var(--color-surface-subtle)' }}>
      <div className="container">
        {/* Story Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
            marginBlockEnd: '60px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                backgroundColor: 'var(--color-primary-light)',
                paddingInline: '12px',
                paddingBlock: '4px',
                borderRadius: 'var(--radius-full)',
                marginBlockEnd: '12px',
              }}
            >
              <HeartHandshake size={15} />
              <span>Our Story & Philosophy</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.7rem)', fontWeight: 800, marginBlockEnd: '16px' }}>
              Baking Pure Joy at <span style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontFamily: 'var(--font-script, "Dancing Script")' }}>Diksha's Cake House</span>
            </h2>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.94rem', marginBlockEnd: '14px' }}>
              Diksha's Cake House was born out of a single obsession: to make celebration cakes that taste every bit as luxurious as they look. While commercial bakeries relied on pre-mixes, margarine, and artificial essences, we chose the artisanal path.
            </p>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.94rem', marginBlockEnd: '20px' }}>
              Every single sponge is baked fresh right upon order with <strong>100% vegetarian / eggless dedicated ovens</strong>, using single-origin Belgian chocolate, slow-churned butter, and farm-fresh fruits. No frozen sponges, zero chemical stabilisers.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary)' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Pure Vegetarian & Eggless</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-secondary)' }}>2 Hours</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Oven-Fresh Express Delivery</div>
              </div>
            </div>
          </div>

          {/* Kitchen Image Gallery */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'clip',
                boxShadow: 'var(--shadow-lg)',
                aspectRatio: '4 / 3.2',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Chef piping fresh artisanal cake"
                style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ marginBlockEnd: '60px' }}>
          <div style={{ textAlign: 'center', marginBlockEnd: '30px' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBlockEnd: '8px' }}>
              Frequently Asked Questions
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
              Everything you need to know about our cakes, eggless baking, and deliveries
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

        {/* Store Location & Contact Grid */}
        <div id="contact" style={{ scrollMarginTop: '100px' }}>
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
            }}
          >
            {/* Store Information */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  marginBlockEnd: '8px',
                }}
              >
                <MapPin size={16} />
                <span>Visit Our Bakery Kitchen</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBlockEnd: '14px' }}>
                Diksha's Cake House Flagship Studio
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBlockEnd: '24px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Diksha's Cake House:</strong> Plot No. 37, Near Shikha Jewellers, Gopal Nagar
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Clock size={18} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Bakery Ovens Active:</strong> 8:00 AM – 11:45 PM Every Day<br />
                    <em>(Midnight surprise deliveries dispatched until 12:00 AM)</em>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={18} color="var(--color-veg)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Helpline & Order Inquiries:</strong> +91 85650 98470
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <MessageCircle size={18} color="#25D366" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>WhatsApp Direct:</strong> +91 85650 98470 (Instant Cake Customization)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Mail size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Email:</strong> <a href="mailto:dagrahari415@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>dagrahari415@gmail.com</a>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20would%20like%20to%20order%20a%20cake!"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ backgroundColor: '#25D366', display: 'inline-flex', paddingInline: '20px', paddingBlock: '12px' }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct Message Form */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBlockEnd: '6px' }}>
                Have a Special Bulk or Wedding Request?
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBlockEnd: '18px' }}>
                Need a 5kg tier cake, corporate gift boxes, or party catering? Send us a quick note.
              </p>

              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    outline: 'none',
                    fontSize: '0.86rem',
                  }}
                />

                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    outline: 'none',
                    fontSize: '0.86rem',
                  }}
                />

                <textarea
                  rows={3}
                  placeholder="Tell us your celebration date, guest count, or flavor preference..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    outline: 'none',
                    fontSize: '0.86rem',
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
        </div>
      </div>
    </section>
  );
}
