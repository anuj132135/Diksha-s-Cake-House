import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        insetBlockEnd: '24px',
        insetInlineEnd: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
        maxWidth: '380px',
        width: 'calc(100% - 32px)',
      }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-main)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            borderLeft: `5px solid ${
              toast.type === 'error' ? '#EF4444' :
              toast.type === 'info' ? '#3B82F6' : '#16A34A'
            }`,
            animation: 'dialogFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {toast.type === 'error' ? (
            <AlertCircle size={20} color="#EF4444" style={{ flexShrink: 0 }} />
          ) : toast.type === 'info' ? (
            <Info size={20} color="#3B82F6" style={{ flexShrink: 0 }} />
          ) : (
            <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0 }} />
          )}

          <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500 }}>
            {toast.message}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              padding: '4px',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Dismiss toast"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
