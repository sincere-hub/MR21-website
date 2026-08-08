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


 // Hero slide rotation
    let slideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const heroWelcomeCentered = document.getElementById('heroWelcomeCentered');
    const heroContent = document.getElementById('heroContent');

    function rotateSlides() {
      if (slides.length === 0) return;
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
      const isVideoSlide = slideIndex === 0;
      if (heroWelcomeCentered) heroWelcomeCentered.classList.toggle('is-visible', isVideoSlide);
      if (heroContent) heroContent.classList.toggle('is-hidden', isVideoSlide);
    }

    if (slides.length > 0) setInterval(rotateSlides, 7000);

    // FAQ search filter
    const faqSearch = document.querySelector('[data-faq-search]');
    const faqList = document.querySelector('[data-faq-list]');
    if (faqSearch && faqList) {
      faqSearch.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        faqList.querySelectorAll('details').forEach(function (item) {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? '' : 'none';
        });
      });
    }


/* ==========================================
   SERVICES IMAGE SLIDER
   ========================================== */
let slideIndex = 0;
let slideInterval;

function startSlideShow() {
    const slides = document.querySelectorAll('.services-visual .slide');
    if (slides.length === 0) return;

    if (slideInterval) clearInterval(slideInterval);

    slideInterval = setInterval(() => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }, 4000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.services-visual .slide');
    if (slides.length === 0) return;

    clearInterval(slideInterval);
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + direction + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    startSlideShow();
}

document.addEventListener('DOMContentLoaded', () => {
    startSlideShow();
});