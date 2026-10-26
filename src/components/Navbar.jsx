import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Search,
  Sun,
  Moon,
  X,
  Menu as MenuIcon,
  PhoneCall,
  MapPin,
  Mail,
  MessageCircle
} from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
}) {
  const { theme, toggleTheme } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animated Mobile Top Bar Announcement Items
  const mobileAnnouncements = [
    {
      id: 'phone',
      icon: <PhoneCall size={12} color="var(--color-rose)" style={{ flexShrink: 0 }} />,
      label: 'Call:',
      value: '+91 85650 98470',
      href: 'tel:+918565098470',
      target: '_self',
    },
    {
      id: 'address',
      icon: <MapPin size={12} color="var(--color-rose)" style={{ flexShrink: 0 }} />,
      label: 'Address:',
      value: 'Plot No. 37, Near Shikha Jewellers, Gopal Nagar',
      href: 'https://maps.google.com/?q=Plot+No.+37,+Near+Shikha+Jewellers,+Gopal+Nagar',
      target: '_blank',
    },
    {
      id: 'whatsapp',
      icon: <MessageCircle size={12} color="#25D366" style={{ flexShrink: 0 }} />,
      label: 'WhatsApp:',
      value: '+91 85650 98470',
      href: 'https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20would%20like%20to%20order%20a%20cake!',
      target: '_blank',
    },
    {
      id: 'email',
      icon: <Mail size={12} color="var(--color-rose)" style={{ flexShrink: 0 }} />,
      label: 'Email:',
      value: 'dagrahari415@gmail.com',
      href: 'mailto:dagrahari415@gmail.com',
      target: '_self',
    },
  ];

  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  // Automatically cycle through top bar items every 3.2 seconds
  useEffect(() => {
    if (isTickerPaused) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % mobileAnnouncements.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isTickerPaused, mobileAnnouncements.length]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/cakes?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/cakes');
    }
    setIsMobileMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--color-rose)' : 'var(--color-text-main)',
    fontWeight: isActive ? 700 : 600,
    textDecoration: 'none',
    position: 'relative',
    paddingBlock: '6px',
    fontSize: '0.94rem',
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-fast)',
    borderBottom: isActive ? '2.5px solid var(--color-rose)' : '2.5px solid transparent',
  });

  const mobileDrawerLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--color-rose)' : 'var(--color-text-main)',
    fontWeight: isActive ? 800 : 600,
    textDecoration: 'none',
    fontSize: '1.02rem',
    paddingBlock: '10px',
    paddingInline: '14px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: isActive ? 'var(--color-surface-subtle)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all var(--transition-fast)',
  });

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className="main-navbar"
      style={{
        position: 'sticky',
        insetBlockStart: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        width: '100%',
        maxWidth: '100vw',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
      }}
    >
      {/* Top Contact & Address Bar */}
      <div
        className="top-contact-bar"
        style={{
          backgroundColor: 'var(--color-chocolate)',
          color: '#FAF5EE',
          paddingBlock: '5px',
          fontSize: '0.78rem',
          fontWeight: 500,
          borderBottom: '1px solid var(--color-border-rose)',
          width: '100%',
        }}
      >
        {/* Desktop View (>768px) */}
        <div
          className="container desktop-top-contact"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Address */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={13} color="var(--color-rose)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Address:</strong> Plot No. 37, Near Shikha Jewellers, Gopal Nagar
            </span>
          </div>

          {/* Contact Details */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <a
              href="tel:+918565098470"
              className="topbar-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#FAF5EE',
                textDecoration: 'none',
              }}
            >
              <PhoneCall size={12} color="var(--color-rose)" />
              <span><strong>Phone:</strong> +91 85650 98470</span>
            </a>

            <span style={{ opacity: 0.4 }}>|</span>

            <a
              href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20would%20like%20to%20order%20a%20cake!"
              target="_blank"
              rel="noreferrer"
              className="topbar-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#FAF5EE',
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={12} color="#25D366" />
              <span><strong>WhatsApp</strong></span>
            </a>

            <span style={{ opacity: 0.4 }}>|</span>

            <a
              href="mailto:dagrahari415@gmail.com"
              className="topbar-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#FAF5EE',
                textDecoration: 'none',
              }}
            >
              <Mail size={12} color="var(--color-rose)" />
              <span>dagrahari415@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Mobile View (<=768px): Animated Rotating Announcement Ticker */}
        <div
          className="container mobile-top-contact"
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
          onTouchStart={() => setIsTickerPaused(true)}
          onTouchEnd={() => setIsTickerPaused(false)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.74rem',
            minHeight: '24px',
            paddingInline: '8px',
            overflow: 'hidden',
          }}
        >
          {(() => {
            const currentItem = mobileAnnouncements[tickerIndex];
            return (
              <a
                key={currentItem.id}
                href={currentItem.href}
                target={currentItem.target}
                rel={currentItem.target === '_blank' ? 'noreferrer' : undefined}
                className="topbar-ticker-item"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: '#FAF5EE',
                  textDecoration: 'none',
                  maxWidth: '92%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentItem.icon}
                <strong
                  style={{
                    color: currentItem.id === 'whatsapp' ? '#25D366' : 'var(--color-rose-light)',
                    flexShrink: 0,
                  }}
                >
                  {currentItem.label}
                </strong>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentItem.value}
                </span>
              </a>
            );
          })()}

          {/* Animated visual pill indicators */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              marginInlineStart: '8px',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {mobileAnnouncements.map((item, idx) => (
              <span
                key={item.id}
                style={{
                  display: 'inline-block',
                  inlineSize: idx === tickerIndex ? '9px' : '3px',
                  blockSize: '3px',
                  borderRadius: '2px',
                  backgroundColor: idx === tickerIndex ? 'var(--color-rose)' : 'rgba(250, 245, 238, 0.35)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Brand & Actions Row */}
      <div className="container" style={{ paddingBlock: '8px 4px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(8px, 2vw, 14px)',
            width: '100%',
          }}
        >
          {/* Logo & Brand Link */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 2vw, 12px)',
              textDecoration: 'none',
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            {/* The Logo */}
            <div
              style={{
                inlineSize: 'clamp(38px, 9vw, 48px)',
                blockSize: 'clamp(38px, 9vw, 48px)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--color-chocolate)',
                padding: '2px',
                backgroundColor: '#FAF5EE',
                boxShadow: '0 2px 8px rgba(70, 32, 23, 0.2)',
                display: 'grid',
                placeContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="Diksha's Cake House Logo"
                style={{
                  inlineSize: '100%',
                  blockSize: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.1rem, 3.8vw, 1.75rem)',
                  fontWeight: 800,
                  color: 'var(--color-chocolate)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Diksha's <span style={{ color: 'var(--color-rose)', fontWeight: 700 }}>Cake House</span>
              </span>
              <div
                style={{
                  fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginBlockStart: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span>Freshly Baked</span>
                <span style={{ color: 'var(--color-rose)' }}>♥</span>
                <span>Made with Love</span>
              </div>
            </div>
          </Link>

          {/* Desktop Search Form (>768px) */}
          <form
            onSubmit={handleSearchSubmit}
            className="desktop-search-form"
            style={{
              flex: '1 1 300px',
              maxWidth: '440px',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <Search
              size={17}
              color="var(--color-text-light)"
              style={{ position: 'absolute', insetInlineStart: '14px' }}
            />
            <input
              type="text"
              placeholder="Search cakes, flavors, cheesecakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                inlineSize: '100%',
                paddingInlineStart: '40px',
                paddingInlineEnd: searchTerm ? '36px' : '14px',
                paddingBlock: '9px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                outline: 'none',
                fontSize: '0.86rem',
                color: 'var(--color-text-main)',
                transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  insetInlineEnd: '12px',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </form>

          {/* Action Buttons: Theme Toggle & Mobile Hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                inlineSize: '36px',
                blockSize: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-main)',
                display: 'grid',
                placeContent: 'center',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#F59E0B" />}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-hamburger-btn"
              style={{
                inlineSize: '36px',
                blockSize: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isMobileMenuOpen ? 'var(--color-rose-light)' : 'var(--color-surface-subtle)',
                color: isMobileMenuOpen ? 'var(--color-rose)' : 'var(--color-chocolate)',
                placeContent: 'center',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Directly below brand on mobile) */}
        <form
          onSubmit={handleSearchSubmit}
          className="mobile-search-bar"
          style={{
            position: 'relative',
            marginBlockStart: '6px',
            width: '100%',
          }}
        >
          <Search
            size={15}
            color="var(--color-text-light)"
            style={{ position: 'absolute', insetInlineStart: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search chocolate truffle, red velvet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              inlineSize: '100%',
              paddingInlineStart: '36px',
              paddingInlineEnd: searchTerm ? '32px' : '12px',
              paddingBlock: '7px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              outline: 'none',
              fontSize: '0.82rem',
              color: 'var(--color-text-main)',
              boxSizing: 'border-box',
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                insetInlineEnd: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                display: 'flex',
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </form>

        {/* Navigation Page Links Row (Responsive pills on mobile) */}
        <nav
          className="navbar-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBlockStart: '6px',
            paddingBlockStart: '6px',
            borderTop: '1px solid var(--color-border)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <NavLink to="/" end style={navLinkStyle} onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/about" style={navLinkStyle} onClick={closeMobileMenu}>
            About Us
          </NavLink>
          <NavLink to="/cakes" style={navLinkStyle} onClick={closeMobileMenu}>
            Our Cakes
          </NavLink>
          <NavLink to="/menu" style={navLinkStyle} onClick={closeMobileMenu}>
            Menu
          </NavLink>
          <NavLink to="/gallery" style={navLinkStyle} onClick={closeMobileMenu}>
            Gallery
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle} onClick={closeMobileMenu}>
            Contact Us
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle} onClick={closeMobileMenu}>
            DevOps
          </NavLink>
        </nav>
      </div>

      {/* Mobile Slide-down Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '2px solid var(--color-border-rose)',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            animation: 'dialogFadeIn 0.2s ease forwards',
          }}
        >
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-rose)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBlockEnd: '6px' }}>
            Menu Navigation
          </div>

          <NavLink to="/" end style={mobileDrawerLinkStyle} onClick={closeMobileMenu}>
            <span>Home</span>
            <span style={{ opacity: 0.4 }}>➔</span>
          </NavLink>
          <NavLink to="/about" style={mobileDrawerLinkStyle} onClick={closeMobileMenu}>
            <span>About Us</span>
            <span style={{ opacity: 0.4 }}>➔</span>
          </NavLink>
          <NavLink to="/cakes" style={mobileDrawerLinkStyle} onClick={closeMobileMenu}>
            <span>Our Cakes</span>
            <span style={{ opacity: 0.4 }}>➔</span>
          </NavLink>
          <NavLink to="/menu" style={mobileDrawerLinkStyle} onClick={closeMobileMenu}>
            <span>Menu</span>
            <span style={{ opacity: 0.4 }}>➔</span>
          </NavLink>
          <NavLink to="/gallery" style={mobileDrawerLinkStyle} onClick={closeMobileMenu}>
            <span>Gallery</span>
            <span style={{ opacity: 0.4 }}>➔</span>
          </NavLink>
          <NavLink to="/contact" style={mobileDrawerLinkStyle} onClick={closeMobileMenu}>
            <span>Contact Us</span>
            <span style={{ opacity: 0.4 }}>➔</span>
          </NavLink>

          {/* Quick Contact Footer in Mobile Drawer */}
          <div
            style={{
              marginBlockStart: '12px',
              paddingBlockStart: '12px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <a
              href="tel:+918565098470"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: 'var(--color-text-main)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <PhoneCall size={15} color="var(--color-rose)" />
              <span>Call: +91 85650 98470</span>
            </a>

            <a
              href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20would%20like%20to%20order%20a%20cake!"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#25D366',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp: +91 85650 98470</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              <MapPin size={15} color="var(--color-rose)" style={{ flexShrink: 0 }} />
              <span>Plot No. 37, Near Shikha Jewellers, Gopal Nagar</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
