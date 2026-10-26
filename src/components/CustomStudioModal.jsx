import React, { useRef } from 'react';
import { useDialogFallback } from '../hooks/useDialogFallback';
import CakeStudio from './CakeStudio';
import { X, Wand2 } from 'lucide-react';

export default function CustomStudioModal({ isOpen, onClose, onShowToast }) {
  const dialogRef = useRef(null);
  useDialogFallback(dialogRef, isOpen, onClose);

  return (
    <dialog
      ref={dialogRef}
      id="customStudioDialog"
      closedby="any"
      aria-labelledby="studioTitle"
      style={{
        width: 'min(95vw, 940px)',
        padding: 0,
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                inlineSize: '36px',
                blockSize: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary-light)',
                color: 'var(--color-secondary)',
                display: 'grid',
                placeContent: 'center',
              }}
            >
              <Wand2 size={20} />
            </div>
            <div>
              <h2 id="studioTitle" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                Diksha Cake Studio — Design Your Dream Cake
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Customize tiers, flavor sponge, frosting palette, toppings & live piped message
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--color-text-muted)',
              display: 'grid',
              placeContent: 'center',
            }}
            aria-label="Close studio"
          >
            <X size={20} />
          </button>
        </div>

        {/* Studio Content */}
        <div style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>
          <CakeStudio onClose={onClose} onShowToast={onShowToast} />
        </div>
      </div>
    </dialog>
  );
}
