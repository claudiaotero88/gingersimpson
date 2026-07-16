/* ==========================================================================
   GINGER SIMPSON PORTFOLIO — main.js
   Handles: scroll-aware nav, mobile menu, scroll fade-in, lightbox
   No external dependencies — vanilla JS only.
   ========================================================================== */

'use strict';

/* ── Scroll-aware navigation ─────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run once on load in case page is already scrolled
})();


/* ── Mobile navigation toggle ───────────────────────────────────────────── */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const open = this.classList.toggle('open');
    links.classList.toggle('open', open);
    this.setAttribute('aria-expanded', String(open));
  });

  // Close menu when any nav link is tapped
  links.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('open');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      toggle.classList.remove('open');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── Scroll fade-in (IntersectionObserver) ──────────────────────────────── */
(function () {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();


/* ── Home page slideshow ────────────────────────────────────────────────── */
(function () {
  const root = document.querySelector('[data-slideshow]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('[data-slide]'));
  const triggers = Array.from(root.querySelectorAll('[data-slide-trigger]'));
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function show(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('is-active', slideIndex === current);
    });

    triggers.forEach(function (trigger, triggerIndex) {
      trigger.classList.toggle('is-active', triggerIndex === current);
      trigger.setAttribute('aria-pressed', String(triggerIndex === current));
    });
  }

  function start() {
    timer = window.setInterval(function () {
      show(current + 1);
    }, 3000);
  }

  function reset() {
    if (timer) {
      window.clearInterval(timer);
    }
    start();
  }

  triggers.forEach(function (trigger, index) {
    trigger.addEventListener('click', function () {
      show(index);
      reset();
    });
  });

  root.addEventListener('mouseenter', function () {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  });

  root.addEventListener('mouseleave', function () {
    if (!timer) start();
  });

  show(0);
  start();
})();


/* ── Lightbox ────────────────────────────────────────────────────────────── */
(function () {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  // Collect image data from each gallery item
  const images = items.map(function (item) {
    const img = item.querySelector('img');
    return {
      src:     img ? img.src     : '',
      alt:     img ? img.alt     : '',
      caption: item.dataset.caption
               || (item.querySelector('.gallery-item__caption') || {}).textContent
               || (img ? img.alt : '')
    };
  });

  let current = 0;
  let isAnimating = false;

  /* ── Build lightbox DOM ── */
  const lb = document.createElement('div');
  lb.className   = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image lightbox');
  lb.setAttribute('aria-hidden', 'true');

  lb.innerHTML = [
    '<div class="lightbox__inner">',
    '  <img class="lightbox__img" src="" alt="" draggable="false">',
    '  <p  class="lightbox__caption"></p>',
    '</div>',
    '<button class="lightbox__close" aria-label="Close lightbox">&#215;</button>',
    '<button class="lightbox__btn lightbox__prev" aria-label="Previous image">&#8592;</button>',
    '<button class="lightbox__btn lightbox__next" aria-label="Next image">&#8594;</button>',
    '<span  class="lightbox__counter" aria-live="polite"></span>'
  ].join('');

  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('.lightbox__img');
  const lbCaption = lb.querySelector('.lightbox__caption');
  const lbCounter = lb.querySelector('.lightbox__counter');
  const lbClose   = lb.querySelector('.lightbox__close');
  const lbPrev    = lb.querySelector('.lightbox__prev');
  const lbNext    = lb.querySelector('.lightbox__next');

  /* ── Show a given index ── */
  function show(index) {
    if (isAnimating) return;
    current = ((index % images.length) + images.length) % images.length;

    const data = images[current];

    // Cross-fade the image
    lbImg.style.opacity = '0';
    isAnimating = true;

    setTimeout(function () {
      lbImg.src       = data.src;
      lbImg.alt       = data.alt;
      lbCaption.textContent = data.caption;
      lbCounter.textContent = (current + 1) + ' / ' + images.length;
      lbImg.style.opacity = '1';
      isAnimating = false;
    }, 140);

    // Toggle nav buttons visibility when only one image
    var single = images.length <= 1;
    lbPrev.style.visibility = single ? 'hidden' : '';
    lbNext.style.visibility = single ? 'hidden' : '';
  }

  /* ── Open ── */
  function open(index) {
    show(index);
    lb.classList.add('active');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Delay focus so screen readers get the updated content
    setTimeout(function () { lbClose.focus(); }, 50);
  }

  /* ── Close ── */
  function close() {
    lb.classList.remove('active');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Return focus to the item that opened the lightbox
    if (items[current]) items[current].focus();
  }

  /* ── Event listeners ── */
  items.forEach(function (item, i) {
    // Click
    item.addEventListener('click', function () { open(i); });
    // Keyboard — Enter / Space
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  function () { show(current - 1); });
  lbNext.addEventListener('click',  function () { show(current + 1); });

  // Click outside image to close
  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  // Touch swipe support
  var touchStartX = 0;
  lb.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) show(current + 1); // swipe left → next
    else           show(current - 1); // swipe right → prev
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('active')) return;
    switch (e.key) {
      case 'Escape':     close();           break;
      case 'ArrowLeft':  show(current - 1); break;
      case 'ArrowRight': show(current + 1); break;
    }
  });
})();


/* ── Hash-based scroll on gallery page ──────────────────────────────────── */
(function () {
  // When navigating from home → gallery.html#section, smooth-scroll after load
  if (window.location.hash && document.querySelector(window.location.hash)) {
    setTimeout(function () {
      document.querySelector(window.location.hash).scrollIntoView({
        behavior: 'smooth', block: 'start'
      });
    }, 400);
  }
})();
