// document.addEventListener("DOMContentLoaded", function (event) {
//     // Dark theme
//     const prevActiveTheme = localStorage.getItem("theme-color");
//     document.documentElement.setAttribute("data-theme", prevActiveTheme ? prevActiveTheme : "light");
//     const themeToggle = document.getElementsByClassName('theme-color-toggle')[0];
//     themeToggle.onclick = function () {
//         const currentTheme = document.documentElement.getAttribute("data-theme");
//         const switchToTheme = currentTheme === "dark" ? "light" : "dark";
//         localStorage.setItem("theme-color", switchToTheme)
//         document.documentElement.setAttribute("data-theme", switchToTheme);
//     }
//     // AOS
//     AOS.init({
//         once: true,
//         offset: 10,
//         duration: 600,
//         easing: 'cubic-bezier(0.42, 0, 0.12, 1.28)'
//     });
//     // kursor
//      new kursor({
//          type: 4,
//          color: '#7E74F1'
//      });
//     // SVG Sprite Support
//     svg4everybody();
//     // CSS Var support
//     cssVars({});
//     // Sticky Menu
//     const menu = document.getElementsByClassName("header")[0];
//     if (window.pageYOffset >= 32) { // fix middle load page issue
//         menu.classList.add('sticky');
//     }
//     let lastScroll = 0;
//     window.addEventListener("scroll", function () {
//         const currentScroll = window.pageYOffset;
//         if (currentScroll <= 32) {
//             menu.classList.remove('sticky');
//             return;
//         } else {
//             menu.classList.add('sticky');
//         }
//         lastScroll = currentScroll;
//     });
//     // Smooth scroll
//     document.querySelectorAll('.header .nav .nav-links a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             e.preventDefault();
//             document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth',
//                 block: "start"
//             });
//         });
//     });
//     // Active section
//     const sections = document.querySelectorAll("section");
//     const navLi = document.querySelectorAll(".header .nav .nav-links li");
//     window.onscroll = function () {
//         let current = "";
//         sections.forEach((section) => {
//             const sectionTop = section.offsetTop;
//             if (pageYOffset >= sectionTop - 282) {
//                 current = section.getAttribute("id");
//             }
//         });
//         navLi.forEach((li) => {
//             li.classList.remove("active");
//             if (li.classList.contains(current)) {
//                 li.classList.add("active");
//             }
//         });
//     };
//     // Back to top
//     const trigger = document.getElementsByClassName('logo')[0];
//     trigger.onclick = function () {
//         window.scrollTo({top: 0, behavior: 'smooth'});
//     }
//     // Mobile menu
//     const mobileMenuToggle = document.getElementsByClassName('mobile-menu-toggle')[0];
//     mobileMenuToggle.onclick = function () {
//         document.querySelector(".header .nav .nav-links").classList.toggle('active');
//     }
//     // Portfolio slider
//     const numberOfSlides = document.querySelectorAll('.swiper-slide').length;
//     new Swiper('.swiper', {
//         loop: false,
//         allowSlidePrev: numberOfSlides !== 1,
//         allowSlideNext: numberOfSlides !== 1,
//         breakpoints: {
//             0: {
//                 slidesPerView: 1,
//                 spaceBetween: 16,
//             },
//             769: {
//                 slidesPerView: 2,
//                 spaceBetween: 32,
//             },
//             1151: {
//                 slidesPerView: 3,
//                 spaceBetween: 56,
//             },
//         },
//         navigation: {
//             nextEl: '.slider-navigation .next',
//             prevEl: '.slider-navigation .prev',
//         },
//     });
//     // Experiences
//     document.querySelector(".experience-section .companies-list").addEventListener('click', function (e) {
//         e.preventDefault();
//         if (e.target.tagName === 'LI') {
//           window.innerWidth > 992 ? document.querySelector(".experience-section .selector").style.top = e.target.offsetTop + 'px' : null;
//             document.querySelector(".experience-section .companies-list li.active").classList.remove('active')
//             e.target.classList.add('active');
//             const targetTab = e.target.getAttribute('data-tab');
//             if (targetTab) {
//                 document.querySelector(".experience-section .content.active").classList.remove('active')
//                 document.getElementById(targetTab).classList.add('active')
//             }
//         }
//     });
//     // Skill
//     const bars = document.querySelectorAll(".progress-bar .main-bar .fill");
//     window.addEventListener('scroll', function () {
//         if (isInViewport(document.getElementsByClassName('progress-bar-wrapper')[0])) {
//             bars.forEach(item => {
//                 if (isInViewport(item)) {
//                     item.style.width = item.getAttribute('data-width') + '%';
//                 }
//             })
//         }
//     });

//     function isInViewport(el) {
//         const rect = el.getBoundingClientRect();
//         return (
//             rect.top >= 0 &&
//             rect.left >= 0 &&
//             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//             rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//         );
//     }

//     // Contact Form
//     function validateForm() {
//         if (document.contactForm.name.value == '') {
//             document.querySelector('.validation-error.name').classList.add('active')
//             document.contactForm.name.focus();
//             return false;
//         } else {
//             document.querySelector('.validation-error.name').classList.remove('active')
//         }
//         const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
//         if (document.contactForm.email.value == '' || !document.contactForm.email.value.match(emailRegex)) {
//             document.querySelector('.validation-error.email').classList.add('active')
//             document.contactForm.email.focus();
//             return false;
//         } else {
//             document.querySelector('.validation-error.email').classList.remove('active')
//         }
//         if (document.contactForm.message.value == '') {
//             document.querySelector('.validation-error.message').classList.add('active')
//             document.contactForm.message.focus();
//             return false;
//         } else {
//             document.querySelector('.validation-error.message').classList.remove('active')
//         }
//         return true;
//     }
//     document.contactForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         if (validateForm()) {
//             const formElements = document.contactForm.elements;
//             const formData = {};
//             for (let i = 0; i < formElements.length; i++) {
//                 if (formElements[i].name && formElements[i].value) {
//                     formData[formElements[i].name] = formElements[i].value
//                 }
//             }
//             const raw = JSON.stringify(formData);
//             const requestOptions = {
//                 method: 'POST',
//                 body: raw,
//                 redirect: 'follow'
//             };
//             document.getElementsByClassName("submit-btn")[0].classList.add('show-loading');
//             fetch("https://contact-form.szrolxszn.workers.dev/", requestOptions)
//                 .then(response => response.text())
//                 .then(result => {
//                     document.getElementsByClassName("submit-btn")[0].classList.remove('show-loading')
//                     document.getElementsByClassName('success-submit-message')[0].classList.add('active')
//                     document.contactForm.reset();
//                     setTimeout(function () {
//                         document.getElementsByClassName('success-submit-message')[0].classList.remove('active')
//                     }, 4000)
//                 })
//                 .catch(error => {
//                     document.getElementsByClassName("submit-btn")[0].classList.remove('show-loading')
//                     document.getElementsByClassName('fail-submit-message')[0].classList.add('active');
//                     setTimeout(function () {
//                         document.getElementsByClassName('fail-submit-message')[0].classList.remove('active')
//                     }, 4000)
//                 });
//         }
//     })
//     document.contactForm.addEventListener('change', function (e) {
//         e.preventDefault();
//         document.querySelectorAll('.validation-error').forEach(function (el) {
//             el.classList.remove('active')
//         })
//     })
//     // Copyright
//     const currentYear = new Date().getFullYear();
//     const copyrightText = document.querySelector(".footer .copyright .year").innerHTML;
//     document.querySelector(".footer .copyright .year").innerHTML = copyrightText.replace('year', currentYear);



// //Typed js

// const typed=new Typed('.Multiple-Text',{
//     strings:['Web Designer','Web Developer','Blogger'],
//      typeSpeed:100,
//      backSpeed:100,
//      backDelay:1000,
//      loop:true
      
     
// });


document.addEventListener("DOMContentLoaded", function (event) {
    // Dark theme
    const prevActiveTheme = localStorage.getItem("theme-color");
    document.documentElement.setAttribute("data-theme", prevActiveTheme ? prevActiveTheme : "light");
    const themeToggle = document.getElementsByClassName('theme-color-toggle')[0];
    themeToggle.onclick = function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const switchToTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme-color", switchToTheme)
        document.documentElement.setAttribute("data-theme", switchToTheme);
    }
    // AOS
    AOS.init({
        once: true,
        offset: 10,
        duration: 600,
        easing: 'cubic-bezier(0.42, 0, 0.12, 1.28)'
    });
    // kursor
    new kursor({
        type: 4,
        color: '#7E74F1'
    });
    // SVG Sprite Support
    svg4everybody();
    // CSS Var support
    cssVars({});
    // Sticky Menu
    const menu = document.getElementsByClassName("header")[0];
    if (window.pageYOffset >= 32) { // fix middle load page issue
        menu.classList.add('sticky');
    }
    let lastScroll = 0;
    window.addEventListener("scroll", function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 32) {
            menu.classList.remove('sticky');
            return;
        } else {
            menu.classList.add('sticky');
        }
        lastScroll = currentScroll;
    });
    // Smooth scroll
    document.querySelectorAll('.header .nav .nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        });
    });
    // Active section
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll(".header .nav .nav-links li");
    window.onscroll = function () {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 282) {
                current = section.getAttribute("id");
            }
        });
        navLi.forEach((li) => {
            li.classList.remove("active");
            if (li.classList.contains(current)) {
                li.classList.add("active");
            }
        });
    };
    // Back to top
    const trigger = document.getElementsByClassName('logo')[0];
    trigger.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Mobile menu
    const mobileMenuToggle = document.getElementsByClassName('mobile-menu-toggle')[0];
    mobileMenuToggle.onclick = function () {
        document.querySelector(".header .nav .nav-links").classList.toggle('active');
    }
    // Portfolio slider
    const numberOfSlides = document.querySelectorAll('.swiper-slide').length;
    new Swiper('.swiper', {
        loop: false,
        allowSlidePrev: numberOfSlides !== 1,
        allowSlideNext: numberOfSlides !== 1,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
            1151: {
                slidesPerView: 3,
                spaceBetween: 56,
            },
        },
        navigation: {
            nextEl: '.slider-navigation .next',
            prevEl: '.slider-navigation .prev',
        },
    });
    // Experiences
    document.querySelector(".experience-section .companies-list").addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'LI') {
            window.innerWidth > 992 ? document.querySelector(".experience-section .selector").style.top = e.target.offsetTop + 'px' : null;
            document.querySelector(".experience-section .companies-list li.active").classList.remove('active')
            e.target.classList.add('active');
            const targetTab = e.target.getAttribute('data-tab');
            if (targetTab) {
                document.querySelector(".experience-section .content.active").classList.remove('active')
                document.getElementById(targetTab).classList.add('active')
            }
        }
    });
    // Skill
    const bars = document.querySelectorAll(".progress-bar .main-bar .fill");
    window.addEventListener('scroll', function () {
        if (isInViewport(document.getElementsByClassName('progress-bar-wrapper')[0])) {
            bars.forEach(item => {
                if (isInViewport(item)) {
                    item.style.width = item.getAttribute('data-width') + '%';
                }
            })
        }
    });

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Contact Form
    function validateForm() {
        if (document.contactForm.name.value == '') {
            document.querySelector('.validation-error.name').classList.add('active')
            document.contactForm.name.focus();
            return false;
        } else {
            document.querySelector('.validation-error.name').classList.remove('active')
        }
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (document.contactForm.email.value == '' || !document.contactForm.email.value.match(emailRegex)) {
            document.querySelector('.validation-error.email').classList.add('active')
            document.contactForm.email.focus();
            return false;
        } else {
            document.querySelector('.validation-error.email').classList.remove('active')
        }
        if (document.contactForm.message.value == '') {
            document.querySelector('.validation-error.message').classList.add('active')
            document.contactForm.message.focus();
            return false;
        } else {
            document.querySelector('.validation-error.message').classList.remove('active')
        }
        return true;
    }
    document.contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            const formElements = document.contactForm.elements;
            const formData = {};
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].name && formElements[i].value) {
                    formData[formElements[i].name] = formElements[i].value
                }
            }
            const raw = JSON.stringify(formData);
            const requestOptions = {
                method: 'POST',
                body: raw,
                redirect: 'follow'
            };
            document.getElementsByClassName("submit-btn")[0].classList.add('show-loading');
            fetch("https://contact-form.szrolxszn.workers.dev/", requestOptions)
                .then(response => response.text())
                .then(result => {
                    document.getElementsByClassName("submit-btn")[0].classList.remove('show-loading')
                    document.getElementsByClassName('success-submit-message')[0].classList.add('active')
                    document.contactForm.reset();
                    setTimeout(function () {
                        document.getElementsByClassName('success-submit-message')[0].classList.remove('active')
                    }, 4000)
                })
                .catch(error => {
                    document.getElementsByClassName("submit-btn")[0].classList.remove('show-loading')
                    document.getElementsByClassName('fail-submit-message')[0].classList.add('active');
                    setTimeout(function () {
                        document.getElementsByClassName('fail-submit-message')[0].classList.remove('active')
                    }, 4000)
                });
        }
    })
    document.contactForm.addEventListener('change', function (e) {
        e.preventDefault();
        document.querySelectorAll('.validation-error').forEach(function (el) {
            el.classList.remove('active')
        })
    })
    // Copyright
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector(".footer .copyright .year").innerHTML;
    document.querySelector(".footer .copyright .year").innerHTML = copyrightText.replace('year', currentYear);

});

