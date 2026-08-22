# Sky Square Infra — Luxury / Editorial Web Application

A modern, high-precision web presence for **Sky Square Infra**, engineered in **React 19**, **Tailwind CSS**, and **Node.js/Express**, following the **Luxury / Editorial** design philosophy.

---

## 🏛️ Design System Architecture

- **Palette**: Warm Alabaster (`#F9F8F6`), Rich Charcoal (`#1A1A1A`), Pale Taupe (`#EBE5DE`), Warm Grey (`#6C6863`), Metallic Gold (`#D4AF37`).
- **Typography Pairing**: *Playfair Display* (Editorial Serif Headlines, Drop Caps, Italic Emphasis) & *Inter* (Technical Body, Navigation, Specifications).
- **Geometric Precision**: Strict `0px` border radius across all components and containers with 1px hairline dividers.
- **Architectural Structural Elements**: 4 fixed vertical column gridlines and subtle SVG paper grain texture overlay.
- **Cinematic Transitions**: 1500–2000ms image transitions (monochromatic grayscale transitioning to full color on hover) and gold sliding layer button interactions.

---

## 📁 Clean Folder Structure

```
sky_sq_infra/
├── index.html                    # Root entry preloading Playfair Display & Inter with Tailwind config
├── package.json                  # Dependencies & execution scripts
├── vite.config.js                # Vite development and bundling configuration
├── tailwind.config.js            # Design tokens (colors, shadows, keyframes, timing curves)
├── postcss.config.js             # PostCSS pipeline
├── server/
│   └── index.js                  # Express API for consultation requests & lead dispatch
├── src/
│   ├── main.jsx                  # React DOM root entrypoint
│   ├── App.jsx                   # Main layout container
│   ├── data/
│   │   ├── projects.js           # Full portfolio datasets & technical metrics
│   │   └── competencies.js       # Core competency pillars (Infrastructure, Land Dev, Construction)
│   └── components/
│       ├── common/
│       │   ├── Button.jsx        # Luxury button (Primary sliding gold, Secondary fill, Link)
│       │   ├── Input.jsx         # Underline-only inputs with italic serif placeholders
│       │   ├── GridLines.jsx     # 4 fixed architectural vertical grid lines
│       │   └── NoiseOverlay.jsx  # SVG paper grain noise texture
│       ├── layout/
│       │   ├── Navbar.jsx        # Monogram header with smooth navigation & drawer
│       │   └── Footer.jsx        # Monolithic typography footer with direct WhatsApp & contact
│       └── sections/
│           ├── Hero.jsx          # 60/40 asymmetric hero with drone visual & vertical labels
│           ├── Marquee.jsx       # Infinite architectural ticker (Legacy • Innovation • Precision)
│           ├── Ethos.jsx         # Ethos narrative with classic editorial drop cap
│           ├── Archive.jsx       # Filterable project portfolio (All / Ongoing / Completed)
│           ├── ProjectModal.jsx  # Architectural dossier modal for deep inspection
│           ├── Competencies.jsx  # Tripartite core competencies breakdown
│           └── Consultation.jsx  # Interactive consultation & valuation booking form
```

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Launch Backend API Server
```bash
npm run server
```
Server runs on [http://localhost:5000](http://localhost:5000).
