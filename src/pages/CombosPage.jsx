import React from 'react';
import SpecialCombos from '../components/SpecialCombos';
import { Sparkles, Gift } from 'lucide-react';

export default function CombosPage({ onShowToast }) {
  return (
    <div>
      <div style={{ paddingBlockStart: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
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
            <Gift size={16} />
            <span>Party Combos & Hampers</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, marginBlockEnd: '8px' }}>
            Celebration Bundles & Gift Hampers
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '640px', marginInline: 'auto' }}>
            Curated hampers with gourmet cakes, fresh Dutch roses, sparkler candles, and handwritten calligraphy cards — saving you up to 20%!
          </p>
        </div>
      </div>

      <SpecialCombos onShowToast={onShowToast} />
    </div>
  );
}
