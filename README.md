# Vittal — Premium Shopify Online Store 2.0 Theme

A luxury, high-conversion **Shopify Online Store 2.0 Theme** engineered for **Vittal** (Clean Fuel. Real Coffee. Zero Compromise.) — crafted with 100% single-origin Colombian cold brew and clean plant protein isolate aesthetics.

---

## ☕ Theme Architecture & Folder Structure

This repository adheres strictly to the official [Shopify Online Store 2.0](https://shopify.dev/docs/themes) architecture:

```
├── assets/
│   ├── base.css              # Master styling, typography, animations, responsive design
│   ├── theme.js              # Slide-out Ajax cart drawer, variant selectors, FAQ accordions
│   ├── vittal-pouch.svg      # High-fidelity standalone craft coffee pouch asset
│   ├── vittal-glass.svg      # Iced cold brew layered glass with straw asset
│   ├── vittal-farmer.svg     # Colombian coffee harvest Andean illustration
│   ├── vittal-shaker.svg     # Barista shaker tumbler asset
│   ├── vittal-can.svg        # RTD chilled cold brew can asset
│   └── vittal-bundle.svg     # Master trio bundle asset
├── config/
│   ├── settings_schema.json  # Theme customizer settings (colors, typography, cart, socials)
│   └── settings_data.json    # Default theme presets
├── layout/
│   └── theme.liquid          # Master Liquid layout wrapper
├── locales/
│   └── en.default.json       # English translations & localization strings
├── sections/
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero-banner.liquid
│   ├── marquee.liquid
│   ├── features-grid.liquid
│   ├── featured-product.liquid
│   ├── comparison-table.liquid
│   ├── story-section.liquid
│   ├── testimonials.liquid
│   ├── faq-accordion.liquid
│   ├── cta-banner.liquid
│   ├── main-product.liquid
│   ├── product-nutrition-specs.liquid
│   ├── product-recommendations.liquid
│   ├── main-collection.liquid
│   ├── collection-quiz-banner.liquid
│   ├── trust-badges.liquid
│   ├── cart-drawer.liquid
│   ├── main-cart.liquid
│   ├── main-page.liquid
│   └── main-404.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── price.liquid
│   ├── rating-stars.liquid
│   ├── icon-cart.liquid
│   ├── icon-search.liquid
│   ├── icon-user.liquid
│   ├── icon-star.liquid
│   ├── icon-check.liquid
│   ├── icon-arrow.liquid
│   └── icon-close.liquid
├── templates/
│   ├── index.json            # Homepage OS 2.0 section layout
│   ├── product.json          # PDP OS 2.0 section layout
│   ├── collection.json       # Catalog OS 2.0 section layout
│   ├── cart.json             # Dedicated cart layout
│   ├── page.json             # Standard page layout
│   └── 404.json              # Error page layout
├── preview.html              # Standalone local interactive preview
└── README.md
```

---

## 🚀 How to Upload & Push to GitHub

To push this entire theme to your GitHub account:

```bash
# 1. Initialize git in the theme directory
git init

# 2. Add all theme files
git add .

# 3. Commit your changes
git commit -m "Initial commit: Vittal Shopify Online Store 2.0 Theme"

# 4. Link your GitHub repository
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vittal-shopify-theme.git

# 5. Push to GitHub
git push -u origin main
```

---

## 🛍️ How to Install on Shopify

### Method 1: Direct ZIP Upload in Shopify Admin
1. Zip the theme files (excluding `.git`):
   ```bash
   zip -r vittal-shopify-theme.zip assets/ config/ layout/ locales/ sections/ snippets/ templates/
   ```
2. Open your **Shopify Admin**.
3. Go to **Online Store** &rarr; **Themes**.
4. In the **Theme library** section, click **Add theme** &rarr; **Upload zip file**.
5. Upload `vittal-shopify-theme.zip` and click **Publish** or **Customize**.

### Method 2: Connect via GitHub (Automatic Sync)
1. In **Shopify Admin** &rarr; **Online Store** &rarr; **Themes**.
2. Click **Add theme** &rarr; **Connect from GitHub**.
3. Select your repository `vittal-shopify-theme` and the `main` branch.
4. Any future git commits pushed to GitHub will automatically sync to your Shopify store!

### Method 3: Shopify CLI
```bash
shopify theme dev
# Or push directly to your store
shopify theme push
```

---

## ✨ Features Included

- **Exact Design Fidelity**: Matches the Colombian single-origin warm latte / dark roast aesthetic.
- **Slide-out Cart Drawer**: With dynamic `$45` free shipping progress meter and line items.
- **Subscription Toggle**: "Subscribe & Save 20%" vs "One-time purchase" price calculations.
- **Nutritional Comparison Matrix**: Vittal vs Traditional Frappe vs RTD shakes.
- **Harvest Integrity Story**: Dedicated section showcasing sustainable Andean sourcing at 1,800m altitude.
- **Interactive FAQ Accordion**: Smooth animated expand/collapse.
- **Responsive Layout**: Pixel-perfect on mobile, tablet, and widescreen desktop displays.
