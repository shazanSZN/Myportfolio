/**
 * Portfolio Application - Main File
 * Handles core functionality and initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const DOM = {
        themeToggle: document.querySelector('.theme-color-toggle'),
        moonIcon: document.querySelector('.moon'),
        sunIcon: document.querySelector('.sun'),
        mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        moreLinks: document.querySelector('.more-links'),
        menuList: document.querySelector('.menu-list'),
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
    const state = {
        currentTheme: localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
        mobileMenuOpen: false,
        currentExperienceTab: 'aimpos'
    };

    // Initialize the application
    function init() {
        console.log('Initializing application...');
        setTheme(state.currentTheme);
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
        console.log('Setting up event listeners...');

        // Theme toggle
        if (DOM.themeToggle) {
            DOM.themeToggle.addEventListener('click', toggleTheme);
        } else {
            console.warn('Theme toggle element not found');
        }

        // Mobile menu
        if (DOM.mobileMenuToggle) {
            DOM.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        } else {
            console.warn('Mobile menu toggle element not found');
        }

        // More links dropdown
        if (DOM.moreLinks) {
            DOM.moreLinks.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleDropdownMenu();
            });
        } else {
            console.warn('More links element not found');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', closeDropdownMenu);

        // Experience tabs
        if (DOM.experienceTabs && DOM.experienceTabs.length > 0) {
            DOM.experienceTabs.forEach(tab => {
                tab.addEventListener('click', () => switchExperienceTab(tab.dataset.tab));
            });
        } else {
            console.warn('Experience tabs not found');
        }

        // Back to top button
        window.addEventListener('scroll', debounce(handleScroll, 100));
        if (DOM.backToTop) {
            DOM.backToTop.addEventListener('click', scrollToTop);
        } else {
            console.warn('Back to top button not found');
        }

        // Certificate modal
        if (DOM.workImgs && DOM.workImgs.length > 0) {
            DOM.workImgs.forEach(img => {
                img.addEventListener('click', () => openModal(img));
            });
        } else {
            console.warn('Work images not found for modal');
        }

        if (DOM.modalClose) {
            DOM.modalClose.addEventListener('click', closeModal);
        } else {
            console.warn('Modal close button not found');
        }

        if (DOM.modal) {
            DOM.modal.addEventListener('click', (e) => {
                if (e.target === DOM.modal) closeModal();
            });
        } else {
            console.warn('Modal element not found');
        }

        // Form submission
        if (DOM.contactForm) {
            DOM.contactForm.addEventListener('submit', handleFormSubmit);
        } else {
            console.warn('Contact form not found');
        }

        // Mobile navigation
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                document.querySelector('.mobile-nav').classList.add('translate-x-full');
            });
        }
    }

    // Theme functions
    function setTheme(theme) {
        if (!['dark', 'light'].includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        console.log(`Setting theme to ${theme}`);
        state.currentTheme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);

        if (!DOM.sunIcon || !DOM.moonIcon) {
            console.warn('Theme icons not found');
            return;
        }

        const toggleClasses = ['invisible', 'opacity-0', 'scale-0', 'absolute'];

        if (theme === 'dark') {
            DOM.sunIcon.classList.remove(...toggleClasses);
            DOM.sunIcon.classList.add('relative');
            DOM.moonIcon.classList.add(...toggleClasses);
            DOM.moonIcon.classList.remove('relative');
        } else {
            DOM.moonIcon.classList.remove(...toggleClasses);
            DOM.moonIcon.classList.add('relative');
            DOM.sunIcon.classList.add(...toggleClasses);
            DOM.sunIcon.classList.remove('relative');
        }
    }

    function toggleTheme() {
        console.log('Toggling theme');
        const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

// Mobile menu functions
    function toggleMobileMenu() {
        if (!DOM.navLinks) {
            console.error('Nav links element not found');
            return;
        }

        state.mobileMenuOpen = !state.mobileMenuOpen;
        console.log(`Mobile menu ${state.mobileMenuOpen ? 'opened' : 'closed'}`);
        DOM.navLinks.classList.toggle('active', state.mobileMenuOpen);
        document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
    }

// Dropdown menu functions
    function toggleDropdownMenu() {
        if (!DOM.menuList) {
            console.warn('Menu list not found');
            return;
        }

        console.log('Toggling dropdown menu');
        DOM.menuList.classList.toggle('invisible');
        DOM.menuList.classList.toggle('opacity-0');
    }

    function closeDropdownMenu() {
        if (DOM.menuList && !DOM.menuList.classList.contains('invisible')) {
            console.log('Closing dropdown menu');
            DOM.menuList.classList.add('invisible', 'opacity-0');
        }
    }

// Handle mobile navigation
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const menuClose = document.querySelector('.mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-navigation');
        const backdrop = document.getElementById('mobile-backdrop');
        const navLinks = document.querySelectorAll('#mobile-navigation a');



        if (!menuToggle || !menuClose || !mobileMenu || !backdrop) {
            console.error('Mobile menu elements not found');
            return;
        }

        const openMenu = () => {
            mobileMenu.classList.replace('-translate-x-full', 'translate-x-0');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
            backdrop.classList.replace('opacity-0', 'opacity-100');
            backdrop.classList.replace('pointer-events-none', 'pointer-events-auto');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            mobileMenu.classList.replace('translate-x-0', '-translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
            backdrop.classList.replace('opacity-100', 'opacity-0');
            backdrop.classList.replace('pointer-events-auto', 'pointer-events-none');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);
        backdrop.addEventListener('click', closeMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
    });


    // Experience tabs functions
    function switchExperienceTab(tabId) {
        console.log(`Switching to experience tab: ${tabId}`);

        if (DOM.experienceTabs) {
            DOM.experienceTabs.forEach(tab => {
                const isActive = tab.dataset.tab === tabId;
                tab.classList.toggle('active', isActive);
                tab.classList.toggle('font-medium', isActive);
                tab.classList.toggle('text-purple', isActive);
            });
        }

        if (DOM.experienceContents) {
            DOM.experienceContents.forEach(content => {
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

        state.currentExperienceTab = tabId;
    }

    // Scroll functions
    function handleScroll() {
        if (!DOM.backToTop) return;

        const showButton = window.pageYOffset > 300;
        DOM.backToTop.classList.toggle('opacity-0', !showButton);
        DOM.backToTop.classList.toggle('invisible', !showButton);
        DOM.backToTop.classList.toggle('opacity-100', showButton);
        DOM.backToTop.classList.toggle('visible', showButton);
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
        if (!DOM.modal || !DOM.modalImg) {
            console.warn('Modal elements not found');
            return;
        }

        console.log('Opening modal');
        DOM.modal.classList.remove('hidden');
        DOM.modalImg.src = imgElement.src;
        DOM.modalImg.alt = imgElement.alt;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!DOM.modal) {
            console.warn('Modal element not found');
            return;
        }

        console.log('Closing modal');
        DOM.modal.classList.add('hidden');
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
        if (DOM.yearElement) {
            DOM.yearElement.textContent = new Date().getFullYear();
            console.log('Copyright year updated');
        } else {
            console.warn('Year element not found');
        }
    }

    // Start the application
    init();
});