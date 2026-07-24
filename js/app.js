const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const backTop = document.querySelector("[data-back-top]");

const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = !nav.classList.contains("is-open") && !nav.classList.contains("open");
        nav.classList.toggle("is-open", isOpen);
        nav.classList.toggle("open", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.querySelector("i")?.classList.toggle("fa-xmark", isOpen);
        navToggle.querySelector("i")?.classList.toggle("fa-bars", !isOpen);
    });

    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            nav.classList.remove("is-open");
            nav.classList.remove("open");
            document.body.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.querySelector("i")?.classList.add("fa-bars");
            navToggle.querySelector("i")?.classList.remove("fa-xmark");
        }
    });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const quoteForm = document.querySelector("[data-quote-form]");
const quoteOutput = document.querySelector("[data-quote-output]");

const updateQuote = () => {
    if (!quoteForm || !quoteOutput) return;
    const formData = new FormData(quoteForm);
    const base = Number(formData.get("plan") || 0);
    const members = Number(formData.get("members") || 0);
    const ageRate = Number(formData.get("age") || 0);
    const estimate = base + members * ageRate;
    quoteOutput.textContent = `R${estimate.toLocaleString("en-ZA")}/month`;
};

quoteForm?.addEventListener("input", updateQuote);
updateQuote();

const faqSearch = document.querySelector("[data-faq-search]");
const faqItems = document.querySelectorAll("[data-faq-list] details");

faqSearch?.addEventListener("input", () => {
    const term = faqSearch.value.trim().toLowerCase();
    faqItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.hidden = term.length > 0 && !text.includes(term);
    });
});

const applicationForm = document.querySelector("[data-application-form]");
const progressBar = document.querySelector("[data-progress-bar]");

const updateProgress = () => {
    if (!applicationForm || !progressBar) return;
    const requiredFields = [...applicationForm.querySelectorAll("[required]")];
    const complete = requiredFields.filter((field) => field.value.trim() && field.checkValidity()).length;
    const percentage = requiredFields.length ? (complete / requiredFields.length) * 100 : 0;
    progressBar.style.width = `${percentage}%`;
};

applicationForm?.addEventListener("input", (event) => {
    const field = event.target.closest("input, select");
    if (!field) return;
    const message = field.parentElement.querySelector("small");
    if (message && field.hasAttribute("required")) {
        message.textContent = field.checkValidity() ? "" : "Please complete this field correctly.";
        message.style.color = field.checkValidity() ? "" : "var(--danger)";
    }
    updateProgress();
});

applicationForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = applicationForm.querySelector(".form-status");
    if (!applicationForm.checkValidity()) {
        applicationForm.reportValidity();
        if (status) {
            status.textContent = "Please complete the required fields before submitting.";
            status.style.color = "var(--gold-500)";
        }
        return;
    }

    localStorage.setItem("mr21-application-draft", JSON.stringify(Object.fromEntries(new FormData(applicationForm))));
    if (status) {
        status.textContent = "Application received. An MR21 consultant will contact you shortly.";
        status.style.color = "var(--gold-500)";
    }
    applicationForm.reset();
    updateProgress();
});

updateProgress();

backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const serviceSlides = document.querySelectorAll(".service-slide");
let activeServiceIndex = 0;

const rotateServiceSlides = () => {
    if (!serviceSlides.length) return;
    serviceSlides[activeServiceIndex].classList.remove("is-active");
    activeServiceIndex = (activeServiceIndex + 1) % serviceSlides.length;
    serviceSlides[activeServiceIndex].classList.add("is-active");
};

setInterval(rotateServiceSlides, 4500);

// Contact hero two-image rotator
const contactHeroImages = document.querySelectorAll('.contact-hero__img');
let contactActive = 0;
const rotateContactHero = () => {
    if (!contactHeroImages || contactHeroImages.length < 2) return;
    contactHeroImages[contactActive].classList.remove('is-active');
    contactActive = (contactActive + 1) % contactHeroImages.length;
    contactHeroImages[contactActive].classList.add('is-active');
};

setInterval(rotateContactHero, 4500);

const planGrid = document.querySelector('.plan-preview-grid');
const prevArrow = document.querySelector('.plans-arrow--prev');
const nextArrow = document.querySelector('.plans-arrow--next');

const scrollPlan = (direction) => {
    if (!planGrid) return;
    const cardWidth = planGrid.querySelector('.plan-preview')?.offsetWidth || 300;
    planGrid.scrollBy({ left: direction * (cardWidth + 30), behavior: 'smooth' });
};

prevArrow?.addEventListener('click', () => scrollPlan(-1));
nextArrow?.addEventListener('click', () => scrollPlan(1));
