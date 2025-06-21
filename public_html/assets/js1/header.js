document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-navigation');
    const backdrop = document.getElementById('mobile-backdrop');
    const menuToggleButtons = document.querySelectorAll('.mobile-menu-toggle');
    const menuCloseButton = document.querySelector('.mobile-menu-close');
    const themeToggle = document.querySelector('.theme-color-toggle-mobile');
    const sunIcon = themeToggle?.querySelector('.sun');
    const moonIcon = themeToggle?.querySelector('.moon');
    const navLinks = mobileMenu.querySelectorAll('a[href^="#"]');

    // Initialize theme from localStorage or OS preference
    let currentTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(currentTheme);

    function openMobileMenu() {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenu.setAttribute('aria-hidden', 'false');

        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100', 'pointer-events-auto');

        menuToggleButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'true');

        backdrop.classList.remove('opacity-100', 'pointer-events-auto');
        backdrop.classList.add('opacity-0', 'pointer-events-none');

        menuToggleButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        document.body.style.overflow = '';
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);

        if (sunIcon && moonIcon) {
            sunIcon.classList.toggle('hidden', theme !== 'dark');
            moonIcon.classList.toggle('hidden', theme === 'dark');
        }

        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        }
    }

    // Attach event listeners
    menuToggleButtons.forEach(btn => btn.addEventListener('click', openMobileMenu));
    if (menuCloseButton) menuCloseButton.addEventListener('click', closeMobileMenu);
    backdrop.addEventListener('click', closeMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Optional: Close menu with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('translate-x-0')) {
            closeMobileMenu();
        }
    });
});



// Add this script to your JavaScript file or within <script> tags
document.addEventListener('DOMContentLoaded', function() {
    // Select both desktop and mobile toggle buttons
    const themeToggles = document.querySelectorAll('.theme-color-toggle, .theme-color-toggle-mobile');

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Toggle dark class on the root element
            document.documentElement.classList.toggle('dark');

            // Update localStorage to persist the theme
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);

            // Update button icons (for both desktop and mobile)
            updateThemeIcons(isDark);
        });
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
    }

    function updateThemeIcons(isDark) {
        const sunIcons = document.querySelectorAll('.sun');
        const moonIcons = document.querySelectorAll('.moon');

        sunIcons.forEach(icon => {
            icon.classList.toggle('hidden', !isDark);
            icon.classList.toggle('opacity-0', !isDark);
            icon.classList.toggle('scale-0', !isDark);
        });

        moonIcons.forEach(icon => {
            icon.classList.toggle('hidden', isDark);
        });
    }
});