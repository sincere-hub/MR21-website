document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. HEADER & MOBILE NAV LOGIC
  // ==========================================
  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const header = document.querySelector('[data-header]');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('open') && !nav.classList.contains('is-open');
      nav.classList.toggle('open', isOpen);
      nav.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      toggleBtn.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      const dropdown = link.closest('.nav-dropdown');
      if (dropdown && window.innerWidth <= 850 && link.nextElementSibling?.classList.contains('dropdown-menu')) {
        event.preventDefault();
        dropdown.classList.toggle('open');
        return;
      }

      nav.classList.remove('open', 'is-open');
      nav.querySelectorAll('.nav-dropdown.open').forEach((item) => item.classList.remove('open'));
      document.body.classList.remove('nav-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      toggleBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
  }

  dropdowns.forEach(drop => drop.classList.remove('open'));

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Back to Top Button
  const backTopBtn = document.querySelector('[data-back-top]');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 2. STAGGERED SCROLL REVEAL ANIMATIONS
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a slight delay to each item for a cascading/staggered effect
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // 100ms delay between each image
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  galleryItems.forEach(item => revealObserver.observe(item));

  // ==========================================
  // 3. LIGHTBOX FUNCTIONALITY
  // ==========================================
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  
  let currentIndex = 0;
  const itemsData = [];

  // Collect image data from DOM
  document.querySelectorAll('.gallery-item').forEach((item) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span').innerHTML;
    itemsData.push({
      src: img.src,
      alt: img.alt,
      caption: caption
    });
  });

  // Open Lightbox
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Navigation Logic
  const navigateLightbox = (direction) => {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = itemsData.length - 1;
    if (currentIndex >= itemsData.length) currentIndex = 0;
    updateLightbox();
  };

  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  function updateLightbox() {
    const data = itemsData[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    lightboxCaption.innerHTML = data.caption;
  }
});
