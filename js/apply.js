document.addEventListener('DOMContentLoaded', () => {

    /* --- Header scroll state (glass background) --- */
    const header = document.querySelector('[data-header]') || document.querySelector('.header');
    const setHeaderState = () => {
        if (!header) return;
        header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });

    /* --- Back to top --- */
    document.querySelector('[data-back-top]')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- Existing Header/Nav Code --- */
    const nav = document.querySelector('[data-nav]') || document.querySelector('.nav-links');
    const navToggle = document.querySelector('[data-nav-toggle]') || document.querySelector('.nav-toggle');

    if (nav && navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = !nav.classList.contains('open') && !nav.classList.contains('is-open');
            nav.classList.toggle('open', isOpen);
            nav.classList.toggle('is-open', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            navToggle.querySelector('i')?.classList.toggle('fa-xmark', isOpen);
            navToggle.querySelector('i')?.classList.toggle('fa-bars', !isOpen);
        });

        nav.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;

            const dropdown = link.closest('.nav-dropdown');
            if (dropdown && window.matchMedia('(max-width: 850px)').matches && link.nextElementSibling?.classList.contains('dropdown-menu')) {
                event.preventDefault();
                dropdown.classList.toggle('open');
                return;
            }

            nav.classList.remove('open');
            nav.classList.remove('is-open');
            nav.querySelectorAll('.nav-dropdown.open').forEach((item) => item.classList.remove('open'));
            document.body.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
            navToggle.querySelector('i')?.classList.remove('fa-xmark');
            navToggle.querySelector('i')?.classList.add('fa-bars');
        });
    }

    /* --- NEW: Apply Form Logic --- */
    const form = document.querySelector('[data-application-form]');
    const statusMsg = form.querySelector('.form-status');

    // Helper to add or remove error classes
    const setError = (input, message) => {
        const field = input.closest('.input-field');
        const small = field.querySelector('small');
        
        field.classList.add('error');
        if(message) small.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    };

    const clearError = (input) => {
        const field = input.closest('.input-field');
        const small = field.querySelector('small');
        field.classList.remove('error');
        // Restore original helper text
        if(small.dataset.original) small.textContent = small.dataset.original;
        input.removeAttribute('aria-invalid');
    };

    // Save original helper text on load
    form.querySelectorAll('.input-field small').forEach(el => {
        el.dataset.original = el.textContent;
    });

    // Progress bar reflecting required-field completion
    const progressBar = document.querySelector('[data-progress-bar]');
    const updateProgress = () => {
        if (!progressBar) return;
        const requiredFields = [...form.querySelectorAll('[required]')];
        const complete = requiredFields.filter((field) => field.value.trim() && field.checkValidity()).length;
        const percentage = requiredFields.length ? (complete / requiredFields.length) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
    };
    form.addEventListener('input', updateProgress);
    updateProgress();

    // Live formatting / masking for ID Number
    const idInput = document.querySelector('#id_passport');
    if(idInput) {
        idInput.addEventListener('input', () => {
            // If the user types letters, clear it. Only numbers allowed.
            if(isNaN(idInput.value)) {
                idInput.value = idInput.value.replace(/[^0-9]/g, '');
            }
        });
    }

    // Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // 1. Clear all previous errors
        form.querySelectorAll('.input-field.error').forEach(el => el.classList.remove('error'));
        statusMsg.textContent = '';
        statusMsg.className = 'form-status';

        // 2. Check required fields
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            // Remove whitespace for checking but keep original for display
            const val = input.value.trim();
            
            if (!val) {
                setError(input, 'This field is required.');
                isValid = false;
            } else {
                // Specific validation rules
                if(input.type === 'email' && !val.includes('@')) {
                    setError(input, 'Please enter a valid email address (e.g. name@example.com).');
                    isValid = false;
                } else if (input.id === 'id_passport' && val.length < 13) {
                    setError(input, 'South African ID must be 13 digits.');
                    isValid = false;
                } else if (input.id === 'postal_code' && val.length < 4) {
                    setError(input, 'Postal code must be 4 digits.');
                    isValid = false;
                } else {
                    clearError(input);
                }
            }
        });

        // 3. Final Submission Action
        if (isValid) {
            statusMsg.textContent = '✅ Application sent! An MR21 consultant will call you within 24 hours.';
            statusMsg.className = 'form-status success';
            form.reset();
            updateProgress();

            // Optional: Submit actual data to a backend here using fetch()
        } else {
            statusMsg.textContent = '⚠️ Please fix the highlighted fields above.';
            statusMsg.className = 'form-status error';
            
            // Scroll to the first error
            const firstError = form.querySelector('.input-field.error');
            if(firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
