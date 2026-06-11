(function () {
  const nav = document.getElementById('navLinks');
  const burger = document.querySelector('.hamburger');
  const backToTop = document.getElementById('backToTop');
  const currentPage = document.body.dataset.page || '';

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('active'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('active'));
    });
  }

  document.querySelectorAll('#navLinks a').forEach(a => {
    const href = a.getAttribute('href');
    if (currentPage && href && href.includes(currentPage)) {
      a.classList.add('active');
    }
  });

  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('hidden', window.scrollY < 300);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Product page search/filter
  const productSearch = document.getElementById('productSearch');
  const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
  if (productSearch && productCards.length) {
    const filterProducts = () => {
      const term = productSearch.value.trim().toLowerCase();
      productCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
      });
    };
    productSearch.addEventListener('input', filterProducts);
  }

  // Contact page simple order calculator
  const productSelect = document.getElementById('product');
  const quantityInput = document.getElementById('quantity');
  const totalEl = document.getElementById('orderTotal');

  const prices = {
    'energy-yogurt': 5000,
    'travel-heater': 180000
  };

  function updateTotal() {
    if (!productSelect || !quantityInput || !totalEl) return;
    const price = prices[productSelect.value] || 0;
    const qty = Math.max(1, parseInt(quantityInput.value || '1', 10));
    const total = price * qty;
    totalEl.textContent = price ? `Estimated total: Le ${total.toLocaleString('en-US')}` : 'Estimated total: Select a product';
  }

  if (productSelect && quantityInput && totalEl) {
    productSelect.addEventListener('change', updateTotal);
    quantityInput.addEventListener('input', updateTotal);
    updateTotal();
  }

  const form = document.getElementById('orderForm');
  const successMsg = document.getElementById('successMsg');
  if (form && successMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = ['name', 'phone', 'location', 'product', 'quantity'];
      const valid = required.every(id => {
        const el = document.getElementById(id);
        return el && String(el.value || '').trim() !== '';
      });
      if (!valid) {
        alert('Please fill in all required fields.');
        return;
      }
      successMsg.style.display = 'block';
      form.reset();
      updateTotal();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
