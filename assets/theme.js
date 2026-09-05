/**
 * VITTAL SHOPIFY THEME - INTERACTIVE LOGIC
 * Handles Cart Drawer, Variant & Subscription Switchers, Quantity Adjusters, 
 * FAQ Accordions, and Smooth UI Interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initPurchaseOptionToggle();
  initQuantitySelectors();
  initFaqAccordions();
  initProductGallery();
  initCategoryPills();
  initNewsletterForm();
});

/* ==========================================================================
   CART DRAWER & AJAX HANDLING
   ========================================================================== */
const CartState = {
  items: [
    {
      id: 'vittal-pouch-sub',
      title: 'Vittal Protein Iced Coffee',
      variant: 'Subscribe & Save (30 Days)',
      price: 39.00,
      quantity: 1,
      image: 'vittal-pouch.svg'
    }
  ],
  freeShippingThreshold: 45.00
};

function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  const triggers = document.querySelectorAll('[data-action="open-cart"]');
  const closeBtns = document.querySelectorAll('[data-action="close-cart"]');

  if (!drawer || !overlay) return;

  function openCart() {
    renderCartDrawer();
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => trigger.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  }));

  closeBtns.forEach(btn => btn.addEventListener('click', closeCart));
  overlay.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeCart();
    }
  });

  // Attach global Add to Cart buttons
  const atcButtons = document.querySelectorAll('[data-action="add-to-cart"]');
  atcButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productTitle = btn.getAttribute('data-product-title') || 'Vittal Protein Iced Coffee';
      const productPrice = parseFloat(btn.getAttribute('data-product-price') || '39.00');
      const productVariant = btn.getAttribute('data-product-variant') || 'Subscribe & Save 20%';
      const productImage = btn.getAttribute('data-product-image') || 'vittal-pouch.svg';

      // Read qty if nearby
      const qtyInput = document.getElementById('product-quantity');
      const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

      // Add or update item
      const existing = CartState.items.find(i => i.title === productTitle && i.variant === productVariant);
      if (existing) {
        existing.quantity += quantity;
      } else {
        CartState.items.push({
          id: 'item-' + Date.now(),
          title: productTitle,
          variant: productVariant,
          price: productPrice,
          quantity: quantity,
          image: productImage
        });
      }

      updateCartCount();
      openCart();
    });
  });

  renderCartDrawer();
}

function updateCartCount() {
  const totalCount = CartState.items.reduce((sum, item) => sum + item.quantity, 0);
  const bubbles = document.querySelectorAll('.cart-count-bubble');
  bubbles.forEach(bubble => {
    bubble.textContent = totalCount;
  });
}

function renderCartDrawer() {
  const listEl = document.getElementById('drawer-items-list');
  const subtotalEl = document.getElementById('drawer-subtotal-val');
  const shippingFillEl = document.getElementById('shipping-progress-fill');
  const shippingMsgEl = document.getElementById('shipping-status-msg');

  if (!listEl || !subtotalEl) return;

  const totalSubtotal = CartState.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  subtotalEl.textContent = `$${totalSubtotal.toFixed(2)}`;

  // Shipping progress
  if (shippingFillEl && shippingMsgEl) {
    const remaining = CartState.freeShippingThreshold - totalSubtotal;
    const percentage = Math.min(100, (totalSubtotal / CartState.freeShippingThreshold) * 100);
    shippingFillEl.style.width = `${percentage}%`;

    if (remaining <= 0) {
      shippingMsgEl.innerHTML = `🎉 You've unlocked <strong>Free Express Shipping!</strong>`;
    } else {
      shippingMsgEl.innerHTML = `Add <strong>$${remaining.toFixed(2)}</strong> more to unlock <strong>Free Express Shipping</strong>!`;
    }
  }

  if (CartState.items.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: var(--color-text-muted);">
        <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">Your morning ritual cart is empty.</p>
        <p style="font-size: 0.875rem;">Discover our 100% single-origin cold brew blends to start your day.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = CartState.items.map((item, index) => `
    <div class="drawer-item" data-index="${index}">
      <div class="drawer-item-img">
        <img src="${item.image.includes('/') ? item.image : '/assets/' + item.image}" alt="${item.title}" style="max-height: 60px;" />
      </div>
      <div class="drawer-item-info">
        <h4>${item.title}</h4>
        <p class="drawer-item-variant">${item.variant}</p>
        <div class="drawer-item-actions">
          <div class="qty-selector" style="height: 36px; padding: 0 4px;">
            <button class="qty-btn" onclick="updateItemQuantity(${index}, -1)" style="width: 26px; height: 26px;">−</button>
            <input class="qty-input" type="text" value="${item.quantity}" readonly style="width: 28px; font-size: 0.85rem;" />
            <button class="qty-btn" onclick="updateItemQuantity(${index}, 1)" style="width: 26px; height: 26px;">+</button>
          </div>
          <span style="font-weight: 800; font-size: 0.95rem;">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');

  updateCartCount();
}

window.updateItemQuantity = function(index, delta) {
  if (CartState.items[index]) {
    CartState.items[index].quantity += delta;
    if (CartState.items[index].quantity <= 0) {
      CartState.items.splice(index, 1);
    }
    renderCartDrawer();
  }
};

/* ==========================================================================
   PURCHASE OPTION (SUBSCRIBE VS ONE-TIME)
   ========================================================================== */
function initPurchaseOptionToggle() {
  const optionCards = document.querySelectorAll('.purchase-option-card');
  const atcBtn = document.getElementById('main-atc-button');
  const currentPriceDisplay = document.getElementById('current-price-display');

  if (!optionCards.length) return;

  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      optionCards.forEach(c => {
        c.classList.remove('active');
        const radio = c.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
      });

      card.classList.add('active');
      const activeRadio = card.querySelector('input[type="radio"]');
      if (activeRadio) activeRadio.checked = true;

      const price = card.getAttribute('data-price') || '39.00';
      const variant = card.getAttribute('data-variant') || 'Subscribe & Save 20%';

      if (atcBtn) {
        atcBtn.setAttribute('data-product-price', price);
        atcBtn.setAttribute('data-product-variant', variant);
        const atcPriceSpan = atcBtn.querySelector('.atc-dynamic-price');
        if (atcPriceSpan) {
          atcPriceSpan.textContent = `$${parseFloat(price).toFixed(2)}`;
        }
      }

      if (currentPriceDisplay) {
        currentPriceDisplay.textContent = `$${parseFloat(price).toFixed(0)}`;
      }
    });
  });
}

/* ==========================================================================
   QUANTITY SELECTORS
   ========================================================================== */
function initQuantitySelectors() {
  const qtyWrappers = document.querySelectorAll('.qty-selector-group');

  qtyWrappers.forEach(wrap => {
    const input = wrap.querySelector('.qty-input');
    const minus = wrap.querySelector('[data-qty-action="minus"]');
    const plus = wrap.querySelector('[data-qty-action="plus"]');

    if (!input || !minus || !plus) return;

    minus.addEventListener('click', () => {
      let val = parseInt(input.value) || 1;
      if (val > 1) {
        input.value = val - 1;
      }
    });

    plus.addEventListener('click', () => {
      let val = parseInt(input.value) || 1;
      input.value = val + 1;
    });
  });
}

/* ==========================================================================
   FAQ ACCORDIONS
   ========================================================================== */
function initFaqAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other accordions in the same list
      const parent = item.closest('.accordion-list');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isOpen);
    });
  });
}

/* ==========================================================================
   PRODUCT GALLERY THUMBNAILS
   ========================================================================== */
function initProductGallery() {
  const thumbs = document.querySelectorAll('.thumb-item');
  const mainImg = document.getElementById('main-gallery-image');

  if (!thumbs.length || !mainImg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const src = thumb.getAttribute('data-img-src');
      if (src) {
        mainImg.src = src;
      }
    });
  });
}

/* ==========================================================================
   CATEGORY PILLS (COLLECTION PAGE)
   ========================================================================== */
function initCategoryPills() {
  const pills = document.querySelectorAll('.category-pill');
  const cards = document.querySelectorAll('.product-card');

  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-category');
      if (!filter || filter === 'all') {
        cards.forEach(card => card.style.display = 'flex');
      } else {
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          card.style.display = (cat === filter) ? 'flex' : 'none';
        });
      }
    });
  });
}

/* ==========================================================================
   NEWSLETTER TOAST FEEDBACK
   ========================================================================== */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (!input || !input.value) return;

      const parent = form.parentElement;
      form.innerHTML = `
        <div style="background: #E8F5E9; color: #2E7D32; padding: 12px 18px; border-radius: var(--radius-pill); font-size: 0.875rem; font-weight: 700; width: 100%;">
          ✓ Welcome to Vittal! Use code FIRST15 for 15% off.
        </div>
      `;
    });
  });
}
