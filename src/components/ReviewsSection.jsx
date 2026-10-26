import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp } from 'lucide-react';

export default function ReviewsSection({ onShowToast }) {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    cake: 'Royal Belgian Truffle',
    rating: 5,
    text: '',
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      alert('Please enter your name and review message.');
      return;
    }

    const created = {
      id: Date.now(),
      name: newReview.name,
      city: 'Delhi NCR',
      rating: newReview.rating,
      date: 'Just now',
      cake: newReview.cake,
      text: newReview.text,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      verified: true,
    };

    setReviewsList([created, ...reviewsList]);
    setShowReviewModal(false);
    setNewReview({ name: '', cake: 'Royal Belgian Truffle', rating: 5, text: '' });
    onShowToast?.('Thank you for your sweet feedback! Review posted ❤️', 'success');
  };

  return (
    <section id="reviews" style={{ paddingBlock: 'clamp(3rem, 6vw, 4.5rem)' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBlockEnd: '36px',
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
                marginBlockEnd: '6px',
              }}
            >
              <Star size={16} fill="var(--color-star)" color="var(--color-star)" />
              <span>Sweet Words from Real Celebrations</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: 800 }}>
              Loved by 50,000+ Families
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-secondary"
            style={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
            }}
          >
            <MessageSquarePlus size={18} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Overview Stats Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            border: '1px solid var(--color-border)',
            marginBlockEnd: '32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
              4.94
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBlock: '6px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="var(--color-star)" color="var(--color-star)" />
              ))}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Based on 1,280+ verified bakery orders
            </div>
          </div>

          <div style={{ borderInlineStart: '1px solid var(--color-border)', paddingInlineStart: '20px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, marginBlockEnd: '8px' }}>
              Why Customers Love Diksha's Cake House:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <div>✓ 100% Eggless pure vegetarian dedicated kitchen</div>
              <div>✓ Real Belgian chocolate & fresh dairy butter</div>
              <div>✓ Flawless 11:30 PM midnight surprise deliveries</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          {reviewsList.map(review => (
            <div
              key={review.id}
              className="card"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBlockEnd: '12px' }}>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    style={{
                      inlineSize: '46px',
                      blockSize: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '0.94rem' }}>{review.name}</strong>
                      {review.verified && (
                        <CheckCircle size={14} color="var(--color-veg)" title="Verified Buyer" />
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
                      {review.city} • {review.date}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBlockEnd: '8px' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--color-star)" color="var(--color-star)" />
                  ))}
                </div>

                {/* Cake Ordered Tag */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--color-surface-subtle)',
                    paddingInline: '8px',
                    paddingBlock: '3px',
                    borderRadius: 'var(--radius-sm)',
                    marginBlockEnd: '10px',
                    color: 'var(--color-primary)',
                  }}
                >
                  Ordered: {review.cake}
                </div>

                {/* Review Text */}
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            display: 'grid',
            placeContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowReviewModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '28px',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBlockEnd: '6px' }}>
              Share Your Celebration Story
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBlockEnd: '18px' }}>
              How was your cake from Diksha's Cake House? We would love to hear!
            </p>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Shalini Saxena"
                  style={{
                    inlineSize: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                  Cake You Enjoyed
                </label>
                <input
                  type="text"
                  value={newReview.cake}
                  onChange={(e) => setNewReview({ ...newReview, cake: e.target.value })}
                  placeholder="e.g. Royal Belgian Truffle"
                  style={{
                    inlineSize: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                  Rating
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setNewReview({ ...newReview, rating: num })}
                      style={{ fontSize: '1.4rem' }}
                    >
                      <Star
                        size={24}
                        fill={num <= newReview.rating ? 'var(--color-star)' : 'none'}
                        color="var(--color-star)"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBlockEnd: '4px' }}>
                  Your Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Tell us about the flavor, freshness, presentation, and celebration..."
                  style={{
                    inlineSize: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBlockStart: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1, paddingBlock: '10px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 2, paddingBlock: '10px' }}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
