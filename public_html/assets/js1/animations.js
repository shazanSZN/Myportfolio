/**
 * Animation Functions for Portfolio
 * Handles all GSAP animations and scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations when window loads
    window.addEventListener('load', () => {
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
    });

    // 1. Hero Section Animation
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

    // 2. Section Entrance Animations
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

    // 3. Portfolio Hover Effects
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
});