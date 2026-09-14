$(function () {
  "use strict";

  const $window = $(window);
  const $header = $(".site-header");
  const $mobileToggle = $(".mobile-toggle");
  const $mainNav = $(".main-nav");
  const $navLinks = $(".main-nav .nav-link");
  const $carousel = $("#trevornHero");
  const $scrollTopControl = $(".scroll-top-control");

  const $siteLoader = $("#siteLoader");
  const loaderDuration = 3500;

  if ($siteLoader.length) {
    setTimeout(function () {
      $siteLoader.addClass("is-leaving");
      $("body").removeClass("is-loading");

      setTimeout(function () {
        $siteLoader.remove();

        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }, 700);
    }, loaderDuration);
  }

  function closeMobileNav() {
    $mainNav.removeClass("open");

    $mobileToggle
      .removeClass("open")
      .attr("aria-expanded", "false");
  }

  $mobileToggle.on("click", function () {
    const shouldOpen = !$mainNav.hasClass("open");

    $mainNav.toggleClass("open", shouldOpen);

    $mobileToggle
      .toggleClass("open", shouldOpen)
      .attr("aria-expanded", String(shouldOpen));
  });

  $(".main-nav a").on("click", function () {
    if (window.innerWidth < 992) {
      closeMobileNav();
    }
  });

  $('a[href^="#"]').on("click", function (event) {
    const id = $(this).attr("href");

    if (!id || id === "#" || !$(id).length) {
      return;
    }

    event.preventDefault();

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop:
            $(id).offset().top -
            ($header.outerHeight() || 0)
        },
        650
      );
  });

  function updateActiveNav() {
    const y =
      $window.scrollTop() +
      ($header.outerHeight() || 0) +
      120;

    $("main section[id]").each(function () {
      const $section = $(this);
      const top = $section.offset().top;
      const bottom = top + $section.outerHeight();

      if (y >= top && y < bottom) {
        $navLinks.removeClass("active");

        $navLinks
          .filter(`[href="#${$section.attr("id")}"]`)
          .addClass("active");

        return false;
      }
    });
  }

  function restartHeroProgress() {
    const $fill = $(".hero-progress-fill");

    $fill.removeClass("run");

    if ($fill.length) {
      void $fill[0].offsetWidth;
    }

    $fill.addClass("run");
  }

  if ($carousel.length) {
    restartHeroProgress();

    $carousel.on(
      "slide.bs.carousel",
      restartHeroProgress
    );
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    function createCoreTimeline(section) {
      const gradient =
        section.querySelector(".product-gradient");

      const base =
        section.querySelector(".product-image--base");

      const flavor =
        section.querySelector(".product-image--flavor");

      const logo =
        section.querySelector(".product-logo");

      const title =
        section.querySelector(".product-title");

      const description =
        section.querySelector(".product-description");

      const orderCta =
        section.querySelector(".product-order-cta");

      const behavior =
        section.querySelector(".behavior-effect");

      const scrollCue =
        section.querySelector(".product-scroll-cue");

      if (base) {
        gsap.set(base, {
          clipPath: "none",
          filter: "none"
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:
            `top top+=${$header.outerHeight() || 0}`,
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true
        }
      });

      if (gradient) {
        tl.fromTo(
          gradient,
          {
            opacity: 0.88
          },
          {
            opacity: 1,
            duration: 0.28,
            ease: "sine.out"
          },
          0
        );
      }

      if (scrollCue) {
        gsap.set(scrollCue, {
          opacity: 1,
          y: 0
        });

        tl.to(
          scrollCue,
          {
            opacity: 0,
            y: -12,
            duration: 0.16,
            ease: "power1.out"
          },
          0.025
        );
      }

      if (base) {
        tl.fromTo(
          base,
          {
            opacity: 0,
            x: "28vw",
            y: "26vh",
            scale: 0.96,
            clipPath: "none",
            filter: "none"
          },
          {
            opacity: 1,
            x: "0vw",
            y: "0vh",
            scale: 1,
            clipPath: "none",
            filter: "none",
            duration: 0.38,
            ease: "power2.out"
          },
          0.06
        );

        tl.to(
          base,
          {
            opacity: 1,
            x: "0vw",
            y: "0vh",
            scale: 1,
            clipPath: "none",
            filter: "none",
            duration: 0.20,
            ease: "none"
          },
          0.52
        );
      }

      if (flavor) {
        tl.fromTo(
          flavor,
          {
            x: "-32vw",
            y: "28vh",
            scale: 0.90,
            opacity: 0,
            filter: "blur(4px)",
            clipPath: "inset(0 100% 0 0)"
          },
          {
            x: "-11vw",
            y: "10vh",
            scale: 0.96,
            opacity: 0.72,
            filter: "blur(1.5px)",
            clipPath: "inset(0 32% 0 0)",
            duration: 0.28,
            ease: "power2.out"
          },
          0.025
        );

        tl.to(
          flavor,
          {
            x: "0vw",
            y: "0vh",
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            clipPath: "inset(0 0% 0 0)",
            duration: 0.38,
            ease: "sine.inOut"
          },
          0.20
        );

        tl.to(
          flavor,
          {
            x: "0vw",
            y: "0vh",
            scale: 1,
            opacity: 1,
            duration: 0.18,
            ease: "none"
          },
          0.66
        );
      }

      if (logo) {
        tl.fromTo(
          logo,
          {
            opacity: 0,
            y: 28,
            scale: 0.96
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.24,
            ease: "power2.out"
          },
          0.06
        );
      }

      if (title) {
        tl.fromTo(
          title,
          {
            opacity: 0,
            x: "-8vw",
            clipPath: "inset(0 100% 0 0)"
          },
          {
            opacity: 1,
            x: "0vw",
            clipPath: "inset(0 0% 0 0)",
            duration: 0.38,
            ease: "power2.out"
          },
          0.09
        );
      }

      if (description) {
        tl.fromTo(
          description,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            ease: "power2.out"
          },
          0.18
        );
      }

      if (orderCta) {
        tl.fromTo(
          orderCta,
          {
            opacity: 0,
            y: 26
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.30,
            ease: "power2.out"
          },
          0.26
        );
      }

      if (behavior) {
        tl.fromTo(
          behavior,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 0.18,
            ease: "none"
          },
          0.08
        );
      }

      const holdElements = [
        base,
        flavor,
        logo,
        title,
        description,
        orderCta
      ].filter(Boolean);

      if (holdElements.length) {
        tl.to(
          holdElements,
          {
            opacity: 1,
            duration: 0.25,
            ease: "none"
          },
          0.76
        );
      }

      return tl;
    }

    function animateChocolate(section, tl) {
      const blobs =
        section.querySelectorAll(".melt-blob");

      const drips =
        section.querySelectorAll(".melt-drip");

      if (blobs.length) {
        tl.fromTo(
          blobs,
          {
            scale: 0.55,
            yPercent: -25,
            rotation: -10,
            borderRadius:
              "48% 52% 56% 44% / 46% 39% 61% 54%"
          },
          {
            scale: 1.22,
            yPercent: 25,
            rotation: 8,
            borderRadius:
              "60% 40% 68% 32% / 35% 58% 42% 65%",
            stagger: 0.025,
            duration: 0.44,
            ease: "sine.inOut"
          },
          0.10
        );

        tl.to(
          blobs,
          {
            yPercent: 48,
            scale: 1.35,
            duration: 0.28,
            ease: "none"
          },
          0.62
        );
      }

      if (drips.length) {
        tl.fromTo(
          drips,
          {
            scaleY: 0.25,
            transformOrigin: "top center",
            yPercent: -25,
            opacity: 0.2
          },
          {
            scaleY: 1.35,
            yPercent: 44,
            opacity: 0.82,
            stagger: 0.035,
            duration: 0.52,
            ease: "power1.in"
          },
          0.12
        );
      }
    }

    function animateVanilla(section, tl) {
      const bites =
        section.querySelectorAll(".bite");

      const crumbs =
        section.querySelectorAll(".crumb");

      if (bites.length) {
        tl.fromTo(
          bites,
          {
            opacity: 0,
            scale: 0,
            rotation: -22
          },
          {
            opacity: 0.92,
            scale: 1,
            rotation: 0,
            stagger: 0.055,
            duration: 0.26,
            ease: "back.out(1.8)"
          },
          0.12
        );

        tl.to(
          bites,
          {
            xPercent: -8,
            scale: 1.08,
            duration: 0.22,
            ease: "none"
          },
          0.56
        );
      }

      const crumbMoves = [
        {
          x: -120,
          y: -90,
          rotation: -180
        },
        {
          x: -85,
          y: 75,
          rotation: 210
        },
        {
          x: -165,
          y: 10,
          rotation: 320
        },
        {
          x: -110,
          y: 125,
          rotation: -250
        },
        {
          x: -190,
          y: -115,
          rotation: 260
        }
      ];

      crumbs.forEach(function (crumb, i) {
        const move =
          crumbMoves[i % crumbMoves.length];

        tl.fromTo(
          crumb,
          {
            opacity: 0,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 0.35
          },
          {
            opacity: 0.95,
            x: move.x,
            y: move.y,
            rotation: move.rotation,
            scale: 1,
            duration: 0.34,
            ease: "power2.out"
          },
          0.18 + i * 0.018
        );

        tl.to(
          crumb,
          {
            opacity: 0.15,
            y: "+=70",
            duration: 0.22,
            ease: "power1.in"
          },
          0.56 + i * 0.014
        );
      });
    }

    function animateAvocado(section, tl) {
      const orbs =
        section.querySelectorAll(".scoop-orb");

      const trail =
        section.querySelector(".scoop-trail");

      if (orbs.length) {
        tl.fromTo(
          orbs,
          {
            opacity: 0,
            x: "-18vw",
            y: "20vh",
            scale: 0.35,
            rotation: -24
          },
          {
            opacity: 0.94,
            x: "0vw",
            y: "0vh",
            scale: 1,
            rotation: 0,
            stagger: 0.06,
            duration: 0.42,
            ease: "back.out(1.55)"
          },
          0.10
        );

        tl.to(
          orbs,
          {
            x: i => (i - 1) * 55,
            y: i =>
              i % 2 === 0
                ? -35
                : 28,
            rotation: i =>
              (i - 1) * 18,
            scale: i =>
              1 + i * 0.05,
            duration: 0.3,
            ease: "sine.inOut"
          },
          0.58
        );
      }

      if (trail) {
        tl.fromTo(
          trail,
          {
            opacity: 0,
            xPercent: -14,
            rotation: -12,
            scaleX: 0.65
          },
          {
            opacity: 0.8,
            xPercent: 0,
            rotation: -5,
            scaleX: 1,
            duration: 0.38,
            ease: "power2.out"
          },
          0.14
        );

        tl.to(
          trail,
          {
            xPercent: 9,
            rotation: 2,
            opacity: 0.42,
            duration: 0.28,
            ease: "none"
          },
          0.61
        );
      }
    }

    document
      .querySelectorAll(".product-showcase")
      .forEach(function (section) {
        const tl =
          createCoreTimeline(section);

        if (
          section.classList.contains(
            "product-showcase--chocolate"
          )
        ) {
          animateChocolate(section, tl);
        }

        if (
          section.classList.contains(
            "product-showcase--vanilla"
          )
        ) {
          animateVanilla(section, tl);
        }

        if (
          section.classList.contains(
            "product-showcase--avocado"
          )
        ) {
          animateAvocado(section, tl);
        }
      });

    ScrollTrigger.refresh();
  }

  function scrollPageToTop() {
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: 0
        },
        700
      );
  }

  $(".product-showcase").on(
    "click",
    scrollPageToTop
  );

  function updateScrollTopControl() {
    $scrollTopControl.toggleClass(
      "is-visible",
      $window.scrollTop() > 320
    );
  }

  let lastScrollTop = $window.scrollTop();
  const headerScrollThreshold = 8;

  function updateHeaderVisibility() {
    const currentScrollTop = Math.max(
      0,
      $window.scrollTop()
    );

    const scrollDelta =
      currentScrollTop - lastScrollTop;

    if (
      currentScrollTop <= 12 ||
      $mainNav.hasClass("open")
    ) {
      $header.removeClass("is-hidden");
      $("body").removeClass("header-is-hidden");
    } else if (
      scrollDelta > headerScrollThreshold
    ) {
      $header.addClass("is-hidden");
      $("body").addClass("header-is-hidden");
    } else if (
      scrollDelta < -headerScrollThreshold
    ) {
      $header.removeClass("is-hidden");
      $("body").removeClass("header-is-hidden");
    }

    if (
      Math.abs(scrollDelta) >
      headerScrollThreshold
    ) {
      lastScrollTop = currentScrollTop;
    }
  }

  $scrollTopControl.on(
    "click",
    function (event) {
      event.preventDefault();
      event.stopPropagation();

      scrollPageToTop();
    }
  );

  $window.on(
    "scroll",
    function () {
      updateActiveNav();
      updateScrollTopControl();
      updateHeaderVisibility();
    }
  );

  updateActiveNav();
  updateScrollTopControl();
  updateHeaderVisibility();

  let resizeTimer;

  $window.on(
    "resize",
    function () {
      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(
          function () {
            if (
              window.innerWidth >= 992
            ) {
              closeMobileNav();
            }

            if (
              window.ScrollTrigger
            ) {
              ScrollTrigger.refresh();
            }
          },
          160
        );
    }
  );
});