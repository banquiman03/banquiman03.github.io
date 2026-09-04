/* =========================
   FLAVORS CAROUSEL
========================= */
(() => {
  const carousel = document.querySelector("[data-flavor-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const originalCards = Array.from(track.children);

  let visibleCount = 4;
  let currentIndex = 0;
  let isAnimating = false;
  let autoSlideTimer = null;
  let autoSlideStopped = false;

  const getVisibleCount = () => {
    if (window.innerWidth <= 575.98) return 1;
    if (window.innerWidth <= 991.98) return 2;
    return 4;
  };

  const getGap = () => {
    const styles = window.getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap) || 0;
  };

  const getStep = () => {
    const firstCard = track.querySelector(".flavor-card");

    return firstCard
      ? firstCard.getBoundingClientRect().width + getGap()
      : 0;
  };

  const setPosition = (animate = true) => {
    const step = getStep();

    track.style.transition = animate
      ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    track.style.transform =
      `translate3d(${-currentIndex * step}px, 0, 0)`;
  };

  const buildLoop = () => {
    visibleCount = getVisibleCount();

    track.style.transition = "none";
    track.innerHTML = "";

    const leadingClones = originalCards
      .slice(-visibleCount)
      .map((card) => card.cloneNode(true));

    const trailingClones = originalCards
      .slice(0, visibleCount)
      .map((card) => card.cloneNode(true));

    leadingClones.forEach((card) => {
      track.appendChild(card);
    });

    originalCards.forEach((card) => {
      track.appendChild(card);
    });

    trailingClones.forEach((card) => {
      track.appendChild(card);
    });

    currentIndex = visibleCount;

    requestAnimationFrame(() => {
      setPosition(false);
    });
  };

  const moveNext = () => {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex += 1;
    setPosition(true);
  };

  const movePrev = () => {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex -= 1;
    setPosition(true);
  };

  track.addEventListener("transitionend", () => {
    const firstRealIndex = visibleCount;
    const lastRealIndex =
      visibleCount + originalCards.length - 1;

    if (currentIndex > lastRealIndex) {
      currentIndex = firstRealIndex;
      setPosition(false);
    } else if (currentIndex < firstRealIndex) {
      currentIndex =
        visibleCount + originalCards.length - 1;

      setPosition(false);
    }

    requestAnimationFrame(() => {
      isAnimating = false;
    });
  });

  const startAutoSlide = () => {
    if (autoSlideStopped) return;

    clearInterval(autoSlideTimer);

    autoSlideTimer = setInterval(() => {
      moveNext();
    }, 2000);
  };

  const stopAutoSlidePermanently = () => {
    autoSlideStopped = true;
    clearInterval(autoSlideTimer);
  };

  nextButton?.addEventListener("click", () => {
    stopAutoSlidePermanently();
    moveNext();
  });

  prevButton?.addEventListener("click", () => {
    stopAutoSlidePermanently();
    movePrev();
  });

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      buildLoop();
      startAutoSlide();
    }, 120);
  });

  buildLoop();
  startAutoSlide();
})();


/* =========================
   CUSTOMER FEEDBACK CAROUSEL
========================= */
(() => {
  const carousel = document.querySelector(
    "[data-feedback-carousel]"
  );

  if (!carousel) return;

  const track = carousel.querySelector(
    "[data-feedback-track]"
  );

  const dots = Array.from(
    document.querySelectorAll("[data-feedback-dot]")
  );

  const originalCards = Array.from(track.children);

  let visibleCount = 3;
  let currentIndex = 0;
  let isAnimating = false;
  let autoTimer = null;

  const getVisibleCount = () => {
    if (window.innerWidth <= 575.98) return 1;
    if (window.innerWidth <= 991.98) return 2;
    return 3;
  };

  const getGap = () => {
    const styles = window.getComputedStyle(track);

    return parseFloat(
      styles.columnGap || styles.gap
    ) || 0;
  };

  const getStep = () => {
    const firstCard =
      track.querySelector(".feedback-card");

    return firstCard
      ? firstCard.getBoundingClientRect().width + getGap()
      : 0;
  };

  const updateDots = () => {
    const realIndex =
      (
        currentIndex -
        visibleCount +
        originalCards.length
      ) % originalCards.length;

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === realIndex
      );
    });
  };

  const setPosition = (animate = true) => {
    const step = getStep();

    track.style.transition = animate
      ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    track.style.transform =
      `translate3d(${-currentIndex * step}px, 0, 0)`;
  };

  const buildLoop = () => {
    visibleCount = getVisibleCount();

    track.innerHTML = "";

    originalCards
      .slice(-visibleCount)
      .forEach((card) => {
        track.appendChild(
          card.cloneNode(true)
        );
      });

    originalCards.forEach((card) => {
      track.appendChild(card);
    });

    originalCards
      .slice(0, visibleCount)
      .forEach((card) => {
        track.appendChild(
          card.cloneNode(true)
        );
      });

    currentIndex = visibleCount;

    setPosition(false);
    updateDots();
  };

  const moveNext = () => {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex += 1;

    setPosition(true);
  };

  track.addEventListener("transitionend", () => {
    const lastRealIndex =
      visibleCount + originalCards.length - 1;

    if (currentIndex > lastRealIndex) {
      currentIndex = visibleCount;
      setPosition(false);
    }

    updateDots();
    isAnimating = false;
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (isAnimating) return;

      currentIndex =
        visibleCount + index;

      setPosition(true);
    });
  });

  const startAuto = () => {
    clearInterval(autoTimer);

    autoTimer = setInterval(() => {
      moveNext();
    }, 5000);
  };

  const stopAuto = () => {
    clearInterval(autoTimer);
  };

  carousel.addEventListener(
    "mouseenter",
    stopAuto
  );

  carousel.addEventListener(
    "mouseleave",
    startAuto
  );

  carousel.addEventListener(
    "focusin",
    stopAuto
  );

  carousel.addEventListener(
    "focusout",
    startAuto
  );

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      buildLoop();
      startAuto();
    }, 120);
  });

  buildLoop();
  startAuto();
})();


/* =========================
   PRODUCT QUANTITY + PRICE
========================= */
(() => {
  const control = document.querySelector(
    "[data-quantity-control]"
  );

  if (!control) return;

  const input = control.querySelector(
    ".quantity-input"
  );

  const minusButton = control.querySelector(
    "[data-qty-minus]"
  );

  const plusButton = control.querySelector(
    "[data-qty-plus]"
  );

  const priceElement = document.querySelector(
    "[data-product-price]"
  );

  const unitPrice = priceElement
    ? parseFloat(
        priceElement.dataset.unitPrice || "58.99"
      )
    : 58.99;

  const getQuantity = () => {
    const value = parseInt(input.value, 10);

    return Number.isFinite(value) && value > 0
      ? value
      : 1;
  };

  const updatePrice = () => {
    if (!priceElement) return;

    const quantity = getQuantity();
    const total = unitPrice * quantity;

    priceElement.textContent =
      `$ ${total.toFixed(2)}`;
  };

  minusButton?.addEventListener("click", () => {
    input.value = Math.max(
      1,
      getQuantity() - 1
    );

    updatePrice();
  });

  plusButton?.addEventListener("click", () => {
    input.value = getQuantity() + 1;
    updatePrice();
  });

  input.addEventListener("input", () => {
    if (input.value === "") return;

    input.value = Math.max(
      1,
      getQuantity()
    );

    updatePrice();
  });

  input.addEventListener("change", () => {
    input.value = getQuantity();
    updatePrice();
  });

  updatePrice();
})();


/* =========================
   PDP PRODUCT IMAGE GALLERY
========================= */
(() => {
  const gallery = document.querySelector(
    "[data-product-gallery]"
  );

  if (!gallery) return;

  const mainImage = gallery.querySelector(
    "[data-gallery-main]"
  );

  const thumbnails = Array.from(
    gallery.querySelectorAll(
      "[data-gallery-thumb]"
    )
  );

  const prevButton = gallery.querySelector(
    "[data-gallery-prev]"
  );

  const nextButton = gallery.querySelector(
    "[data-gallery-next]"
  );

  if (!mainImage || !thumbnails.length) {
    return;
  }

  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex =
      (
        index +
        thumbnails.length
      ) % thumbnails.length;

    thumbnails.forEach(
      (thumbnail, thumbnailIndex) => {
        const isActive =
          thumbnailIndex === currentIndex;

        thumbnail.classList.toggle(
          "active",
          isActive
        );

        thumbnail.setAttribute(
          "aria-current",
          isActive ? "true" : "false"
        );
      }
    );

    const selectedThumbnail =
      thumbnails[currentIndex];

    const selectedImage =
      selectedThumbnail.dataset.image;

    const thumbnailImage =
      selectedThumbnail.querySelector("img");

    if (selectedImage) {
      mainImage.src = selectedImage;
    }

    if (thumbnailImage?.alt) {
      mainImage.alt = thumbnailImage.alt;
    }
  };

  thumbnails.forEach(
    (thumbnail, index) => {
      thumbnail.addEventListener(
        "click",
        () => {
          showImage(index);
        }
      );
    }
  );

  prevButton?.addEventListener(
    "click",
    () => {
      showImage(currentIndex - 1);
    }
  );

  nextButton?.addEventListener(
    "click",
    () => {
      showImage(currentIndex + 1);
    }
  );

  showImage(0);
})();


/* =========================
   RELATED PRODUCTS CAROUSEL
========================= */
(() => {
  const carousel = document.querySelector(
    "[data-related-carousel]"
  );

  if (!carousel) return;

  const track = carousel.querySelector(
    "[data-related-track]"
  );

  const prevButton = document.querySelector(
    "[data-related-prev]"
  );

  const nextButton = document.querySelector(
    "[data-related-next]"
  );

  const originalCards = Array.from(
    track.children
  );

  let visibleCount = 4;
  let currentIndex = 0;
  let isAnimating = false;
  let autoTimer = null;

  /* NEW:
     Once the user clicks either arrow,
     autoplay will stay disabled.
  */
  let autoStopped = false;

  const getVisibleCount = () => {
    if (window.innerWidth <= 575.98) return 1;
    if (window.innerWidth <= 991.98) return 2;
    return 4;
  };

  const getGap = () => {
    const styles =
      window.getComputedStyle(track);

    return parseFloat(
      styles.columnGap || styles.gap
    ) || 0;
  };

  const getStep = () => {
    const firstCard =
      track.querySelector(
        ".related-product-card"
      );

    return firstCard
      ? firstCard.getBoundingClientRect().width +
          getGap()
      : 0;
  };

  const setPosition = (animate = true) => {
    track.style.transition = animate
      ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    track.style.transform =
      `translate3d(${-currentIndex * getStep()}px, 0, 0)`;
  };

  const buildLoop = () => {
    visibleCount = getVisibleCount();

    track.style.transition = "none";
    track.innerHTML = "";

    originalCards
      .slice(-visibleCount)
      .forEach((card) => {
        track.appendChild(
          card.cloneNode(true)
        );
      });

    originalCards.forEach((card) => {
      track.appendChild(card);
    });

    originalCards
      .slice(0, visibleCount)
      .forEach((card) => {
        track.appendChild(
          card.cloneNode(true)
        );
      });

    currentIndex = visibleCount;

    requestAnimationFrame(() => {
      setPosition(false);
    });
  };

  const moveNext = () => {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex += 1;

    setPosition(true);
  };

  const movePrev = () => {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex -= 1;

    setPosition(true);
  };

  track.addEventListener(
    "transitionend",
    () => {
      const firstRealIndex =
        visibleCount;

      const lastRealIndex =
        visibleCount +
        originalCards.length -
        1;

      if (
        currentIndex >
        lastRealIndex
      ) {
        currentIndex =
          firstRealIndex;

        setPosition(false);
      } else if (
        currentIndex <
        firstRealIndex
      ) {
        currentIndex =
          visibleCount +
          originalCards.length -
          1;

        setPosition(false);
      }

      requestAnimationFrame(() => {
        isAnimating = false;
      });
    }
  );

  /* Permanently stop autoplay */
  const stopAutoPermanently = () => {
    autoStopped = true;
    clearInterval(autoTimer);
  };

  /* LEFT ARROW */
  prevButton?.addEventListener(
    "click",
    () => {
      stopAutoPermanently();
      movePrev();
    }
  );

  /* RIGHT ARROW */
  nextButton?.addEventListener(
    "click",
    () => {
      stopAutoPermanently();
      moveNext();
    }
  );

  /* AUTOPLAY */
  const startAuto = () => {
    if (autoStopped) return;

    clearInterval(autoTimer);

    autoTimer = setInterval(() => {
      moveNext();
    }, 2000);
  };

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      buildLoop();

      /*
        If an arrow was already clicked,
        startAuto() will NOT restart autoplay.
      */
      startAuto();
    }, 120);
  });

  buildLoop();
  startAuto();
})();