# Security System Bundle Builder

A multi-step bundle builder prototype built with React, TypeScript, Tailwind CSS, and Zustand. Pixel-perfect implementation of the Figma design.

**Live Demo:** [https://task-front-black.vercel.app](https://task-front-black.vercel.app)

## Run Instructions

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Architecture

- **Vite + React 18 + TypeScript** — fast dev, strict types
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Zustand** — lightweight state management with a single store
- **localStorage** — persistence for "Save my system for later"

## Key Decisions

- **Single Zustand store with computed selectors** — keeps state centralized and easy to trace. Derived values (subtotal, savings, selected count) are computed on demand rather than stored.
- **Variant quantities tracked independently** — each color variant has its own quantity key (`productId:variantId`). The card stepper binds to whichever variant is active; the review panel shows every variant with count > 0.
- **Data-driven from JSON** — all product data lives in `products.json`. Components render from data, no hardcoded per-product markup.
- **CSS transitions for animations** — accordion expand/collapse, card selection, and stepper interactions use pure CSS transitions for smooth 60fps performance.

## Responsive Approach

- **Desktop (>=1024px):** Two-column layout matching Figma
- **Tablet (768-1023px):** Single column, review panel below builder
- **Mobile (<768px):** Stacked layout with sticky "View Cart" button
