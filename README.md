<<<<<<< HEAD
# 🎂 Diksha's Cake House — Hybrid Web & Mobile App Application

An artisanal, high-performance, responsive **Hybrid Web & Mobile Application** for **Diksha's Cake House**, built with React, React Router, Vite, and Modern Web Standards.

Designed from the ground up to provide **two distinct, tailored UI experiences**:
1. 💻 **Desktop / Tablet View**: A luxurious, expansive artisanal bakery website with wide grids, sticky desktop navigation, and comprehensive layouts.
2. 📱 **Mobile & Native App View**: An authentic, high-converting mobile app interface (comparable to Swiggy, Zomato, or Blinkit) complete with native top location bar, category stories/bubbles, bottom sheet dialogs, tactile active buttons, floating quick-cart pill, and a fixed bottom navigation bar.

---

## 📱 Native App Features (Mobile & Webview Mode)

- **📍 App Header with Location Switcher**: Interactive `Deliver to: Home / Office / Venue ▾` header with address selector bottom sheet.
- **Stories / Category Bubbles**: Horizontal circular bubbles (Bestsellers 🔥, Belgian Choco 🍫, 3D Studio 🎨, Cheesecakes 🍰, Pinata Smash 🔨, Cupcakes 🧁, Hampers 🎁).
- **📱 Fixed Bottom Navigation Bar**: Native bottom tabs for `Home`, `Menu`, `Studio`, `Track`, and `Cart` (with live counter badge).
- **🛍️ Floating Quick-Cart Bar**: Whenever an item is added to cart, a floating native app pill (`🛒 2 Items | ₹1,298 • View Cart ➔`) appears above the bottom nav.
- **📋 Native Bottom Sheets**: On mobile, modals and detail dialogs slide up from the bottom with grab handles (`━`) and rounded top corners instead of desktop centered boxes.
- **⚡ Native Touch Ergonomics**:
  - `-webkit-tap-highlight-color: transparent`
  - `user-select: none` on interactive controls (eliminates accidental text-selection popup on mobile)
  - `overscroll-behavior-y: contain` (prevents unwanted pull-down page refresh inside webviews)
  - Spring / active bounce button feedback
  - Full support for `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` (iPhone notches & Android gesture bars)
- **📦 Progressive Web App (PWA) Ready**: Includes `public/manifest.webmanifest` and mobile-capable meta tags for "Add to Home Screen" or wrapping into native Android APK / iOS IPA.

---

## 🗺️ Multi-Page Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| **`/`** | **Home** | Hero banner, trust features, trending bestsellers, Custom Studio teaser, and testimonials. |
| **`/cakes`** | **All Cakes & Menu** | Full catalog with category tabs, search sync, budget filter, and dietary filters. |
| **`/cake/:id`** | **Cake Details** | Dedicated cake page: weight selector with live pricing, custom icing piping inscription, add-on accessories, ingredients, and allergens. |
| **`/custom-studio`**| **Custom Cake Studio** | Interactive 2D/3D live cake builder: configure tiers, sponge flavor, frosting color, drip glazes, toppings, and live rendered piping on cake. |
| **`/combos`** | **Celebration Combos** | Party hampers (Cake + Dutch Roses + Sparklers + Cards) with up to 20% savings. |
| **`/track-order`** | **Live Order Tracker** | 6-stage tracker from oven baking at 175°C to temperature-controlled transit, with rider contact and bakery helpline. |
| **`/cart`** | **Full Cart** | Line items, custom piping text, accessory upsells, coupon validation (`DIKSHA10`, `FIRSTBAKE`), and free delivery threshold. |
| **`/checkout`** | **Safe Checkout** | Recipient details, delivery date & slot (including Midnight Surprise 11:30 PM), payment method, celebratory confetti blast, printable invoice, and WhatsApp slip. |
| **`/wishlist`** | **Wishlist** | Saved favorites with 1-click "Add to Cart" and removal controls. |
| **`/about`** | **About Chef Diksha** | The story of Diksha's Cake House and 100% vegetarian / eggless dedicated ovens guarantee. |
| **`/contact`** | **Location & Support** | Bakery studio location, opening hours (8:00 AM - 11:45 PM), contact helpline, direct WhatsApp chat, inquiry form, and FAQ accordion. |

---

## 📲 How to Convert this Webapp into an Android / iOS App (Capacitor)

Because the UI was designed with native app standards, you can convert it into an Android APK / iOS App in minutes using **Capacitor**:

### Step 1: Install Capacitor in this project
```powershell
cd "C:\Users\Anuj\.gemini\antigravity\scratch\diksha-bakery"
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
```

### Step 2: Initialize Capacitor
```powershell
npx cap init "Diksha's Cake House" "com.dikshascakehouse.app" --web-dir dist
```

### Step 3: Build & Add Platforms
```powershell
npm run build
npx cap add android
npx cap add ios
```

### Step 4: Open in Android Studio / Xcode
```powershell
npx cap open android
```
From Android Studio, click **Run** or **Build APK / AAB** to produce a native Android application!

---

## 🏃 Running Locally

```powershell
cd "C:\Users\Anuj\.gemini\antigravity\scratch\diksha-bakery"
npm run dev
```
Open **`http://localhost:5173`** in your browser or mobile device.
=======
# Diksha-s-Cake-House
>>>>>>> 55f0b1a64eb4c324e9891346d4d83409b8736990
