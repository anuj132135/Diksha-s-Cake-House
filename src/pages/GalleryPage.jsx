import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Sparkles, MessageCircle, X, ExternalLink, Heart } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: '3-Tier Royal Lavender & Gold Leaf Wedding Cake',
    category: 'wedding',
    categoryName: 'Wedding Grandeur',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=900&q=80',
    description: 'Triple-tier Madagascar vanilla bean sponge with Swiss meringue buttercream, edible 24k gold leaf and fresh organic lavender rosettes.',
  },
  {
    id: 2,
    title: 'Midnight Belgian Dark Truffle Extravaganza',
    category: 'chocolate',
    categoryName: 'Belgian Chocolate',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    description: '64% Callebaut dark couverture ganache cascade with roasted hazelnuts and hand-piped chocolate spirals.',
  },
  {
    id: 3,
    title: 'Scarlet Red Velvet with Philadelphia Cream Cheese',
    category: 'birthday',
    categoryName: 'Birthday Extravaganza',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=80',
    description: 'Signature crimson velvety crumb layered with tangy cream cheese frosting and heart calligraphy.',
  },
  {
    id: 4,
    title: 'Geometric Golden Heart Pinata Smash Cake',
    category: 'pinata',
    categoryName: 'Designer Pinata',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=900&q=80',
    description: 'Edible chocolate hard shell dusted with shimmering edible metallic gold. Comes with handcrafted mini wooden hammer.',
  },
  {
    id: 5,
    title: 'New York Baked Blueberry Compote Cheesecake',
    category: 'cheesecake',
    categoryName: 'Gourmet Cheesecakes',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
    description: 'Slow baked water-bath cheesecake over spiced graham biscuit crust, crowned with wild Canadian blueberry compote.',
  },
  {
    id: 6,
    title: 'Royal Rasmalai & Pistachio Saffron Tier',
    category: 'wedding',
    categoryName: 'Wedding Grandeur',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
    description: 'Cardamom infused milk-soaked sponge filled with miniature soft rasmalai dumplings, saffron cream, and Iranian pistachios.',
  },
  {
    id: 7,
    title: 'Pastel Unicorn Rainbow Birthday Fantasy',
    category: 'kids',
    categoryName: 'Theme & Kids',
    image: 'https://images.unsplash.com/photo-1562772186-36894546a36f?auto=format&fit=crop&w=900&q=80',
    description: 'Rainbow 6-color sponge layers with whimsical pastel swirl buttercream rosettes and golden horn topper.',
  },
  {
    id: 8,
    title: 'Sun-Drenched Alphonso Mango Passion Entremet',
    category: 'birthday',
    categoryName: 'Birthday Extravaganza',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=900&q=80',
    description: 'Seasonal Ratnagiri Alphonso mango mousse with passionfruit mirror glaze and white chocolate leaves.',
  },
  {
    id: 9,
    title: 'Black Forest Gateau with Maraschino Cherries',
    category: 'chocolate',
    categoryName: 'Belgian Chocolate',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    description: 'Dark cocoa sponge drenched in cherry liqueur nectar, filled with sweet-tart imported cherries and fresh cream.',
  },
];

const GALLERY_CATEGORIES = [
  { id: 'all', name: 'All Creations' },
  { id: 'wedding', name: 'Wedding Grandeur 💍' },
  { id: 'birthday', name: 'Birthday Specials 🎂' },
  { id: 'chocolate', name: 'Belgian Chocolate 🍫' },
  { id: 'pinata', name: 'Pinata Smash 🔨' },
  { id: 'kids', name: 'Theme & Kids 🦄' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-rose-light)',
              color: 'var(--color-rose)',
              fontWeight: 700,
              fontSize: '0.82rem',
              paddingInline: '14px',
              paddingBlock: '4px',
              borderRadius: 'var(--radius-full)',
              marginBlockEnd: '10px',
            }}
          >
            <Camera size={14} />
            <span>Masterpiece Portfolio</span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--color-chocolate)',
              marginBlockEnd: '12px',
            }}
          >
            Diksha's Cake House Gallery
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '680px', marginInline: 'auto', lineHeight: 1.6 }}>
            Browse through custom wedding towers, birthday masterpieces, pinata smash bakes, and luxury confections designed for 50,000+ happy celebrations.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBlockEnd: '36px',
          }}
        >
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                paddingInline: '16px',
                paddingBlock: '8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.86rem',
                fontWeight: 600,
                border: selectedCategory === cat.id ? '2px solid var(--color-chocolate)' : '1px solid var(--color-border)',
                backgroundColor: selectedCategory === cat.id ? 'var(--color-chocolate)' : 'var(--color-surface)',
                color: selectedCategory === cat.id ? '#FAF5EE' : 'var(--color-text-main)',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry / Photo Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
              }}
              onClick={() => setActiveItem(item)}
            >
              <div style={{ position: 'relative', paddingTop: '80%', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(70, 32, 23, 0.85)',
                    color: '#FAF5EE',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    paddingInline: '10px',
                    paddingBlock: '4px',
                    borderRadius: 'var(--radius-full)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item.categoryName}
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-chocolate)', marginBlockEnd: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBlockEnd: '12px' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-rose)', fontWeight: 700 }}>
                    Click to view full design 🔍
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-veg)', fontWeight: 700 }}>
                    100% Eggless
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Custom Consultation Banner */}
        <div
          style={{
            marginBlockStart: '60px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            border: '2px solid var(--color-border-rose)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <Sparkles size={28} color="var(--color-rose)" />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-chocolate)' }}>
            Have a Dream Cake Design in Mind?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', fontSize: '0.94rem' }}>
            Send us any photo or Pinterest sketch. Our master cake artists will bake and pipe it to perfection for your milestone celebration.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20have%20a%20reference%20photo%20for%20a%20custom%20cake!"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', paddingInline: '20px', paddingBlock: '11px' }}
            >
              <MessageCircle size={18} />
              <span>Share Reference on WhatsApp</span>
            </a>
            <Link
              to="/cakes"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', paddingInline: '20px', paddingBlock: '11px' }}
            >
              <Sparkles size={18} color="var(--color-rose)" />
              <span>Explore All Cakes</span>
            </Link>
          </div>
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 1000,
              display: 'grid',
              placeContent: 'center',
              padding: '16px',
              backdropFilter: 'blur(5px)',
            }}
            onClick={() => setActiveItem(null)}
          >
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '600px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setActiveItem(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#FFF',
                    borderRadius: '50%',
                    padding: '6px',
                    display: 'grid',
                    placeContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-rose)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {activeItem.categoryName}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-chocolate)', marginBlock: '6px 10px' }}>
                  {activeItem.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBlockEnd: '20px' }}>
                  {activeItem.description}
                </p>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/918565098470?text=Hi%20Diksha%27s%20Cake%20House,%20I%20want%20to%20order%20the%20${encodeURIComponent(activeItem.title)}%20from%20your%20gallery!`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', paddingBlock: '11px' }}
                  >
                    <MessageCircle size={18} />
                    <span>Inquire / Order This Cake</span>
                  </a>
                  <Link
                    to="/cakes"
                    className="btn-secondary"
                    style={{ paddingInline: '18px', paddingBlock: '11px' }}
                  >
                    View All Cakes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
