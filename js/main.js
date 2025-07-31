/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: miller.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        animationSelector: '[class="mil-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    // Helper functions to safely run GSAP animations only if targets exist
    function safeGsapTo(selector, options) {
        const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
        if (elements && elements.length > 0) {
            gsap.to(elements, options);
        }
    }
    function safeGsapFromTo(selector, fromOptions, toOptions) {
        const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
        if (elements && elements.length > 0) {
            gsap.fromTo(elements, fromOptions, toOptions);
        }
    }

    // Preloader timeline (defensive)
    var timeline = gsap.timeline();
    if (document.querySelector('.mil-preloader-animation')) {
        timeline.to('.mil-preloader-animation', { opacity: 1 });
    }
    if (document.querySelector('.mil-animation-1 .mil-h3')) {
        timeline.fromTo(
            '.mil-animation-1 .mil-h3',
            { y: '30px', opacity: 0 },
            { y: '0px', opacity: 1, stagger: 0.4 }
        );
        timeline.to('.mil-animation-1 .mil-h3', { opacity: 0, y: '-30' }, '+=.3');
    }
    if (document.querySelector('.mil-reveal-box')) {
        timeline.fromTo('.mil-reveal-box', 0.1, { opacity: 0 }, { opacity: 1, x: '-30' });
        timeline.to('.mil-reveal-box', 0.45, { width: '100%', x: 0 }, '+=.1');
        timeline.to('.mil-reveal-box', { right: '0' });
        timeline.to('.mil-reveal-box', 0.3, { width: '0%' });
    }
    if (document.querySelector('.mil-animation-2 .mil-h3')) {
        timeline.fromTo('.mil-animation-2 .mil-h3', { opacity: 0 }, { opacity: 1 }, '-=.5');
        timeline.to('.mil-animation-2 .mil-h3', 0.6, { opacity: 0, y: '-30' }, '+=.5');
    }
    if (document.querySelector('.mil-preloader')) {
        timeline.to('.mil-preloader', 0.8, { opacity: 0, ease: 'sine' }, '+=.2');
    }
    if (document.querySelector('.mil-up')) {
        timeline.fromTo(
            '.mil-up',
            0.8,
            { opacity: 0, y: 40, scale: 0.98, ease: 'sine' },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                onComplete: function () {
                    $('.mil-preloader').addClass('mil-hidden');
                },
            },
            '-=1'
        );
    }
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        var href = $(this).attr('href');
        // Ignore if href is exactly "#"
        if (href === "#") {
            return;
        }
        event.preventDefault();
        var target = $(href);
        var offset = 0;
        if ($(window).width() < 1200) {
            offset = 90;
        }
        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    function appendMilElements() {
        // Remove previous clones to prevent duplication
        $(".mil-arrow-place .mil-arrow").remove();
        $(".mil-animation .mil-dodecahedron").remove();
        $(".mil-lines-place .mil-lines").remove();
        $(".mil-current-page a").remove();
        // Append fresh clones
        $(".mil-arrow").clone().appendTo(".mil-arrow-place");
        $(".mil-dodecahedron").clone().appendTo(".mil-animation");
        $(".mil-lines").clone().appendTo(".mil-lines-place");
        $(".mil-main-menu ul li.mil-active > a").clone().appendTo(".mil-current-page");
    }

    $(document).ready(function () {
        appendMilElements();
    });

    document.addEventListener('swup:contentReplaced', function () {
        appendMilElements();
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let box = element.querySelector(".mil-accordion-content");
        let symbol = element.querySelector(".mil-symbol");
        let minusElement = element.querySelector(".mil-minus");
        let plusElement = element.querySelector(".mil-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".mil-back-to-top .mil-link");

    if (btt) {
        gsap.set(btt, {
            x: -30,
            opacity: 0,
        });
        safeGsapTo(btt, {
            x: 0,
            opacity: 1,
            ease: 'sine',
            scrollTrigger: {
                trigger: "body",
                start: "top -40%",
                end: "top -40%",
                toggleActions: "play none reverse none"
            }
        });
    }
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.mil-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.mil-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('mil-accent');
    });

    $('.mil-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('mil-accent');
    });

    $('.mil-drag').mouseover(function () {
        gsap.to($('.mil-ball .mil-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-drag').mouseleave(function () {
        gsap.to($('.mil-ball .mil-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.mil-more').mouseover(function () {
        gsap.to($('.mil-ball .mil-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-more').mouseleave(function () {
        gsap.to($('.mil-ball .mil-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.mil-choose').mouseover(function () {
        gsap.to($('.mil-ball .mil-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.mil-choose').mouseleave(function () {
        gsap.to($('.mil-ball .mil-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.mil-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.mil-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.mil-menu-btn').on("click", function () {
        $('.mil-menu-btn').toggleClass('mil-active');
        $('.mil-menu').toggleClass('mil-active');
        $('.mil-menu-frame').toggleClass('mil-active');
    });

    // Use event delegation for all links inside the menu
    $(document).on('click', '.mil-menu a', function () {
        $('.mil-menu-btn').removeClass('mil-active');
        $('.mil-menu').removeClass('mil-active');
        $('.mil-menu-frame').removeClass('mil-active');
    });
    /***************************

    main menu

    ***************************/
    $('.mil-has-children a').on('click', function () {
        $('.mil-has-children ul').removeClass('mil-active');
        $('.mil-has-children a').removeClass('mil-active');
        $(this).toggleClass('mil-active');
        $(this).next().toggleClass('mil-active');
    });
    /***************************

    progressbar

    ***************************/
    safeGsapTo('.mil-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
        safeGsapFromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".mil-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        safeGsapFromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".mil-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            safeGsapFromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        safeGsapFromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>']
    var mySwiper = new Swiper('.mil-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.mil-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.mil-revi-next',
            prevEl: '.mil-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.mil-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.mil-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.mil-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.mil-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        safeGsapTo('.mil-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.mil-menu-btn').removeClass('mil-active');
        $('.mil-menu').removeClass('mil-active');
        $('.mil-menu-frame').removeClass('mil-active');

        // No need to re-bind menu link click handler due to event delegation
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".mil-arrow-place .mil-arrow, .mil-animation .mil-dodecahedron, .mil-current-page a").remove();
            $(".mil-arrow").clone().appendTo(".mil-arrow-place");
            $(".mil-dodecahedron").clone().appendTo(".mil-animation");
            $(".mil-lines").clone().appendTo(".mil-lines-place");
            $(".mil-main-menu ul li.mil-active > a").clone().appendTo(".mil-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let box = element.querySelector(".mil-accordion-content");
            let symbol = element.querySelector(".mil-symbol");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.mil-drag, .mil-more, .mil-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.mil-drag, .mil-more, .mil-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.mil-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('mil-accent');
        });

        $('.mil-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('mil-accent');
        });

        $('.mil-drag').mouseover(function () {
            gsap.to($('.mil-ball .mil-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-drag').mouseleave(function () {
            gsap.to($('.mil-ball .mil-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.mil-more').mouseover(function () {
            gsap.to($('.mil-ball .mil-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-more').mouseleave(function () {
            gsap.to($('.mil-ball .mil-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.mil-choose').mouseover(function () {
            gsap.to($('.mil-ball .mil-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.mil-choose').mouseleave(function () {
            gsap.to($('.mil-ball .mil-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input , textarea, .mil-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.mil-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".mil-choose , .mil-more , .mil-drag , .mil-accent-cursor"), input, textarea, .mil-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.mil-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.mil-has-children a').on('click', function () {
            $('.mil-has-children ul').removeClass('mil-active');
            $('.mil-has-children a').removeClass('mil-active');
            $(this).toggleClass('mil-active');
            $(this).next().toggleClass('mil-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".mil-up");

        appearance.forEach((section) => {
            safeGsapFromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".mil-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            safeGsapFromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".mil-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                safeGsapFromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".mil-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            safeGsapFromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>']
        var mySwiper = new Swiper('.mil-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.mil-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.mil-revi-next',
                prevEl: '.mil-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.mil-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.mil-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.mil-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.mil-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

    /***************************

    Comprehensive dropdown functionality for all pages

    ***************************/
    
    // Menu toggle for mobile
    $('.menu-toggle').on('click', function() {
        $('.header-bar nav').toggleClass('open');
    });

    // Dropdown toggle functionality
    $('.dropdown-toggle').on('click', function(e) {
        if ($(window).width() <= 900) {
            e.preventDefault();
            var $dropdown = $(this).closest('.dropdown');
            
            // Close other dropdowns
            $('.dropdown').not($dropdown).removeClass('open').removeClass('show');
            
            // Toggle current dropdown
            $dropdown.toggleClass('open').toggleClass('show');
        }
    });


    $(document).on('click', '.header-bar nav a', function (e) {
        const href = $(this).attr('href');
        
        // Prevent default to allow menu to close first
        if (href && href !== '#') {
            e.preventDefault();
            $('.header-bar nav').removeClass('open');
            $('.dropdown').removeClass('open show');
    
            // Delay navigation slightly to allow classes to be removed
            setTimeout(() => {
                window.location.href = href;
            }, 100); // You can adjust this delay if needed
        }
    });
    
    
   
    // Mega menu category switching
    $('.mega-menu-categories li').on('click', function() {
        var category = $(this).data('category');
        var $megaMenu = $(this).closest('.mega-menu');
        
        // Update active category
        $megaMenu.find('.mega-menu-categories li').removeClass('active');
        $(this).addClass('active');
        
        // Show corresponding panel
        $megaMenu.find('.mega-menu-panel').removeClass('active');
        $megaMenu.find('.mega-menu-panel[data-category="' + category + '"]').addClass('active');
    });

    // Show first panel by default for mega menus
    $('.mega-menu').each(function() {
        var $firstCategory = $(this).find('.mega-menu-categories li').first();
        var $firstPanel = $(this).find('.mega-menu-panel').first();
        
        if ($firstCategory.length && $firstPanel.length) {
            $firstCategory.addClass('active');
            $firstPanel.addClass('active');
        }
    });

    // Mega menu hover: show panel on hover (desktop only)
    function setupMegaMenuHover() {
      if (window.innerWidth > 900) {
        $('.mega-menu-categories li').off('mouseenter').on('mouseenter', function () {
          var category = $(this).data('category');
          var $megaMenu = $(this).closest('.mega-menu');
          // Update active category
          $megaMenu.find('.mega-menu-categories li').removeClass('active');
          $(this).addClass('active');
          // Show corresponding panel
          $megaMenu.find('.mega-menu-panel').removeClass('active');
          $megaMenu.find('.mega-menu-panel[data-category="' + category + '"]').addClass('active');
        });
      } else {
        // On mobile, remove hover handler
        $('.mega-menu-categories li').off('mouseenter');
      }
    }

    $(document).ready(setupMegaMenuHover);
    document.addEventListener('swup:contentReplaced', setupMegaMenuHover);
    $(window).on('resize', setupMegaMenuHover);

    // Animate Arkub tech sections on scroll
    const techRows = document.querySelectorAll('.arkub-tech-row');
    if (techRows.length > 0) {
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });
        techRows.forEach(row => observer.observe(row));
    }

    // 3D tilt effect for icons (only if elements exist)
    const icon3dEls = document.querySelectorAll('.immersive-feature-icon-3d');
    if (icon3dEls.length > 0) {
        document.querySelectorAll('.immersive-feature-img-wrap').forEach((wrap, idx) => {
            wrap.addEventListener('mousemove', (e) => {
                const icon = wrap.querySelector('.immersive-feature-icon-3d');
                if (!icon) return;
                const rect = wrap.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const dx = (x - cx) / cx;
                const dy = (y - cy) / cy;
                icon.style.transform = `translateX(-50%) scale(1.12) rotateX(${dy * 16}deg) rotateY(${-dx * 16}deg)`;
                icon.style.animation = 'none';
            });
            wrap.addEventListener('mouseleave', (e) => {
                const icon = wrap.querySelector('.immersive-feature-icon-3d');
                if (!icon) return;
                icon.style.transform = '';
                icon.style.animation = '';
            });
        });
    }

    // Metaverse floating particles animation (only if canvas exists)
    const canvas = document.getElementById('metaverse-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const colors = ['#8f5cff', '#00fff0', '#fff', '#6441a5'];
        
        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = 6 + Math.random() * 10;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = 0.2 + Math.random() * 0.4;
            this.angle = Math.random() * Math.PI * 2;
        }
        
        function createParticles(num) {
            particles = [];
            for (let i = 0; i < num; i++) {
                particles.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let p of particles) {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
                p.angle += (Math.random() - 0.5) * 0.01;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color + '88';
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', () => {
            resize();
            createParticles(18);
        });
        resize();
        createParticles(18);
        animate();
    }

    // Parallax effect for background layers (only if elements exist)
    const section = document.querySelector('.parallax-section');
    const layers = document.querySelectorAll('.parallax-layer');
    if (section && layers.length) {
        section.addEventListener('mousemove', function(e) {
            const rect = section.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            layers.forEach((layer, i) => {
                const depth = (i + 1) * 10;
                layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
            });
        });
        section.addEventListener('mouseleave', function() {
            layers.forEach(layer => {
                layer.style.transform = '';
            });
        });
    }

    // Interactive card expansion (click for mobile, hover for desktop handled by CSS)
    document.querySelectorAll('.expandable-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
                card.classList.toggle('expanded');
            }
        });
    });

    // Parallax effect for timeline images (only if elements exist)
    const timelineTrack = document.querySelector('.immersive-timeline-track');
    if (timelineTrack) {
        timelineTrack.addEventListener('mousemove', function(e) {
            document.querySelectorAll('.parallax-timeline-img').forEach(img => {
                const rect = img.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                img.style.transform = `scale(1.08) translate(${x*12}px, ${y*8}px)`;
            });
        });
        timelineTrack.addEventListener('mouseleave', function() {
            document.querySelectorAll('.parallax-timeline-img').forEach(img => {
                img.style.transform = '';
            });
        });
    }

    // Desktop hover: open dropdown on hover, close on mouseleave
    if (window.innerWidth > 900) {
        let dropdownTimeout;
      
        $('.header-bar .dropdown').each(function() {
          const $dropdown = $(this);
      
          $dropdown.on('mouseenter', function() {
            clearTimeout(dropdownTimeout); // cancel any close timeout
            
            // Close all other dropdowns first
            $('.header-bar .dropdown').not($dropdown).removeClass('open');
            
            $dropdown.addClass('open');
          });
      
          $dropdown.on('mouseleave', function() {
            // Delay closing to give the user time to interact with the menu
            dropdownTimeout = setTimeout(() => {
              $dropdown.removeClass('open');
            }, 300); // Adjust delay as needed
          });
      
          // Keep dropdown open while hovering inside the mega menu
          $dropdown.find('.mega-menu').on('mouseenter', function () {
            clearTimeout(dropdownTimeout);
          });
      
          $dropdown.find('.mega-menu').on('mouseleave', function () {
            dropdownTimeout = setTimeout(() => {
              $dropdown.removeClass('open');
            }, 300);
          });
      
          // Close dropdown ONLY after clicking a mega-menu category
          $dropdown.find('.mega-menu-categories li').on('click', function () {
            $dropdown.removeClass('open');
          });
        });
      }
});

// Mindmap Section Animation
(function() {
    document.addEventListener("DOMContentLoaded", function() {
      function revealMindmap() {
        var el = document.querySelector('.mindmap-flex');
        if (!el) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
          el.querySelectorAll('.mindmap-col, .mindmap-center').forEach(function(child, i) {
            setTimeout(() => child.classList.add('visible'), 100 + i * 150);
          });
          window.removeEventListener('scroll', revealMindmap);
        }
      }
      document.querySelectorAll('.mindmap-flex, .mindmap-col, .mindmap-center').forEach(function(el) {
        el.classList.add('mindmap-animate');
      });
      window.addEventListener('scroll', revealMindmap);
      revealMindmap();
    });
  })();
  
  
  // Parallax/scroll animation for mindmap section
  (function() {
    var section = document.querySelector('.parallax-animate');
    var left = document.querySelector('.slide-in-left');
    var right = document.querySelector('.slide-in-right');
    // var circle = document.querySelector('.circle-rotate'); // No longer needed
    var animated = false;
    function animateParallax() {
      if (!section || !left || !right) return;
      var rect = section.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        // Animate in left/right columns
        left.classList.add('visible');
        right.classList.add('visible');
        // No circle rotation
        animated = true;
      } else if (animated) {
        // Reset if out of view
        left.classList.remove('visible');
        right.classList.remove('visible');
        // No circle rotation
        animated = false;
      }
    }
    window.addEventListener('scroll', animateParallax);
    animateParallax();
  })();

//   form section
emailjs.init("LsKNt382V8Rfdzzb4");

        const form = document.getElementById('contactForm');
        const errorMessage = document.getElementById('errorMessage');

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        function hideError() {
            errorMessage.style.display = 'none';
        }

        function showToast(message, type = 'success') {
            Toastify({
                text: message,
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: type === 'success' ? "#10b981" : "#ef4444",
                stopOnFocus: true,
            }).showToast();
        }

        function resetForm() {
            form.reset();
            hideError();
        }

        async function handleSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                projectName: formData.get('projectName'),
                mobile: formData.get('mobile'),
                message: formData.get('message')
            };

            // Validation
            if (!data.fullName || !data.email || !data.projectName || !data.mobile || !data.message) {
                showError("Please fill all the fields.");
                return;
            }

            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                // Send email via EmailJS
                await emailjs.sendForm(
                    "service_waf05y7", // your service ID
                    "template_yjjjlyt", // your template ID
                    form,
                    "LsKNt382V8Rfdzzb4" // your public key
                );

                    // Open WhatsApp with pre-filled message
    const message = `Name: ${data.fullName}%0AEmail: ${data.email}%0AProject Name: ${data.projectName}%0AMobile: ${data.mobile}%0AMessage: ${data.message}`;
    const whatsappURL = `https://wa.me/+917383216096?text=${message}`;
    window.open(whatsappURL, '_blank');


                showToast("Message sent successfully!");
                resetForm();
                
            } catch (error) {
                console.error("Form submission error:", error);
                showToast("Failed to send message. Please try again.", "error");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message →';
            }
        }

        form.addEventListener('submit', handleSubmit);

        // Clear error on input
        form.addEventListener('input', hideError);