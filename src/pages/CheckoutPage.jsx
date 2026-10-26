import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Calendar, MapPin, CreditCard, ShieldCheck, Share2, Printer, ArrowLeft } from 'lucide-react';

export default function CheckoutPage({ onShowToast }) {
  const navigate = useNavigate();
  const { cart, selectedAddons, subtotal, deliveryFee, discountAmount, grandTotal, placeOrder } = useCart();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    phone: '8565098470',
    address: 'Plot No. 37, Near Shikha Jewellers, Gopal Nagar',
    city: 'New Delhi',
    pincode: '110048',
    deliveryDate: 'Today (Express 2-Hour)',
    deliverySlot: 'Evening (4:00 PM - 8:00 PM)',
    instructions: 'Please handle cake box with care.',
    paymentMethod: 'UPI',
  });

  const [placedOrder, setPlacedOrder] = useState(null);

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="container" style={{ paddingBlock: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBlockEnd: '12px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBlockEnd: '20px' }}>
          Please add cakes to your cart before proceeding to checkout.
        </p>
        <Link to="/cakes" className="btn-primary">
          Explore Cake Menu
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill in all mandatory delivery fields.');
      return;
    }
    setStep(2);
  };

  const handleConfirmOrder = () => {
    const order = placeOrder(formData);
    setPlacedOrder(order);
    setStep(3);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D9485C', '#F59E0B', '#10B981', '#FF6579', '#D4AF37'],
      });
    } catch {}

    onShowToast?.("Order placed successfully! Diksha's Cake House is preparing your bake 🎂", 'success');
  };

  const handleShareWhatsApp = () => {
    if (!placedOrder) return;
    const itemsList = placedOrder.items.map(i => `• ${i.name} (${i.weight}) x${i.quantity} ${i.message ? `- "${i.message}"` : ''}`).join('%0A');
    const text = `🎂 *Diksha's Cake House Order Confirmation*%0A*Order ID:* ${placedOrder.orderId}%0A*Recipient:* ${placedOrder.customerName}%0A*Delivery Slot:* ${placedOrder.slot}%0A*Address:* ${placedOrder.address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Paid:* ₹${placedOrder.totalAmount}%0A%0AThank you for ordering with Diksha's Cake House! ✨`;

    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ marginBlockEnd: '24px' }}>
          {step < 3 && (
            <button
              onClick={() => (step === 2 ? setStep(1) : navigate('/cart'))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.86rem',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                marginBlockEnd: '12px',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to {step === 2 ? 'Delivery Details' : 'Cart'}</span>
            </button>
          )}

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 800 }}>
            {step === 3 ? '🎉 Celebration Order Confirmed!' : "Diksha's Cake House Safe Checkout"}
          </h1>
        </div>

        {/* Card Box */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* STEP 1: Delivery Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      inlineSize: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-subtle)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                    Mobile Number (For Delivery OTP) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      inlineSize: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-subtle)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                  Street Address & House / Flat No. *
                </label>
                <textarea
                  required
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    inlineSize: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={{
                      inlineSize: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-subtle)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    style={{
                      inlineSize: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface-subtle)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Delivery Timing Slot */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <label style={{ fontSize: '0.84rem', fontWeight: 700, display: 'block', marginBlockEnd: '10px' }}>
                  Choose Delivery Slot:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  {[
                    { slot: 'Standard Morning (9 AM - 12 PM)', icon: '☀️' },
                    { slot: 'Afternoon Delight (12 PM - 4 PM)', icon: '🌤️' },
                    { slot: 'Evening Party (4 PM - 8 PM)', icon: '🌆' },
                    { slot: 'Midnight Surprise (11:30 PM - 12:00 AM)', icon: '🌙' },
                  ].map(s => (
                    <button
                      type="button"
                      key={s.slot}
                      onClick={() => setFormData(prev => ({ ...prev, deliverySlot: s.slot }))}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        border: formData.deliverySlot === s.slot ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: formData.deliverySlot === s.slot ? 'var(--color-primary-light)' : 'var(--color-surface)',
                        color: formData.deliverySlot === s.slot ? 'var(--color-primary)' : 'var(--color-text-main)',
                        textAlign: 'left',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{s.icon}</span>
                        <span>{s.slot}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ inlineSize: '100%', paddingBlock: '14px', fontSize: '1rem', marginBlockStart: '8px' }}
              >
                <span>Continue to Payment (₹{grandTotal})</span>
              </button>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                Select your payment method:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: 'UPI', name: 'Instant UPI / QR Code (Google Pay, PhonePe, Paytm)', desc: 'Zero gateway fees • Instant verification', icon: '📱' },
                  { id: 'Card', name: 'Credit or Debit Card', desc: 'Visa, MasterCard, RuPay, Amex', icon: '💳' },
                  { id: 'Netbanking', name: 'Net Banking (All Indian Banks)', desc: 'HDFC, ICICI, SBI, Axis, Kotak', icon: '🏦' },
                  { id: 'COD', name: 'Cash / UPI on Delivery', desc: 'Pay when cake arrives fresh at your door', icon: '💵' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: p.id }))}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.paymentMethod === p.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: formData.paymentMethod === p.id ? 'var(--color-primary-light)' : 'var(--color-surface-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: formData.paymentMethod === p.id ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {p.desc}
                      </div>
                    </div>
                    {formData.paymentMethod === p.id && <CheckCircle2 size={18} color="var(--color-primary)" />}
                  </button>
                ))}
              </div>

              {/* Price Strip */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.86rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '4px' }}>
                  <span>Grand Total to Pay:</span>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                    ₹{grandTotal}
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-veg)', fontWeight: 600 }}>
                  ✓ 100% Secure 256-bit SSL encrypted checkout
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                  style={{ flex: 1, paddingBlock: '12px' }}
                >
                  Back
                </button>

                <button
                  onClick={handleConfirmOrder}
                  className="btn-primary"
                  style={{ flex: 2, paddingBlock: '12px', fontSize: '1rem' }}
                >
                  <span>Pay & Place Order</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 3 && placedOrder && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div
                style={{
                  inlineSize: '64px',
                  blockSize: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-veg-bg)',
                  color: 'var(--color-veg)',
                  display: 'grid',
                  placeContent: 'center',
                  marginBlockEnd: '14px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBlockEnd: '6px' }}>
                Thank You, {placedOrder.customerName}!
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBlockEnd: '20px' }}>
                Your celebration cake has been sent to Chef Diksha's oven station!
              </p>

              {/* Summary Box */}
              <div
                style={{
                  inlineSize: '100%',
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px',
                  textAlign: 'left',
                  fontSize: '0.86rem',
                  lineHeight: 1.7,
                  marginBlockEnd: '20px',
                }}
              >
                <div><strong>Order ID:</strong> <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>#{placedOrder.orderId}</span></div>
                <div><strong>Delivery Slot:</strong> {placedOrder.slot}</div>
                <div><strong>Delivery Address:</strong> {placedOrder.address}</div>
                <div><strong>Total Paid:</strong> ₹{placedOrder.totalAmount} ({placedOrder.paymentMethod})</div>
                <div style={{ borderTop: '1px dashed var(--color-border)', marginBlockStart: '8px', paddingBlockStart: '8px' }}>
                  <strong>Cakes Ordered:</strong>
                  <ul style={{ paddingInlineStart: '18px', marginBlockStart: '4px' }}>
                    {placedOrder.items.map((it, idx) => (
                      <li key={idx}>
                        {it.name} ({it.weight}) x{it.quantity} {it.message ? `- Piped: "${it.message}"` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', inlineSize: '100%' }}>
                <button
                  onClick={handleShareWhatsApp}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    paddingBlock: '10px',
                    borderColor: '#25D366',
                    color: '#128C7E',
                  }}
                >
                  <Share2 size={16} />
                  <span>WhatsApp Slip</span>
                </button>

                <button
                  onClick={handlePrintSlip}
                  className="btn-secondary"
                  style={{ flex: 1, paddingBlock: '10px' }}
                >
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>
              </div>

              <Link
                to="/track-order"
                className="btn-primary"
                style={{ inlineSize: '100%', paddingBlock: '14px', marginBlockStart: '12px', fontSize: '0.98rem' }}
              >
                <Clock size={18} />
                <span>Track Cake Live in Transit</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
