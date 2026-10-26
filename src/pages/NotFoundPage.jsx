import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ paddingBlock: '80px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div style={{ fontSize: '4.5rem', marginBlockEnd: '14px' }}>🎂❓</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBlockEnd: '8px' }}>
          404 — Page Not Found
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBlockEnd: '24px' }}>
          Looks like this page got eaten or doesn't exist! Let's get you back to the freshly baked cakes.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ paddingInline: '20px', paddingBlock: '10px' }}>
            <Home size={16} />
            <span>Go to Home</span>
          </Link>
          <Link to="/cakes" className="btn-secondary" style={{ paddingInline: '20px', paddingBlock: '10px' }}>
            <span>Browse Cakes Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
