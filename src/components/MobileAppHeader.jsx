import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  MapPin,
  ChevronDown,
  Search,
  X,
  Sun,
  Moon,
  Clock,
  Sparkles,
} from 'lucide-react';

const APP_CATEGORY_BUBBLES = [
  { id: 'all', name: 'All Cakes', icon: '🎂', path: '/cakes' },
  { id: 'bestseller', name: 'Trending 🔥', icon: '⭐', path: '/cakes?category=bestseller' },
  { id: 'chocolate', name: 'Belgian Choco', icon: '🍫', path: '/cakes?category=chocolate' },
  { id: 'studio', name: '3D Studio 🎨', icon: '✨', path: '/custom-studio', highlight: true },
  { id: 'fruit', name: 'Fresh Fruit', icon: '🍓', path: '/cakes?category=fruit' },
  { id: 'cheesecake', name: 'Cheesecakes', icon: '🍰', path: '/cakes?category=cheesecake' },
  { id: 'designer', name: 'Pinata Smash', icon: '🔨', path: '/cakes?category=designer' },
  { id: 'pastry', name: 'Cupcakes', icon: '🧁', path: '/cakes?category=pastry' },
  { id: 'combos', name: 'Hampers', icon: '🎁', path: '/combos' },
];

export default function MobileAppHeader({
  searchTerm,
  setSearchTerm,
  egglessOnly,
  setEgglessOnly,
}) {
  const { theme, toggleTheme, wishlist } = useCart();
  const navigate = useNavigate();
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Home — Gopal Nagar, Plot 37');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/cakes?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/cakes');
    }
  };

  return (
    <div
      className="mobile-app-header"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        insetBlockStart: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)',
        paddingTop: 'env(safe-area-inset-top, 6px)',
      }}
    >
      {/* Top Brand & Location Row */}
      <div
        style={{
          paddingInline: '14px',
          paddingBlock: '10px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Brand Logo & Responsive Name with Delivery Address */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <Link to="/" style={{ flexShrink: 0, display: 'block' }}>
            <div
              style={{
                inlineSize: '44px',
                blockSize: '44px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--color-chocolate)',
                padding: '2px',
                backgroundColor: '#FAF5EE',
                boxShadow: '0 2px 8px rgba(70, 32, 23, 0.2)',
                display: 'grid',
                placeContent: 'center',
              }}
            >
              <img
                src="/logo.png"
                alt="Diksha's Cake House"
                style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.12rem, 4.4vw, 1.45rem)',
                fontWeight: 800,
                color: 'var(--color-chocolate)',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
              }}
            >
              Diksha's <span style={{ color: 'var(--color-rose)', fontWeight: 700 }}>Cake House</span>
            </Link>

            <button
              onClick={() => setShowAddressPicker(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.72rem',
                color: 'var(--color-text-muted)',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                margin: '2px 0 0 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}
              aria-label="Change delivery location"
            >
              <MapPin size={11} color="var(--color-rose)" style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedAddress}
              </span>
              <ChevronDown size={11} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
            </button>
          </div>
        </div>

        {/* Right Action: Theme toggle only */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-main)',
              display: 'grid',
              placeContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} color="#F59E0B" />}
          </button>
        </div>
      </div>

      {/* Second Row: App Search Bar */}
      <div style={{ paddingInline: '14px', paddingBlock: '4px 8px' }}>
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
          <Search
            size={18}
            color="var(--color-text-light)"
            style={{ position: 'absolute', insetInlineStart: '12px', insetBlockStart: '12px' }}
          />
          <input
            type="text"
            placeholder="Search chocolate, red velvet, cheesecakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              inlineSize: '100%',
              paddingInlineStart: '38px',
              paddingInlineEnd: searchTerm ? '36px' : '14px',
              paddingBlock: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              outline: 'none',
              fontSize: '16px',
              color: 'var(--color-text-main)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                insetInlineEnd: '10px',
                insetBlockStart: '10px',
                padding: '4px',
                color: 'var(--color-text-muted)',
              }}
            >
              <X size={16} />
            </button>
          )}
        </form>
      </div>

      {/* Third Row: App Stories / Category Bubbles (Matching Logo Colors) */}
      <div className="app-category-bubbles">
        {APP_CATEGORY_BUBBLES.map(bubble => (
          <Link
            key={bubble.id}
            to={bubble.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                inlineSize: '54px',
                blockSize: '54px',
                borderRadius: '50%',
                background: bubble.highlight
                  ? 'linear-gradient(135deg, #E57385, #462017)'
                  : 'linear-gradient(135deg, #FAF5EE, #F6EDE2)',
                border: bubble.highlight
                  ? '2px solid var(--color-rose)'
                  : '1.5px solid var(--color-border)',
                display: 'grid',
                placeContent: 'center',
                fontSize: '1.45rem',
                boxShadow: bubble.highlight ? '0 4px 12px rgba(229, 115, 133, 0.35)' : 'var(--shadow-sm)',
                transition: 'transform var(--transition-fast)',
              }}
            >
              {bubble.icon}
            </div>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: bubble.highlight ? 800 : 600,
                color: bubble.highlight ? 'var(--color-rose)' : 'var(--color-text-main)',
                whiteSpace: 'nowrap',
              }}
            >
              {bubble.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Address Selection Bottom Sheet Modal */}
      {showAddressPicker && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setShowAddressPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              inlineSize: '100%',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px 24px 0 0',
              padding: '20px',
              boxShadow: 'var(--shadow-lg)',
              animation: 'bottomSheetSlideUp 0.25s ease',
            }}
          >
            <div className="sheet-handle" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBlockEnd: '14px', color: 'var(--color-chocolate)' }}>
              Select Delivery Address
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBlockEnd: '16px' }}>
              {[
                { title: 'Home', address: 'Plot No. 37, Near Shikha Jewellers, Gopal Nagar', tag: 'Fastest' },
                { title: 'Office / Studio', address: 'Plot 18, Cyber Boulevard, DLF Phase 2, Gurugram', tag: '2-Hr Express' },
                { title: 'Celebration Venue', address: 'Emerald Grand Banquet Hall, South City 1, Delhi NCR', tag: 'Midnight Slot' },
              ].map(addr => (
                <button
                  key={addr.title}
                  onClick={() => {
                    setSelectedAddress(`${addr.title} — ${addr.address.split(',')[1]}`);
                    setShowAddressPicker(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    textAlign: 'left',
                  }}
                >
                  <MapPin size={20} color="var(--color-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '0.9rem' }}>{addr.title}</strong>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          backgroundColor: 'var(--color-rose-light)',
                          color: 'var(--color-rose)',
                          paddingInline: '6px',
                          paddingBlock: '1px',
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 700,
                        }}
                      >
                        {addr.tag}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      {addr.address}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddressPicker(false)}
              className="btn-secondary"
              style={{ inlineSize: '100%', paddingBlock: '12px' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
