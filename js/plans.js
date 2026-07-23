document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const header = document.querySelector('[data-header]');

  // 1. Mobile Menu Toggle
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
  }

  // 2. Mobile Sub-menu handling (Accordion style for mobile)
  if (window.innerWidth <= 768) {
    dropdowns.forEach(drop => {
      const link = drop.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          drop.classList.toggle('open');
        });
      }
    });
  }

  // 3. Sticky Header scroll background
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // 4. Back to Top Button
  const backTopBtn = document.querySelector('[data-back-top]');
  if (backTopBtn) {
      backTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
});