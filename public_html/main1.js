/**
 * Main Application - Handles core functionality (excluding header)
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const appDOM = {
        experienceTabs: document.querySelectorAll('.companies-list li'),
        experienceContents: document.querySelectorAll('.content'),
        backToTop: document.querySelector('.back-to-top'),
        modal: document.getElementById('imgModal'),
        modalImg: document.getElementById('modalImg'),
        modalClose: document.getElementById('modalClose'),
        workImgs: document.querySelectorAll('.work_img img'),
        contactForm: document.querySelector('form[name="contactForm"]'),
        yearElement: document.querySelector('.year')
    };

    // Application state
    const appState = {
        currentExperienceTab: 'aimpos'
    };

    // Initialize the application
    function initApp() {
        console.log('Initializing main application...');
        setupEventListeners();
        updateCopyrightYear();
        initThirdPartyLibs();

        window.addEventListener('load', () => {
            console.log('Window loaded, initializing animations...');
            initAnimations();
        });
    }

    // Set up all event listeners
    function setupEventListeners() {
        console.log('Setting up main application event listeners...');

        // Experience tabs
        if (appDOM.experienceTabs && appDOM.experienceTabs.length > 0) {
            appDOM.experienceTabs.forEach(tab => {
                tab.addEventListener('click', () => switchExperienceTab(tab.dataset.tab));
            });
        } else {
            console.warn('Experience tabs not found');
        }

        // Back to top button
        window.addEventListener('scroll', debounce(handleScroll, 100));
        if (appDOM.backToTop) {
            appDOM.backToTop.addEventListener('click', scrollToTop);
        } else {
            console.warn('Back to top button not found');
        }

        // Certificate modal
        if (appDOM.workImgs && appDOM.workImgs.length > 0) {
            appDOM.workImgs.forEach(img => {
                img.addEventListener('click', () => openModal(img));
            });
        } else {
            console.warn('Work images not found for modal');
        }

        if (appDOM.modalClose) {
            appDOM.modalClose.addEventListener('click', closeModal);
        } else {
            console.warn('Modal close button not found');
        }

        if (appDOM.modal) {
            appDOM.modal.addEventListener('click', (e) => {
                if (e.target === appDOM.modal) closeModal();
            });
        } else {
            console.warn('Modal element not found');
        }

        // Form submission
        if (appDOM.contactForm) {
            appDOM.contactForm.addEventListener('submit', handleFormSubmit);
        } else {
            console.warn('Contact form not found');
        }
    }

    // Experience tabs functions
    function switchExperienceTab(tabId) {
        console.log(`Switching to experience tab: ${tabId}`);

        if (appDOM.experienceTabs) {
            appDOM.experienceTabs.forEach(tab => {
                const isActive = tab.dataset.tab === tabId;
                tab.classList.toggle('active', isActive);
                tab.classList.toggle('font-medium', isActive);
                tab.classList.toggle('text-purple', isActive);
            });
        }

        if (appDOM.experienceContents) {
            appDOM.experienceContents.forEach(content => {
                const isActive = content.id === tabId;
                content.classList.toggle('active', isActive);
                content.classList.toggle('visible', isActive);
                content.classList.toggle('opacity-100', isActive);
                content.classList.toggle('w-auto', isActive);
                content.classList.toggle('h-auto', isActive);
                content.classList.toggle('translate-y-0', isActive);
                content.classList.toggle('invisible', !isActive);
                content.classList.toggle('opacity-0', !isActive);
                content.classList.toggle('w-0', !isActive);
                content.classList.toggle('h-0', !isActive);
                content.classList.toggle('translate-y-10', !isActive);
                content.classList.toggle('absolute', !isActive);
                content.classList.toggle('relative', isActive);
            });
        }

        appState.currentExperienceTab = tabId;
    }

    // Scroll functions
    function handleScroll() {
        if (!appDOM.backToTop) return;

        const showButton = window.pageYOffset > 300;
        appDOM.backToTop.classList.toggle('opacity-0', !showButton);
        appDOM.backToTop.classList.toggle('invisible', !showButton);
        appDOM.backToTop.classList.toggle('opacity-100', showButton);
        appDOM.backToTop.classList.toggle('visible', showButton);
    }

    function scrollToTop() {
        console.log('Scrolling to top');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Modal functions
    function openModal(imgElement) {
        if (!appDOM.modal || !appDOM.modalImg) {
            console.warn('Modal elements not found');
            return;
        }

        console.log('Opening modal');
        appDOM.modal.classList.remove('hidden');
        appDOM.modalImg.src = imgElement.src;
        appDOM.modalImg.alt = imgElement.alt;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!appDOM.modal) {
            console.warn('Modal element not found');
            return;
        }

        console.log('Closing modal');
        appDOM.modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Form functions
    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log('Handling form submission');

        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const successMessage = form.querySelector('.success-submit-message');
        const failMessage = form.querySelector('.fail-submit-message');

        if (!validateForm(form)) {
            console.log('Form validation failed');
            return;
        }

        if (submitBtn) submitBtn.classList.add('show-loading');

        try {
            await simulateFormSubmission();

            if (successMessage) {
                successMessage.classList.remove('hidden');
                console.log('Form submitted successfully');
            }
            form.reset();

            setTimeout(() => {
                if (successMessage) successMessage.classList.add('hidden');
            }, 5000);
        } catch (error) {
            if (failMessage) {
                failMessage.classList.remove('hidden');
                console.error('Form submission failed:', error);
            }

            setTimeout(() => {
                if (failMessage) failMessage.classList.add('hidden');
            }, 5000);
        } finally {
            if (submitBtn) submitBtn.classList.remove('show-loading');
        }
    }

    function validateForm(form) {
        let isValid = true;
        console.log('Validating form...');

        form.querySelectorAll('.validation-error').forEach(el => {
            el.classList.add('hidden');
        });

        const name = form.querySelector('input[name="name"]');
        if (!name || !name.value.trim()) {
            const error = form.querySelector('.validation-error.name');
            if (error) error.classList.remove('hidden');
            isValid = false;
            console.log('Name validation failed');
        }

        const email = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.value.trim() || !emailRegex.test(email.value)) {
            const error = form.querySelector('.validation-error.email');
            if (error) error.classList.remove('hidden');
            isValid = false;
            console.log('Email validation failed');
        }

        const message = form.querySelector('textarea[name="message"]');
        if (!message || !message.value.trim()) {
            const error = form.querySelector('.validation-error.message');
            if (error) error.classList.remove('hidden');
            isValid = false;
            console.log('Message validation failed');
        }

        if (isValid) console.log('Form validation passed');
        return isValid;
    }

    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    // Third-party library initializations
    function initThirdPartyLibs() {
        console.log('Initializing third-party libraries...');

        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
            console.log('AOS initialized');
        } else {
            console.warn('AOS not loaded');
        }

        // Initialize Typed.js
        if (typeof Typed !== 'undefined') {
            new Typed('.typing', {
                strings: [
                    "Senior IT Support Executive",
                    "Software Engineer",
                    "Full Stack Developer",
                    "IT Professional"
                ],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true,
                smartBackspace: true,
                shuffle: false,
                backDelay: 1500
            });
            console.log('Typed.js initialized');
        } else {
            console.warn('Typed.js not loaded');
        }

        // Initialize Swiper
        if (typeof Swiper !== 'undefined') {
            new Swiper('.swiper', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev',
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },
                a11y: {
                    prevSlideMessage: 'Previous portfolio item',
                    nextSlideMessage: 'Next portfolio item'
                }
            });
            console.log('Swiper initialized');
        } else {
            console.warn('Swiper not loaded');
        }

        // Initialize custom cursor
        if (typeof kursor !== 'undefined') {
            new kursor({
                type: 1,
                color: '#7E74F1',
                removeDefaultCursor: true
            });
            console.log('kursor initialized');
        } else {
            console.warn('kursor not loaded');
        }
    }

    // Animation initialization
    function initAnimations() {
        console.log('Initializing animations...');
        // Add any animation initialization code here
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function updateCopyrightYear() {
        if (appDOM.yearElement) {
            appDOM.yearElement.textContent = new Date().getFullYear();
            console.log('Copyright year updated');
        } else {
            console.warn('Year element not found');
        }
    }

    // Start the application
    initApp();
});
