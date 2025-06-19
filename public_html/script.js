/**
 * Portfolio Application - Enhanced with Three.js
 *
 * This script handles all interactive functionality including:
 * - Theme switching
 * - Mobile navigation
 * - Experience tabs
 * - Back to top button
 * - Certificate modal
 * - Form validation
 * - Three.js 3D effects
 * - GSAP animations
 */

document.addEventListener('DOMContentLoaded', () => {
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

    const state = {
        currentTheme: localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
        mobileMenuOpen: false,
        currentExperienceTab: 'aimpos',
        threeJSInitialized: false
    };

    function init() {
        console.log('Initializing application...');
        setTheme(state.currentTheme);
        setupEventListeners();
        updateCopyrightYear();
        initThirdPartyLibs();

        window.addEventListener('load', () => {
            console.log('Window loaded, initializing animations...');
            initAnimations();
            initThreeJSEffects();
        });
    }

    function setupEventListeners() {
        if (DOM.mobileMenuToggle) {
            DOM.mobileMenuToggle.addEventListener('click', () => {
                document.querySelector('.mobile-nav').classList.toggle('translate-x-full');
            });
        }

        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                document.querySelector('.mobile-nav').classList.add('translate-x-full');
            });
        }

        // Add other listeners here as needed...
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
    }

    // Initialize Three.js effects
    function initThreeJSEffects() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded - 3D features disabled');
            return;
        }

        if (state.threeJSInitialized) return;
        state.threeJSInitialized = true;

        console.log('Initializing Three.js effects...');

        // Initialize all 3D sections with error handling
        try {
            initEducation3D();
            initServices3D();
            initPortfolio3D();
            initExperience3D();
            initCertificates3D();
            initBlog3D();
            initContact3D();
        } catch (e) {
            console.error('Error initializing Three.js effects:', e);
        }
    }




    /**
     * Enhanced Hero Section with 3D Effects - Pure JS Implementation
     */
    function initHero3D() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) {
            console.warn('Hero section not found');
            return;
        }

        // Create container if it doesn't exist
        let container = heroSection.querySelector('.hero-3d-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'hero-3d-container';

            // Style the container with JS
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-1';
            container.style.pointerEvents = 'none';
            container.style.overflow = 'hidden';

            // Ensure hero section has proper positioning
            heroSection.style.position = 'relative';

            heroSection.prepend(container);
        } else {
            // Clear existing content
            container.innerHTML = '';
        }

        try {
            // Scene setup
            const scene = new THREE.Scene();
            scene.background = null;

            // Camera setup
            const camera = new THREE.PerspectiveCamera(
                60,
                container.clientWidth / container.clientHeight,
                0.1,
                1000
            );
            camera.position.z = 15;

            // Renderer setup
            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Create floating 3D shapes with different geometries
            const shapes = [];
            const geometries = [
                () => new THREE.IcosahedronGeometry(0.8 + Math.random() * 0.5, 0),
                () => new THREE.TorusGeometry(0.6 + Math.random() * 0.4, 0.2, 16, 32),
                () => new THREE.OctahedronGeometry(0.9 + Math.random() * 0.6),
                () => new THREE.ConeGeometry(0.7 + Math.random() * 0.5, 1.2 + Math.random() * 0.8, 32)
            ];

            // Create 8-12 shapes randomly positioned
            const shapeCount = 8 + Math.floor(Math.random() * 5);
            for (let i = 0; i < shapeCount; i++) {
                const geoIndex = i % geometries.length;
                const geometry = geometries[geoIndex]();

                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(
                        Math.random() * 0.2 + 0.7,
                        Math.random() * 0.2 + 0.6,
                        Math.random() * 0.3 + 0.7
                    ),
                    transparent: true,
                    opacity: 0.7 + Math.random() * 0.2,
                    shininess: 80 + Math.random() * 40,
                    specular: new THREE.Color(0xffffff)
                });

                const shape = new THREE.Mesh(geometry, material);

                // Position in a spherical pattern
                const radius = 4 + Math.random() * 4;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);

                shape.position.set(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi)
                );

                // Store animation properties
                shape.userData = {
                    speed: 0.1 + Math.random() * 0.3,
                    rotationSpeed: new THREE.Vector3(
                        Math.random() * 0.02 - 0.01,
                        Math.random() * 0.02 - 0.01,
                        Math.random() * 0.02 - 0.01
                    ),
                    originalPosition: shape.position.clone(),
                    floatRadius: 0.3 + Math.random() * 0.7
                };

                scene.add(shape);
                shapes.push(shape);
            }

            // Mouse interaction
            const mouse = new THREE.Vector2();
            const target = new THREE.Vector2();
            const windowHalf = new THREE.Vector2(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

            function onMouseMove(event) {
                mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
                mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
            }

            // Handle window resize
            function onWindowResize() {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);

                // Smooth mouse follow
                target.x += (mouse.x * 4 - target.x) * 0.05;
                target.y += (-mouse.y * 4 - target.y) * 0.05;

                // Move camera
                camera.position.x += (target.x - camera.position.x) * 0.1;
                camera.position.y += (target.y - camera.position.y) * 0.1;
                camera.lookAt(scene.position);

                // Animate shapes
                const time = Date.now() * 0.001;

                shapes.forEach((shape, i) => {
                    // Pulsing scale animation
                    const scale = 0.8 + Math.sin(time * shape.userData.speed + i) * 0.2;
                    shape.scale.set(scale, scale, scale);

                    // Continuous rotation
                    shape.rotation.x += shape.userData.rotationSpeed.x;
                    shape.rotation.y += shape.userData.rotationSpeed.y;
                    shape.rotation.z += shape.userData.rotationSpeed.z;

                    // Floating position animation
                    shape.position.x = shape.userData.originalPosition.x +
                        Math.sin(time * 0.3 + i) * shape.userData.floatRadius;
                    shape.position.y = shape.userData.originalPosition.y +
                        Math.cos(time * 0.2 + i * 1.3) * shape.userData.floatRadius;
                    shape.position.z = shape.userData.originalPosition.z +
                        Math.sin(time * 0.25 + i * 0.7) * shape.userData.floatRadius;
                });

                renderer.render(scene, camera);
            }

            animate();

            // Cleanup function
            return function cleanup() {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('resize', onWindowResize);
                if (container && renderer.domElement) {
                    container.removeChild(renderer.domElement);
                }
            };

        } catch (e) {
            console.error('Error initializing hero 3D:', e);
            return function() {}; // Return empty cleanup function
        }
    }

// Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for fonts/images to load for better performance
        window.addEventListener('load', () => {
            const cleanupHero3D = initHero3D();

            // Optional: Cleanup when navigating away (for SPAs)
            window.addEventListener('beforeunload', () => {
                if (cleanupHero3D) cleanupHero3D();
            });
        });
    });

    // 1. Education & Skills Section - 3D Diplomas
    function initEducation3D() {
        const educationSection = document.getElementById('education-skill');
        if (!educationSection) {
            console.warn('Education section not found');
            return;
        }

        const container = educationSection.querySelector('.education-3d-container');
        if (!container) {
            console.warn('Education 3D container not found');
            return;
        }

        try {
            // Set up Three.js scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Position camera
            camera.position.z = 5;

            // Create diploma textures
            const diplomaGeometry = new THREE.PlaneGeometry(1.5, 2);
            const materials = [
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/img/slass.jpg') }),
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/img/wpds.jpg') }),
                new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/img/udmy.jpg') })
            ];

            // Create diplomas
            const diplomas = [];
            materials.forEach((material, i) => {
                const diploma = new THREE.Mesh(diplomaGeometry, material);
                diploma.position.x = (i - 1) * 2.5;
                diploma.position.y = -1 + i * 0.5;
                diploma.rotation.y = i * 0.5;
                scene.add(diploma);
                diplomas.push(diploma);
            });

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                diplomas.forEach((diploma, i) => {
                    diploma.rotation.y += 0.005;
                    diploma.position.y = -1 + Math.sin(Date.now() * 0.001 + i) * 0.5;
                });
                renderer.render(scene, camera);
            }
            animate();

            // Handle resize
            window.addEventListener('resize', () => {
                camera.aspect = container.offsetWidth / container.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.offsetWidth, container.offsetHeight);
            });
        } catch (e) {
            console.error('Error in education 3D:', e);
        }
    }

    // 2. Services Section - 3D Cubes
    function initServices3D() {
        const servicesSection = document.getElementById('services');
        if (!servicesSection) {
            console.warn('Services section not found');
            return;
        }

        const container = servicesSection.querySelector('.services-3d-container');
        if (!container) {
            console.warn('Services 3D container not found');
            return;
        }

        try {
            // Set up scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild(renderer.domElement);

            camera.position.z = 8;

            // Create service cubes
            const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const cubeMaterials = [
                new THREE.MeshBasicMaterial({ color: 0x7E74F1, transparent: true, opacity: 0.8 }),
                new THREE.MeshBasicMaterial({ color: 0x5A4FCF, transparent: true, opacity: 0.8 }),
                new THREE.MeshBasicMaterial({ color: 0x3D34B0, transparent: true, opacity: 0.8 })
            ];

            const cubes = [];
            cubeMaterials.forEach((material, i) => {
                const cube = new THREE.Mesh(cubeGeometry, material);
                cube.position.x = (i - 1) * 3;
                cube.position.y = -1;
                scene.add(cube);
                cubes.push(cube);
            });

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Animation
            function animate() {
                requestAnimationFrame(animate);
                cubes.forEach((cube, i) => {
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                    cube.position.y = -1 + Math.sin(Date.now() * 0.001 + i) * 0.5;
                });
                renderer.render(scene, camera);
            }
            animate();

            // Resize handler
            window.addEventListener('resize', () => {
                camera.aspect = container.offsetWidth / container.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.offsetWidth, container.offsetHeight);
            });
        } catch (e) {
            console.error('Error in services 3D:', e);
        }
    }

    // 3. Portfolio Section - 3D Card Flips
    function initPortfolio3D() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (!portfolioItems.length) {
            console.warn('Portfolio items not found');
            return;
        }

        portfolioItems.forEach(item => {
            const container = item.querySelector('.portfolio-3d-container');
            if (!container) return;

            try {
                // Set up scene
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                container.appendChild(renderer.domElement);

                camera.position.z = 5;

                // Create card
                const imgSrc = item.querySelector('img')?.src;
                if (!imgSrc) return;

                const cardGeometry = new THREE.PlaneGeometry(2, 3);
                const cardMaterial = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(imgSrc),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.8
                });
                const card = new THREE.Mesh(cardGeometry, cardMaterial);
                scene.add(card);

                // Add lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(1, 1, 1);
                scene.add(directionalLight);

                // Hover animation
                item.addEventListener('mouseenter', () => {
                    gsap.to(card.rotation, {
                        y: Math.PI,
                        duration: 1,
                        ease: "power2.out"
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(card.rotation, {
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                });

                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }
                animate();
            } catch (e) {
                console.error('Error in portfolio item 3D:', e);
            }
        });
    }

    // 4. Experience Section - 3D Timeline
    /**
     * Experience Section with Interactive 3D Timeline
     * - Handles all 5 company tabs
     * - 3D animated timeline effect
     * - Smooth transitions between content
     */

    function initExperience3D() {
        const experienceSection = document.getElementById('experience');
        if (!experienceSection) {
            console.warn('Experience section not found');
            return;
        }

        const container = experienceSection.querySelector('.experience-3d-container');
        if (!container) {
            console.warn('Experience 3D container not found');
            return;
        }

        try {
            // Initialize Three.js if available
            if (typeof THREE !== 'undefined') {
                // Scene setup
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                container.appendChild(renderer.domElement);

                camera.position.z = 10;

                // Create timeline nodes for all 5 companies
                const companies = ['aimpos', 'trace', 'ilt', 'safanas', 'mexaire'];
                const nodes = [];
                const nodeGeometry = new THREE.SphereGeometry(0.3, 32, 32);
                const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x7E74F1 });

                companies.forEach((company, i) => {
                    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                    node.position.x = (i - (companies.length - 1) / 2) * 3;
                    node.position.y = Math.sin(i * 0.5) * 1.5;
                    node.userData = { company: company };
                    scene.add(node);
                    nodes.push(node);
                });

                // Create connections
                const lineMaterial = new THREE.LineBasicMaterial({ color: 0xEAE6FE });
                const points = nodes.map(node => new THREE.Vector3(node.position.x, node.position.y, 0));
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);

                // Animation
                function animate() {
                    requestAnimationFrame(animate);
                    nodes.forEach((node, i) => {
                        node.position.y = Math.sin(Date.now() * 0.001 + i) * 1.5;
                    });

                    // Update line
                    const updatedPoints = nodes.map(node => new THREE.Vector3(node.position.x, node.position.y, 0));
                    line.geometry.setFromPoints(updatedPoints);

                    renderer.render(scene, camera);
                }
                animate();

                // Handle resize
                window.addEventListener('resize', () => {
                    camera.aspect = container.offsetWidth / container.offsetHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.offsetWidth, container.offsetHeight);
                });
            }

            // Tab switching functionality for all 5 companies
            const tabs = experienceSection.querySelectorAll('.companies-list li');
            const contents = experienceSection.querySelectorAll('.content');
            const selector = experienceSection.querySelector('.selector');

            function switchTab(tabId) {
                // Update active tab
                tabs.forEach(tab => {
                    const isActive = tab.dataset.tab === tabId;
                    tab.classList.toggle('active', isActive);
                    tab.classList.toggle('font-medium', isActive);
                    tab.classList.toggle('text-purple', isActive);
                });

                // Move selector (for desktop)
                if (selector) {
                    const activeTab = experienceSection.querySelector(`.companies-list li[data-tab="${tabId}"]`);
                    if (activeTab) {
                        selector.style.top = `${activeTab.offsetTop}px`;
                    }
                }

                // Update active content
                contents.forEach(content => {
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

                // If Three.js is active, highlight the corresponding node
                if (typeof THREE !== 'undefined') {
                    nodes.forEach(node => {
                        node.material.color.setHex(node.userData.company === tabId ? 0xEAE6FE : 0x7E74F1);
                    });
                }
            }

            // Set up event listeners for all tabs
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    switchTab(tab.dataset.tab);
                });
            });

            // Initialize with first tab active
            if (tabs.length > 0) {
                switchTab(tabs[0].dataset.tab);
            }

        } catch (e) {
            console.error('Error initializing experience section:', e);
        }
    }

// Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initExperience3D();
    });

    // 5. Certificates Section - 3D Gallery Wall
    function initCertificates3D() {
        const certificatesSection = document.getElementById('blog');
        if (!certificatesSection) {
            console.warn('Certificates section not found');
            return;
        }

        const container = certificatesSection.querySelector('.certificates-3d-container');
        if (!container) {
            console.warn('Certificates 3D container not found');
            return;
        }

        try {
            // Set up scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild(renderer.domElement);

            camera.position.z = 15;

            // Create certificate frames
            const certificates = [];
            const certificateGeometry = new THREE.PlaneGeometry(2, 2.5);

            // Get all certificate images
            const certificateImages = [
                'assets/img/slass.jpg',
                'assets/img/wpds.jpg',
                'assets/img/udmy.jpg',
                'assets/img/courseC.jpg',
                'assets/img/courseD.jpg',
                'assets/img/css.jpg'
            ];

            // Arrange in a grid
            const gridSize = 3;
            const spacing = 3;

            certificateImages.forEach((imgSrc, i) => {
                const row = Math.floor(i / gridSize);
                const col = i % gridSize;

                const material = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(imgSrc),
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.9
                });

                const certificate = new THREE.Mesh(certificateGeometry, material);
                certificate.position.x = (col - (gridSize - 1) / 2) * spacing;
                certificate.position.y = -(row - (Math.ceil(certificateImages.length / gridSize) / 2)) * spacing;
                certificate.position.z = -5;

                scene.add(certificate);
                certificates.push(certificate);
            });

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Animation - slight floating effect
            function animate() {
                requestAnimationFrame(animate);

                certificates.forEach((cert, i) => {
                    cert.rotation.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
                    cert.position.z = -5 + Math.cos(Date.now() * 0.001 + i) * 0.5;
                });

                renderer.render(scene, camera);
            }
            animate();

            // Resize handler
            window.addEventListener('resize', () => {
                camera.aspect = container.offsetWidth / container.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.offsetWidth, container.offsetHeight);
            });
        } catch (e) {
            console.error('Error in certificates 3D:', e);
        }
    }






    // 6. Blog Section - 3D Post Cards
    function initBlog3D() {
        const blogItems = document.querySelectorAll('.post-item');
        if (!blogItems.length) {
            console.warn('Blog items not found');
            return;
        }

        blogItems.forEach(item => {
            const container = item.querySelector('.blog-3d-container');
            if (!container) return;

            try {
                // Set up scene
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                container.appendChild(renderer.domElement);

                camera.position.z = 5;

                // Create card
                const imgSrc = item.querySelector('img')?.src;
                if (!imgSrc) return;

                const cardGeometry = new THREE.BoxGeometry(2, 3, 0.2);
                const cardMaterials = [
                    new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(imgSrc),
                        transparent: true,
                        opacity: 0.9
                    }),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
                    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })
                ];

                const card = new THREE.Mesh(cardGeometry, cardMaterials);
                scene.add(card);

                // Add lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);
                const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                directionalLight.position.set(1, 1, 1);
                scene.add(directionalLight);

                // Hover animation
                item.addEventListener('mouseenter', () => {
                    gsap.to(card.rotation, {
                        x: 0.2,
                        y: 0.2,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    gsap.to(card.position, {
                        z: 0.5,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(card.rotation, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    gsap.to(card.position, {
                        z: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });

                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }
                animate();
            } catch (e) {
                console.error('Error in blog item 3D:', e);
            }
        });
    }

    // 7. Contact Section - 3D Form with Floating Elements
    function initContact3D() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) {
            console.warn('Contact section not found');
            return;
        }

        const container = contactSection.querySelector('.contact-3d-container');
        if (!container) {
            console.warn('Contact 3D container not found');
            return;
        }

        try {
            // Set up scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild(renderer.domElement);

            camera.position.z = 10;

            // Create floating form elements
            const formElements = [];
            const geometries = [
                new THREE.BoxGeometry(1, 0.2, 1),   // Name field
                new THREE.BoxGeometry(1, 0.2, 1),   // Email field
                new THREE.BoxGeometry(1.5, 0.2, 1), // Message field
                new THREE.SphereGeometry(0.3)       // Submit button
            ];

            const materials = [
                new THREE.MeshBasicMaterial({ color: 0x7E74F1, transparent: true, opacity: 0.8 }),
                new THREE.MeshBasicMaterial({ color: 0x5A4FCF, transparent: true, opacity: 0.8 }),
                new THREE.MeshBasicMaterial({ color: 0x3D34B0, transparent: true, opacity: 0.8 }),
                new THREE.MeshBasicMaterial({ color: 0xEAE6FE, transparent: true, opacity: 0.8 })
            ];

            geometries.forEach((geometry, i) => {
                const element = new THREE.Mesh(geometry, materials[i]);
                element.position.y = 2 - i * 1.5;
                element.position.x = (i % 2 === 0) ? -1.5 : 1.5;
                scene.add(element);
                formElements.push(element);
            });

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Animation
            function animate() {
                requestAnimationFrame(animate);

                formElements.forEach((element, i) => {
                    element.rotation.x += 0.01;
                    element.rotation.y += 0.01;
                    element.position.y = 2 - i * 1.5 + Math.sin(Date.now() * 0.001 + i) * 0.1;
                });

                renderer.render(scene, camera);
            }
            animate();

            // Resize handler
            window.addEventListener('resize', () => {
                camera.aspect = container.offsetWidth / container.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.offsetWidth, container.offsetHeight);
            });
        } catch (e) {
            console.error('Error in contact 3D:', e);
        }
    }

    // Theme functions
    function setTheme(theme) {
        console.log(`Setting theme to ${theme}`);
        state.currentTheme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);

        // Update icon visibility
        if (DOM.sunIcon && DOM.moonIcon) {
            if (theme === 'dark') {
                DOM.sunIcon.classList.remove('invisible', 'opacity-0', 'scale-0', 'absolute');
                DOM.sunIcon.classList.add('relative');
                DOM.moonIcon.classList.add('invisible', 'opacity-0', 'scale-0', 'absolute');
                DOM.moonIcon.classList.remove('relative');
            } else {
                DOM.moonIcon.classList.remove('invisible', 'opacity-0', 'scale-0', 'absolute');
                DOM.moonIcon.classList.add('relative');
                DOM.sunIcon.classList.add('invisible', 'opacity-0', 'scale-0', 'absolute');
                DOM.sunIcon.classList.remove('relative');
            }
        } else {
            console.warn('Theme icons not found');
        }
    }

    function toggleTheme() {
        console.log('Toggling theme');
        setTheme(state.currentTheme === 'dark' ? 'light' : 'dark');
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

    // Experience tabs functions
    function switchExperienceTab(tabId) {
        console.log(`Switching to experience tab: ${tabId}`);

        // Update active tab
        if (DOM.experienceTabs) {
            DOM.experienceTabs.forEach(tab => {
                const isActive = tab.dataset.tab === tabId;
                tab.classList.toggle('active', isActive);
                tab.classList.toggle('font-medium', isActive);
                tab.classList.toggle('text-purple', isActive);
            });
        }

        // Update active content
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

        // Validate form
        if (!validateForm(form)) {
            console.log('Form validation failed');
            return;
        }

        // Show loading state
        if (submitBtn) submitBtn.classList.add('show-loading');

        try {
            // Simulate form submission (replace with actual fetch in production)
            console.log('Submitting form...');
            await simulateFormSubmission();

            // Show success
            if (successMessage) {
                successMessage.classList.remove('hidden');
                console.log('Form submitted successfully');
            }
            form.reset();

            // Hide success after 5 seconds
            setTimeout(() => {
                if (successMessage) successMessage.classList.add('hidden');
            }, 5000);
        } catch (error) {
            // Show error
            if (failMessage) {
                failMessage.classList.remove('hidden');
                console.error('Form submission failed:', error);
            }

            // Hide error after 5 seconds
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

        // Reset validation errors
        form.querySelectorAll('.validation-error').forEach(el => {
            el.classList.add('hidden');
        });

        // Validate name
        const name = form.querySelector('input[name="name"]');
        if (!name || !name.value.trim()) {
            const error = form.querySelector('.validation-error.name');
            if (error) error.classList.remove('hidden');
            isValid = false;
            console.log('Name validation failed');
        }

        // Validate email
        const email = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.value.trim() || !emailRegex.test(email.value)) {
            const error = form.querySelector('.validation-error.email');
            if (error) error.classList.remove('hidden');
            isValid = false;
            console.log('Email validation failed');
        }

        // Validate message
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
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate for demo purposes
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

        // Initialize AOS (Animate On Scroll)
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

        // Initialize Typed.js for typing animation
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

        // Initialize Swiper for portfolio slider
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

    // Animation functions
    function initAnimations() {
        console.log('Initializing animations...');

        // Only initialize if GSAP is loaded
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded - animations disabled');
            return;
        }

        // Register ScrollTrigger plugin if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            console.log('ScrollTrigger registered');
        }

        initHeroAnimation();
        initSectionAnimations();
        initPortfolioHoverEffects();
    }

    function initHeroAnimation() {
        const heroContent = document.querySelector('#hero-content');
        const heroImage = document.querySelector('#hero-image');
        const floatingShapes = document.querySelectorAll('.floating-shapes .shape');

        // Check if elements exist
        if (!heroContent || !heroImage || floatingShapes.length === 0) {
            console.warn('Hero animation elements not found');
            return;
        }

        console.log('Initializing hero animation...');

        // Set initial 3D perspective
        gsap.set([heroContent, heroImage], {
            transformStyle: "preserve-3d",
            perspective: 1000
        });

        // 3D tilt effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 10;

            gsap.to(heroContent, {
                rotationY: xPos,
                rotationX: -yPos,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });

            gsap.to(heroImage, {
                rotationY: -xPos * 1.5,
                rotationX: yPos * 1.5,
                transformPerspective: 1200,
                ease: "power1.out",
                duration: 0.5
            });
        });

        // Floating shapes animation
        floatingShapes.forEach((shape, i) => {
            const duration = 8 + i * 2;
            const delay = i * 0.5;

            gsap.to(shape, {
                y: () => Math.random() * 40 - 20,
                x: () => Math.random() * 40 - 20,
                rotation: 360,
                duration: duration,
                delay: delay,
                ease: "none",
                repeat: -1,
                yoyo: true
            });
        });

        // Hero content entrance animation
        const tl = gsap.timeline();
        tl.from(heroContent, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(heroImage, {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from(floatingShapes, {
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.5");

        console.log('Hero animation initialized');
    }

    function initSectionAnimations() {
        const sections = document.querySelectorAll('section');
        if (sections.length === 0) {
            console.warn('No sections found for animation');
            return;
        }

        console.log('Initializing section animations...');

        sections.forEach(section => {
            const heading = section.querySelector('.section-name');
            const content = section.querySelectorAll('[data-aos]');

            // Skip if no elements found
            if (!heading || content.length === 0) return;

            gsap.set(content, { opacity: 0, y: 20 });

            // Create scroll trigger for each section
            ScrollTrigger.create({
                trigger: section,
                start: "top 70%",
                onEnter: () => {
                    gsap.to(heading, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    });

                    gsap.to(content, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                },
                once: true
            });
        });

        console.log('Section animations initialized');
    }

    function initPortfolioHoverEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (portfolioItems.length === 0) {
            console.warn('No portfolio items found for hover effects');
            return;
        }

        console.log('Initializing portfolio hover effects...');

        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            const detail = item.querySelector('.detail');

            if (!img || !detail) return;

            item.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(detail, {
                    y: -10,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(detail, {
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });

        console.log('Portfolio hover effects initialized');
    }

    // Start the application
    init();
});
