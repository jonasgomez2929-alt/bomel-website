// ==========================================================
// BOMEL RESORT — SCRIPT
// ==========================================================

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Sticky header goes solid after scrolling past hero ---------- */
const header = document.getElementById('siteHeader');
const onScrollHeader = () => {
  if (window.scrollY > 40) header.classList.add('solid');
  else header.classList.remove('solid');
};
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

/* ---------- Mobile hamburger menu ---------- */
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});
mobileOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link, .mobile-book').forEach(el => {
  el.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ---------- Scroll-triggered section reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-q').forEach(btn => {
  const answer = btn.nextElementSibling;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    // close any other open items
    document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!expanded));
    answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
  });
});

/* ---------- Book now form (placeholder — no backend wired up) ---------- */
const bookForm = document.getElementById('bookForm');
const bookConfirm = document.getElementById('bookConfirm');
if (bookForm) {
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bookName').value.trim();
    bookConfirm.textContent = `Thanks${name ? ', ' + name : ''} — we'll confirm availability by email shortly.`;
    bookForm.reset();
  });
}

/* ---------- Newsletter signup (placeholder — no backend wired up) ---------- */
const newsletterForm = document.getElementById('newsletterForm');
const newsletterConfirm = document.getElementById('newsletterConfirm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterConfirm.textContent = "You're on the list.";
    newsletterForm.reset();
  });
}

/* ---------- Gallery filter buttons (gallery.html only) ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = category === 'all' || item.dataset.category === category;
        item.classList.toggle('hidden', !show);
      });
    });
  });
}

