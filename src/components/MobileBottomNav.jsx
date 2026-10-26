import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Home, UtensilsCrossed, Wand2, Clock, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav({ onOpenCart }) {
  const { cartItemCount } = useCart();

  const getLinkStyle = ({ isActive }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
    fontSize: '0.68rem',
    fontWeight: isActive ? 700 : 500,
    textDecoration: 'none',
    padding: '6px 12px',
    position: 'relative',
    touchAction: 'manipulation',
    flex: 1,
  });

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <NavLink to="/" end style={getLinkStyle}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/cakes" style={getLinkStyle}>
        <UtensilsCrossed size={20} />
        <span>Menu</span>
      </NavLink>

      <NavLink to="/custom-studio" style={getLinkStyle}>
        <Wand2 size={20} color="var(--color-secondary)" />
        <span style={{ color: 'var(--color-secondary)' }}>Studio</span>
      </NavLink>

      <NavLink to="/track-order" style={getLinkStyle}>
        <Clock size={20} />
        <span>Track</span>
      </NavLink>

      <button
        onClick={onOpenCart}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          color: 'var(--color-text-muted)',
          fontSize: '0.68rem',
          fontWeight: 600,
          padding: '6px 12px',
          position: 'relative',
          touchAction: 'manipulation',
          flex: 1,
        }}
        aria-label="View Cart"
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={20} />
          {cartItemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                insetBlockStart: '-6px',
                insetInlineEnd: '-8px',
                backgroundColor: 'var(--color-primary)',
                color: '#FFF',
                fontSize: '0.65rem',
                fontWeight: 800,
                inlineSize: '16px',
                blockSize: '16px',
                borderRadius: '50%',
                display: 'grid',
                placeContent: 'center',
              }}
            >
              {cartItemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>
    </nav>
  );
}
