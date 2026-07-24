document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Existing Header/Nav Code --- */
    const nav = document.querySelector('[data-nav]');
    const navToggle = document.querySelector('[data-nav-toggle]');

    if (nav && navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = !nav.classList.contains('open') && !nav.classList.contains('is-open');
            nav.classList.toggle('open', isOpen);
            nav.classList.toggle('is-open', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.querySelector('i')?.classList.toggle('fa-xmark', isOpen);
            navToggle.querySelector('i')?.classList.toggle('fa-bars', !isOpen);
        });

        nav.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                nav.classList.remove('open');
                nav.classList.remove('is-open');
                document.body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.querySelector('i')?.classList.remove('fa-xmark');
                navToggle.querySelector('i')?.classList.add('fa-bars');
            }
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
