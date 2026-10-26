import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAKES, CATEGORIES } from '../data/cakes';
import { Utensils, Download, PhoneCall, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function MenuPage({ onShowToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all'
    ? CAKES
    : CAKES.filter(cake => cake.category === selectedCategory);

  const handleDownloadMenu = () => {
    window.print();
    onShowToast?.("Menu print / download dialog opened!", 'info');
  };

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBlockEnd: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-rose-light)',
              color: 'var(--color-rose)',
              fontWeight: 700,
              fontSize: '0.82rem',
              paddingInline: '14px',
              paddingBlock: '4px',
              borderRadius: 'var(--radius-full)',
              marginBlockEnd: '10px',
            }}
          >
            <Utensils size={14} />
            <span>Artisanal Patisserie Menu</span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--color-chocolate)',
              marginBlockEnd: '12px',
            }}
          >
            Diksha's Cake House Menu
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.6 }}>
            Handcrafted fresh upon order with 100% vegetarian & eggless dedicated ovens, single-origin Belgian chocolate, and pure dairy butter.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBlockStart: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadMenu}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                paddingInline: '18px',
                paddingBlock: '10px',
                fontSize: '0.88rem',
              }}
            >
              <Download size={16} color="var(--color-chocolate)" />
              <span>Print / Save Menu PDF</span>
            </button>
            <a
              href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20would%20like%20to%20place%20a%20custom%20menu%20order!"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                paddingInline: '18px',
                paddingBlock: '10px',
                fontSize: '0.88rem',
              }}
            >
              <PhoneCall size={16} />
              <span>Call Chef for Custom Bakes</span>
            </a>
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBlockEnd: '32px',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                paddingInline: '16px',
                paddingBlock: '8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: selectedCategory === cat.id ? '2px solid var(--color-chocolate)' : '1px solid var(--color-border)',
                backgroundColor: selectedCategory === cat.id ? 'var(--color-chocolate)' : 'var(--color-surface)',
                color: selectedCategory === cat.id ? '#FAF5EE' : 'var(--color-text-main)',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '14px', marginBlockEnd: '14px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      inlineSize: '84px',
                      blockSize: '84px',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                    loading="lazy"
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBlockEnd: '4px' }}>
                      <span className="veg-symbol" />
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-veg)', fontWeight: 700 }}>100% EGGLESS</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBlockEnd: '4px', color: 'var(--color-chocolate)' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-rose)', fontWeight: 600 }}>
                      {item.flavor}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBlockEnd: '16px' }}>
                  {item.description}
                </p>

                {/* Weight Options with Live Pricing */}
                <div style={{ marginBlockEnd: '16px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-main)', marginBlockEnd: '6px' }}>
                    Available Sizes & Pricing:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.weights.map(w => (
                      <span
                        key={w.weight}
                        style={{
                          backgroundColor: 'var(--color-surface-subtle)',
                          paddingInline: '8px',
                          paddingBlock: '4px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          border: '1px solid var(--color-border)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <strong>{w.weight}:</strong> ₹{w.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '12px',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block' }}>Starts at</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-chocolate)' }}>₹{item.basePrice}</span>
                </div>

                <Link
                  to={`/cake/${item.id}`}
                  className="btn-primary"
                  style={{
                    paddingInline: '14px',
                    paddingBlock: '7px',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Order Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
