document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const dropdown = document.querySelector('.nav-dropdown');

  // Mobile Menu Toggle
  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  // Mobile Dropdown toggle (Accordion style on mobile)
  if(window.innerWidth <= 768) {
    dropdown.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
  }

  // Sticky Header scroll background
  const header = document.querySelector('[data-header]');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});