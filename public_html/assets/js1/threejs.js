
// /**
//  * Three.js Effects for Portfolio
//  * Handles all 3D visualizations and effects
//  */
//
document.addEventListener('DOMContentLoaded', () => {
    // Initialize when window loads to ensure all assets are ready
    window.addEventListener('load', () => {
        console.log('Initializing Three.js effects...');

        // Initialize all 3D sections with error handling
        try {
            initHero3D();
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
    });

    // 1. Hero Section - Floating 3D Shapes
    function initHero3D() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) {
            console.warn('Hero section not found');
            return;
        }

        let container = heroSection.querySelector('.hero-3d-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'hero-3d-container';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-1';
            container.style.pointerEvents = 'none';
            container.style.overflow = 'hidden';
            heroSection.style.position = 'relative';
            heroSection.prepend(container);
        } else {
            container.innerHTML = '';
        }

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

        // Create floating 3D shapes
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
    }
//
//     // 2. Education & Skills Section - 3D Diplomas
//     // function initEducation3D() {
//     //     const educationSection = document.getElementById('education-skill');
//     //     if (!educationSection) return;
//     //
//     //     const container = educationSection.querySelector('.education-3d-container');
//     //     if (!container) return;
//     //
//     //     try {
//     //         const scene = new THREE.Scene();
//     //         const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
//     //         const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     //         renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //         renderer.setPixelRatio(window.devicePixelRatio);
//     //         container.appendChild(renderer.domElement);
//     //
//     //         camera.position.z = 5;
//     //
//     //         // Create diploma textures
//     //         const diplomaGeometry = new THREE.PlaneGeometry(1.5, 2);
//     //         const materials = [
//     //             new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/img/slass.jpg') }),
//     //             new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/img/wpds.jpg') }),
//     //             new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/img/udmy.jpg') })
//     //         ];
//     //
//     //         // Create diplomas
//     //         const diplomas = [];
//     //         materials.forEach((material, i) => {
//     //             const diploma = new THREE.Mesh(diplomaGeometry, material);
//     //             diploma.position.x = (i - 1) * 2.5;
//     //             diploma.position.y = -1 + i * 0.5;
//     //             diploma.rotation.y = i * 0.5;
//     //             scene.add(diploma);
//     //             diplomas.push(diploma);
//     //         });
//     //
//     //         // Add lighting
//     //         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     //         scene.add(ambientLight);
//     //         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     //         directionalLight.position.set(1, 1, 1);
//     //         scene.add(directionalLight);
//     //
//     //         // Animation loop
//     //         function animate() {
//     //             requestAnimationFrame(animate);
//     //             diplomas.forEach((diploma, i) => {
//     //                 diploma.rotation.y += 0.005;
//     //                 diploma.position.y = -1 + Math.sin(Date.now() * 0.001 + i) * 0.5;
//     //             });
//     //             renderer.render(scene, camera);
//     //         }
//     //         animate();
//     //
//     //         // Handle resize
//     //         window.addEventListener('resize', () => {
//     //             camera.aspect = container.offsetWidth / container.offsetHeight;
//     //             camera.updateProjectionMatrix();
//     //             renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //         });
//     //     } catch (e) {
//     //         console.error('Error in education 3D:', e);
//     //     }
//     // }
//
//     // // 3. Services Section - 3D Cubes
//     // function initServices3D() {
//     //     const servicesSection = document.getElementById('services');
//     //     if (!servicesSection) return;
//     //
//     //     const container = servicesSection.querySelector('.services-3d-container');
//     //     if (!container) return;
//     //
//     //     try {
//     //         const scene = new THREE.Scene();
//     //         const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
//     //         const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     //         renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //         container.appendChild(renderer.domElement);
//     //
//     //         camera.position.z = 8;
//     //
//     //         // Create service cubes
//     //         const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
//     //         const cubeMaterials = [
//     //             new THREE.MeshBasicMaterial({ color: 0x7E74F1, transparent: true, opacity: 0.8 }),
//     //             new THREE.MeshBasicMaterial({ color: 0x5A4FCF, transparent: true, opacity: 0.8 }),
//     //             new THREE.MeshBasicMaterial({ color: 0x3D34B0, transparent: true, opacity: 0.8 })
//     //         ];
//     //
//     //         const cubes = [];
//     //         cubeMaterials.forEach((material, i) => {
//     //             const cube = new THREE.Mesh(cubeGeometry, material);
//     //             cube.position.x = (i - 1) * 3;
//     //             cube.position.y = -1;
//     //             scene.add(cube);
//     //             cubes.push(cube);
//     //         });
//     //
//     //         // Add lighting
//     //         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     //         scene.add(ambientLight);
//     //         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     //         directionalLight.position.set(1, 1, 1);
//     //         scene.add(directionalLight);
//     //
//     //         // Animation
//     //         function animate() {
//     //             requestAnimationFrame(animate);
//     //             cubes.forEach((cube, i) => {
//     //                 cube.rotation.x += 0.01;
//     //                 cube.rotation.y += 0.01;
//     //                 cube.position.y = -1 + Math.sin(Date.now() * 0.001 + i) * 0.5;
//     //             });
//     //             renderer.render(scene, camera);
//     //         }
//     //         animate();
//     //
//     //         // Resize handler
//     //         window.addEventListener('resize', () => {
//     //             camera.aspect = container.offsetWidth / container.offsetHeight;
//     //             camera.updateProjectionMatrix();
//     //             renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //         });
//     //     } catch (e) {
//     //         console.error('Error in services 3D:', e);
//     //     }
//     // }
//
//     // 4. Portfolio Section - 3D Card Flips
//     // function initPortfolio3D() {
//     //     const portfolioItems = document.querySelectorAll('.portfolio-item');
//     //     if (!portfolioItems.length) return;
//     //
//     //     portfolioItems.forEach(item => {
//     //         const container = item.querySelector('.portfolio-3d-container');
//     //         if (!container) return;
//     //
//     //         try {
//     //             const scene = new THREE.Scene();
//     //             const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     //             const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     //             renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //             container.appendChild(renderer.domElement);
//     //
//     //             camera.position.z = 5;
//     //
//     //             const imgSrc = item.querySelector('img')?.src;
//     //             if (!imgSrc) return;
//     //
//     //             const cardGeometry = new THREE.PlaneGeometry(2, 3);
//     //             const cardMaterial = new THREE.MeshBasicMaterial({
//     //                 map: new THREE.TextureLoader().load(imgSrc),
//     //                 side: THREE.DoubleSide,
//     //                 transparent: true,
//     //                 opacity: 0.8
//     //             });
//     //             const card = new THREE.Mesh(cardGeometry, cardMaterial);
//     //             scene.add(card);
//     //
//     //             // Add lighting
//     //             const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     //             scene.add(ambientLight);
//     //             const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     //             directionalLight.position.set(1, 1, 1);
//     //             scene.add(directionalLight);
//     //
//     //             // Hover animation
//     //             item.addEventListener('mouseenter', () => {
//     //                 gsap.to(card.rotation, {
//     //                     y: Math.PI,
//     //                     duration: 1,
//     //                     ease: "power2.out"
//     //                 });
//     //             });
//     //
//     //             item.addEventListener('mouseleave', () => {
//     //                 gsap.to(card.rotation, {
//     //                     y: 0,
//     //                     duration: 1,
//     //                     ease: "power2.out"
//     //                 });
//     //             });
//     //
//     //             // Animation loop
//     //             function animate() {
//     //                 requestAnimationFrame(animate);
//     //                 renderer.render(scene, camera);
//     //             }
//     //             animate();
//     //         } catch (e) {
//     //             console.error('Error in portfolio item 3D:', e);
//     //         }
//     //     });
//     // }
//
//     // 5. Experience Section - 3D Timeline
//     // function initExperience3D() {
//     //     const experienceSection = document.getElementById('experience');
//     //     if (!experienceSection) return;
//     //
//     //     const container = experienceSection.querySelector('.experience-3d-container');
//     //     if (!container) return;
//     //
//     //     try {
//     //         if (typeof THREE !== 'undefined') {
//     //             const scene = new THREE.Scene();
//     //             const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
//     //             const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     //             renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //             container.appendChild(renderer.domElement);
//     //
//     //             camera.position.z = 10;
//     //
//     //             // Create timeline nodes for all 5 companies
//     //             const companies = ['aimpos', 'trace', 'ilt', 'safanas', 'mexaire'];
//     //             const nodes = [];
//     //             const nodeGeometry = new THREE.SphereGeometry(0.3, 32, 32);
//     //             const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x7E74F1 });
//     //
//     //             companies.forEach((company, i) => {
//     //                 const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
//     //                 node.position.x = (i - (companies.length - 1) / 2) * 3;
//     //                 node.position.y = Math.sin(i * 0.5) * 1.5;
//     //                 node.userData = { company: company };
//     //                 scene.add(node);
//     //                 nodes.push(node);
//     //             });
//     //
//     //             // Create connections
//     //             const lineMaterial = new THREE.LineBasicMaterial({ color: 0xEAE6FE });
//     //             const points = nodes.map(node => new THREE.Vector3(node.position.x, node.position.y, 0));
//     //             const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//     //             const line = new THREE.Line(lineGeometry, lineMaterial);
//     //             scene.add(line);
//     //
//     //             // Animation
//     //             function animate() {
//     //                 requestAnimationFrame(animate);
//     //                 nodes.forEach((node, i) => {
//     //                     node.position.y = Math.sin(Date.now() * 0.001 + i) * 1.5;
//     //                 });
//     //
//     //                 // Update line
//     //                 const updatedPoints = nodes.map(node => new THREE.Vector3(node.position.x, node.position.y, 0));
//     //                 line.geometry.setFromPoints(updatedPoints);
//     //
//     //                 renderer.render(scene, camera);
//     //             }
//     //             animate();
//     //
//     //             // Handle resize
//     //             window.addEventListener('resize', () => {
//     //                 camera.aspect = container.offsetWidth / container.offsetHeight;
//     //                 camera.updateProjectionMatrix();
//     //                 renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //             });
//     //         }
//     //     } catch (e) {
//     //         console.error('Error initializing experience section:', e);
//     //     }
//     // }
//
//     // 6. Certificates Section - 3D Gallery Wall
//     function initCertificates3D() {
//         const certificatesSection = document.getElementById('certificates'); // Changed from 'blog' to 'certificates'
//         if (!certificatesSection) return;
//
//         const container = certificatesSection.querySelector('.certificates-3d-container');
//         if (!container) return;
//
//         try {
//             const scene = new THREE.Scene();
//             const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
//             const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//             renderer.setSize(container.offsetWidth, container.offsetHeight);
//             container.appendChild(renderer.domElement);
//
//             camera.position.z = 15;
//
//             // Create certificate frames
//             const certificates = [];
//             const certificateGeometry = new THREE.PlaneGeometry(2, 2.5);
//
//             // Get all certificate images from the HTML
//             const certificateImages = [];
//             const certificateCards = document.querySelectorAll('.certificate-card img');
//             certificateCards.forEach(card => {
//                 certificateImages.push(card.src);
//             });
//
//             // Arrange in a grid
//             const gridSize = 4; // Matches the lg:grid-cols-4 in HTML
//             const spacing = 3;
//
//             certificateImages.forEach((imgSrc, i) => {
//                 const row = Math.floor(i / gridSize);
//                 const col = i % gridSize;
//
//                 const material = new THREE.MeshBasicMaterial({
//                     map: new THREE.TextureLoader().load(imgSrc),
//                     side: THREE.DoubleSide,
//                     transparent: true,
//                     opacity: 0.9
//                 });
//
//                 const certificate = new THREE.Mesh(certificateGeometry, material);
//                 certificate.position.x = (col - (gridSize - 1) / 2) * spacing;
//                 certificate.position.y = -(row - (Math.ceil(certificateImages.length / gridSize) / 2)) * spacing;
//                 certificate.position.z = -5;
//
//                 scene.add(certificate);
//                 certificates.push(certificate);
//             });
//
//             // Add lighting
//             const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//             scene.add(ambientLight);
//             const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//             directionalLight.position.set(1, 1, 1);
//             scene.add(directionalLight);
//
//             // Animation - slight floating effect
//             function animate() {
//                 requestAnimationFrame(animate);
//
//                 certificates.forEach((cert, i) => {
//                     cert.rotation.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
//                     cert.position.z = -5 + Math.cos(Date.now() * 0.001 + i) * 0.5;
//                 });
//
//                 renderer.render(scene, camera);
//             }
//             animate();
//
//             // Resize handler
//             window.addEventListener('resize', () => {
//                 camera.aspect = container.offsetWidth / container.offsetHeight;
//                 camera.updateProjectionMatrix();
//                 renderer.setSize(container.offsetWidth, container.offsetHeight);
//             });
//         } catch (e) {
//             console.error('Error in certificates 3D:', e);
//         }
//     }
//
// // Initialize when DOM is loaded
//     document.addEventListener('DOMContentLoaded', function() {
//         initCertificates3D();
//     });
//
//     // 7. Blog Section - 3D Post Cards
//     // function initBlog3D() {
//     //     const blogItems = document.querySelectorAll('.post-item');
//     //     if (!blogItems.length) return;
//     //
//     //     blogItems.forEach(item => {
//     //         const container = item.querySelector('.blog-3d-container');
//     //         if (!container) return;
//     //
//     //         try {
//     //             const scene = new THREE.Scene();
//     //             const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     //             const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     //             renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //             container.appendChild(renderer.domElement);
//     //
//     //             camera.position.z = 5;
//     //
//     //             const imgSrc = item.querySelector('img')?.src;
//     //             if (!imgSrc) return;
//     //
//     //             const cardGeometry = new THREE.BoxGeometry(2, 3, 0.2);
//     //             const cardMaterials = [
//     //                 new THREE.MeshBasicMaterial({
//     //                     map: new THREE.TextureLoader().load(imgSrc),
//     //                     transparent: true,
//     //                     opacity: 0.9
//     //                 }),
//     //                 new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
//     //                 new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
//     //                 new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
//     //                 new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
//     //                 new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })
//     //             ];
//     //
//     //             const card = new THREE.Mesh(cardGeometry, cardMaterials);
//     //             scene.add(card);
//     //
//     //             // Add lighting
//     //             const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     //             scene.add(ambientLight);
//     //             const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     //             directionalLight.position.set(1, 1, 1);
//     //             scene.add(directionalLight);
//     //
//     //             // Hover animation
//     //             item.addEventListener('mouseenter', () => {
//     //                 gsap.to(card.rotation, {
//     //                     x: 0.2,
//     //                     y: 0.2,
//     //                     duration: 0.5,
//     //                     ease: "power2.out"
//     //                 });
//     //                 gsap.to(card.position, {
//     //                     z: 0.5,
//     //                     duration: 0.5,
//     //                     ease: "power2.out"
//     //                 });
//     //             });
//     //
//     //             item.addEventListener('mouseleave', () => {
//     //                 gsap.to(card.rotation, {
//     //                     x: 0,
//     //                     y: 0,
//     //                     duration: 0.5,
//     //                     ease: "power2.out"
//     //                 });
//     //                 gsap.to(card.position, {
//     //                     z: 0,
//     //                     duration: 0.5,
//     //                     ease: "power2.out"
//     //                 });
//     //             });
//     //
//     //             // Animation loop
//     //             function animate() {
//     //                 requestAnimationFrame(animate);
//     //                 renderer.render(scene, camera);
//     //             }
//     //             animate();
//     //         } catch (e) {
//     //             console.error('Error in blog item 3D:', e);
//     //         }
//     //     });
//     // }
//
//     // 8. Contact Section - 3D Form with Floating Elements
//     // function initContact3D() {
//     //     const contactSection = document.getElementById('contact');
//     //     if (!contactSection) return;
//     //
//     //     const container = contactSection.querySelector('.contact-3d-container');
//     //     if (!container) return;
//     //
//     //     try {
//     //         const scene = new THREE.Scene();
//     //         const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
//     //         const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     //         renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //         container.appendChild(renderer.domElement);
//     //
//     //         camera.position.z = 10;
//     //
//     //         // Create floating form elements
//     //         const formElements = [];
//     //         const geometries = [
//     //             new THREE.BoxGeometry(1, 0.2, 1),   // Name field
//     //             new THREE.BoxGeometry(1, 0.2, 1),   // Email field
//     //             new THREE.BoxGeometry(1.5, 0.2, 1), // Message field
//     //             new THREE.SphereGeometry(0.3)       // Submit button
//     //         ];
//     //
//     //         const materials = [
//     //             new THREE.MeshBasicMaterial({ color: 0x7E74F1, transparent: true, opacity: 0.8 }),
//     //             new THREE.MeshBasicMaterial({ color: 0x5A4FCF, transparent: true, opacity: 0.8 }),
//     //             new THREE.MeshBasicMaterial({ color: 0x3D34B0, transparent: true, opacity: 0.8 }),
//     //             new THREE.MeshBasicMaterial({ color: 0xEAE6FE, transparent: true, opacity: 0.8 })
//     //         ];
//     //
//     //         geometries.forEach((geometry, i) => {
//     //             const element = new THREE.Mesh(geometry, materials[i]);
//     //             element.position.y = 2 - i * 1.5;
//     //             element.position.x = (i % 2 === 0) ? -1.5 : 1.5;
//     //             scene.add(element);
//     //             formElements.push(element);
//     //         });
//     //
//     //         // Add lighting
//     //         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     //         scene.add(ambientLight);
//     //         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     //         directionalLight.position.set(1, 1, 1);
//     //         scene.add(directionalLight);
//     //
//     //         // Animation
//     //         function animate() {
//     //             requestAnimationFrame(animate);
//     //
//     //             formElements.forEach((element, i) => {
//     //                 element.rotation.x += 0.01;
//     //                 element.rotation.y += 0.01;
//     //                 element.position.y = 2 - i * 1.5 + Math.sin(Date.now() * 0.001 + i) * 0.1;
//     //             });
//     //
//     //             renderer.render(scene, camera);
//     //         }
//     //         animate();
//     //
//     //         // Resize handler
//     //         window.addEventListener('resize', () => {
//     //             camera.aspect = container.offsetWidth / container.offsetHeight;
//     //             camera.updateProjectionMatrix();
//     //             renderer.setSize(container.offsetWidth, container.offsetHeight);
//     //         });
//     //     } catch (e) {
//     //         console.error('Error in contact 3D:', e);
//     //     }
//     // }
});