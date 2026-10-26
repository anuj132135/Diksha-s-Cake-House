import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, CAKES } from '../data/cakes';
import CakeCard from '../components/CakeCard';
import { Sparkles, Filter, Search } from 'lucide-react';

export default function CakesPage({ egglessOnly, onQuickView, onShowToast }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (searchParam) setSearchTerm(searchParam);
    if (categoryParam) setActiveCategory(categoryParam);
  }, [searchParam, categoryParam]);

  // Filter and Sort Cakes
  const filteredCakes = useMemo(() => {
    return CAKES.filter(cake => {
      // Search filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = cake.name.toLowerCase().includes(query);
        const matchesFlavor = cake.flavor?.toLowerCase().includes(query);
        const matchesDesc = cake.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesFlavor && !matchesDesc) return false;
      }

      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'bestseller') {
          if (!cake.isPopular) return false;
        } else if (cake.category !== activeCategory) {
          return false;
        }
      }

      // Eggless filter
      if (egglessOnly && !cake.isEggless) return false;

      // Price filter
      if (priceFilter === 'under-500' && cake.basePrice >= 500) return false;
      if (priceFilter === '500-1000' && (cake.basePrice < 500 || cake.basePrice > 1000)) return false;
      if (priceFilter === '1000-2000' && (cake.basePrice < 1000 || cake.basePrice > 2000)) return false;
      if (priceFilter === 'above-2000' && cake.basePrice <= 2000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [searchTerm, activeCategory, egglessOnly, priceFilter, sortBy]);

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              backgroundColor: 'var(--color-primary-light)',
              paddingInline: '12px',
              paddingBlock: '4px',
              borderRadius: 'var(--radius-full)',
              marginBlockEnd: '10px',
            }}
          >
            <Sparkles size={14} />
            <span>Dedicated Confectionery Menu</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 800, marginBlockEnd: '8px' }}>
            Diksha's Cake House Confectionery Catalog
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', maxWidth: '640px', marginInline: 'auto' }}>
            Explore our curated menu of handcrafted signature cakes, gourmet cheesecakes, pinata bakes, and fresh artisanal breads.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBlockEnd: '24px',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchParams(prev => {
                  if (cat.id === 'all') prev.delete('category');
                  else prev.set('category', cat.id);
                  return prev;
                });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                paddingInline: '16px',
                paddingBlock: '10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: activeCategory === cat.id
                  ? '1.5px solid var(--color-primary)'
                  : '1px solid var(--color-border)',
                backgroundColor: activeCategory === cat.id
                  ? 'var(--color-primary)'
                  : 'var(--color-surface)',
                color: activeCategory === cat.id ? '#FFFFFF' : 'var(--color-text-main)',
                boxShadow: activeCategory === cat.id ? 'var(--shadow-primary)' : 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Filter Controls Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            padding: '16px 20px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            marginBlockEnd: '28px',
          }}
        >
          <div style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{filteredCakes.length}</strong> cakes
            {searchTerm && <span> for "<em>{searchTerm}</em>"</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Price Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>
                Budget:
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              >
                <option value="all">All Prices</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1,000</option>
                <option value="1000-2000">₹1,000 - ₹2,000</option>
                <option value="above-2000">Luxury (₹2,000+)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated (4.9+ ★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cakes Grid (CSS Grid per modern-web-guidance: repeat(auto-fill, minmax(280px, 1fr))) */}
        {filteredCakes.length === 0 ? (
          <div
            style={{
              paddingBlock: '60px',
              textAlign: 'center',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--color-border)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBlockEnd: '10px' }}>🧁</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBlockEnd: '6px' }}>
              No cakes found matching your search
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBlockEnd: '20px' }}>
              Try clearing filters or search terms.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
                setPriceFilter('all');
                setSearchParams({});
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '24px',
            }}
          >
            {filteredCakes.map(cake => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onQuickView={onQuickView}
                onShowToast={onShowToast}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
