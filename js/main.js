/* BloodPril Official — main.js */
(function () {
  'use strict';

  /* ── HAMBURGER ─────────────────────────────────── */
  const burger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── STICKY HEADER SHADOW ──────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── SCROLL-TO-TOP ─────────────────────────────── */
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── SMOOTH ANCHOR SCROLL (offset for sticky nav) ─ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── ACTIVE NAV HIGHLIGHT ──────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navLinks.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-50% 0px -45% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* ── SCROLL REVEAL ─────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  if (revealEls.length) {
    const revealIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealIO.observe(el));
  }

  /* ── STAT COUNTER ──────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const countIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1600;
        const start = performance.now();
        const tick = now => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + Math.round(ease * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => countIO.observe(el));
  }

  /* ── FAQ ACCORDION ─────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── LAZY-LOAD POLYFILL ────────────────────────── */
  if ('loading' in HTMLImageElement.prototype === false) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

})();
