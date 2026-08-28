/* ==================================================
   APP ROUTER
================================================== */

const routes = [
  'about',
  'resume',
  'portfolio',
  'contact'
];


const mainContent =
  document.getElementById(
    'mainContent'
  );


/* ==================================================
   PROJECT BASE PATH
================================================== */

const isLocalDevelopment =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';


const basePath =
  isLocalDevelopment
    ? '/portfolio/'
    : '/';


/* ==================================================
   GET PAGE FROM CURRENT URL
================================================== */

function getPageFromURL() {

  if (
    isLocalDevelopment
  ) {

    const hashPage =
      window.location.hash
        .replace('#', '')
        .trim();


    if (
      routes.includes(
        hashPage
      )
    ) {

      return hashPage;

    }

  }


  const parts =
    window.location.pathname
      .split('/')
      .filter(Boolean);


  const lastPart =
    parts[
      parts.length - 1
    ];


  if (
    routes.includes(
      lastPart
    )
  ) {

    return lastPart;

  }


  return 'about';

}


/* ==================================================
   BUILD ROUTE URL
================================================== */

function buildRouteURL(
  page
) {

  if (
    isLocalDevelopment
  ) {

    return `${basePath}#${page}`;

  }


  return `${basePath}${page}`;

}


/* ==================================================
   RESTORE GITHUB PAGES ROUTE
================================================== */

function restoreGitHubPagesRoute() {

  if (
    isLocalDevelopment
  ) {

    return;

  }


  const redirectPath =
    sessionStorage.getItem(
      'portfolioRedirectPath'
    );


  if (
    !redirectPath
  ) {

    return;

  }


  sessionStorage.removeItem(
    'portfolioRedirectPath'
  );


  window.history.replaceState(
    null,
    '',
    redirectPath
  );

}


/* ==================================================
   NORMALIZE NAVIGATION URLS
================================================== */

function normalizeNavigationURLs() {

  const navigationLinks =
    document.querySelectorAll(
      '.nav-item-custom[data-page]'
    );


  navigationLinks.forEach(
    function (link) {

      const page =
        link.dataset.page;


      if (
        routes.includes(
          page
        )
      ) {

        link.setAttribute(
          'href',
          buildRouteURL(
            page
          )
        );

      }

    }
  );

}


/* ==================================================
   SET ACTIVE NAVIGATION
================================================== */

function setActiveNavigation(
  page
) {

  const navigationLinks =
    document.querySelectorAll(
      '.nav-item-custom[data-page]'
    );


  navigationLinks.forEach(
    function (link) {

      const linkPage =
        link.dataset.page;


      link.classList.toggle(
        'active',
        linkPage === page
      );

    }
  );

}


/* ==================================================
   UPDATE BROWSER TAB TITLE
================================================== */

function updateDocumentTitle(
  page
) {

  const pageName =
    page.charAt(0).toUpperCase() +
    page.slice(1);


  document.title =
    `${pageName} | Manuel Banquiray III`;

}


/* ==================================================
   LOAD PAGE
================================================== */

async function loadPage(
  page,
  {
    pushHistory = true
  } = {}
) {

  if (
    !routes.includes(
      page
    )
  ) {

    page = 'about';

  }


  try {

    mainContent.innerHTML = `

      <div class="page-loading">

        <div
          class="spinner-border text-primary"
          role="status"
        >

          <span class="visually-hidden">
            Loading...
          </span>

        </div>

      </div>

    `;


    const response =
      await fetch(
        `${basePath}pages/${page}.html`
      );


    if (
      !response.ok
    ) {

      throw new Error(
        `Unable to load ${page}.html`
      );

    }


    const html =
      await response.text();


    mainContent.innerHTML =
      html;


    mainContent.classList.remove(
      'page-enter'
    );


    void mainContent.offsetWidth;


    mainContent.classList.add(
      'page-enter'
    );


    setActiveNavigation(
      page
    );


    updateDocumentTitle(
      page
    );


    if (
      pushHistory
    ) {

      const newURL =
        buildRouteURL(
          page
        );


      window.history.pushState(
        {
          page: page
        },
        '',
        newURL
      );

    }


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


    initializeLoadedPage();

  }
  catch (error) {

    console.error(
      error
    );


    mainContent.innerHTML = `

      <header class="page-header">

        <div class="page-title-wrapper">

          <span class="page-icon">

            <i class="bi bi-exclamation-triangle"></i>

          </span>


          <h1 class="page-title">
            Page Error
          </h1>

        </div>


        <div class="page-divider"></div>

      </header>


      <div class="page-content">

        <section class="test-page">

          <h2>
            Unable to load page
          </h2>


          <p>
            The requested page could not be loaded.
            Please refresh the website and try again.
          </p>

        </section>

      </div>

    `;

  }

}


/* ==================================================
   NAVIGATION CLICK
================================================== */

document.addEventListener(
  'click',
  function (event) {

    const navigationLink =
      event.target.closest(
        '.nav-item-custom[data-page]'
      );


    if (
      !navigationLink
    ) {

      return;

    }


    event.preventDefault();


    const page =
      navigationLink.dataset.page;


    loadPage(
      page
    );


    if (
      window.innerWidth <= 900
    ) {

      closeMobileMenu();

    }

  }
);


/* ==================================================
   BROWSER BACK / FORWARD
================================================== */

window.addEventListener(
  'popstate',
  function () {

    const page =
      getPageFromURL();


    loadPage(
      page,
      {
        pushHistory: false
      }
    );

  }
);


/* ==================================================
   MOBILE SIDEBAR
================================================== */

const mobileMenuButton =
  document.getElementById(
    'mobileMenuButton'
  );


const mobileMenuIcon =
  document.getElementById(
    'mobileMenuIcon'
  );


const sidebar =
  document.getElementById(
    'sidebar'
  );


const mobileMenuBackdrop =
  document.getElementById(
    'mobileMenuBackdrop'
  );


function openMobileMenu() {

  sidebar.classList.add(
    'open'
  );


  mobileMenuBackdrop.classList.add(
    'show'
  );


  document.body.classList.add(
    'mobile-menu-open'
  );


  mobileMenuButton.setAttribute(
    'aria-expanded',
    'true'
  );


  mobileMenuIcon.classList.remove(
    'bi-list'
  );


  mobileMenuIcon.classList.add(
    'bi-x-lg'
  );

}


function closeMobileMenu() {

  sidebar.classList.remove(
    'open'
  );


  mobileMenuBackdrop.classList.remove(
    'show'
  );


  document.body.classList.remove(
    'mobile-menu-open'
  );


  mobileMenuButton.setAttribute(
    'aria-expanded',
    'false'
  );


  mobileMenuIcon.classList.remove(
    'bi-x-lg'
  );


  mobileMenuIcon.classList.add(
    'bi-list'
  );

}


function toggleMobileMenu() {

  if (
    sidebar.classList.contains(
      'open'
    )
  ) {

    closeMobileMenu();

  }
  else {

    openMobileMenu();

  }

}


mobileMenuButton.addEventListener(
  'click',
  toggleMobileMenu
);


mobileMenuBackdrop.addEventListener(
  'click',
  closeMobileMenu
);


/* ==================================================
   ESCAPE KEY CLOSES MOBILE SIDEBAR
================================================== */

document.addEventListener(
  'keydown',
  function (event) {

    if (
      event.key === 'Escape' &&
      sidebar.classList.contains(
        'open'
      )
    ) {

      closeMobileMenu();

    }

  }
);


/* ==================================================
   RESET MOBILE MENU ON DESKTOP
================================================== */

window.addEventListener(
  'resize',
  function () {

    if (
      window.innerWidth > 900
    ) {

      closeMobileMenu();

    }

  }
);


/* ==================================================
   APPROACH MODAL
================================================== */

document.addEventListener(
  'show.bs.modal',
  function (event) {

    if (
      event.target.id !==
      'approachModal'
    ) {

      return;

    }


    const card =
      event.relatedTarget;


    if (
      !card
    ) {

      return;

    }


    const modalFunctionName =
      document.getElementById(
        'modalFunctionName'
      );


    const modalDescription =
      document.getElementById(
        'modalDescription'
      );


    if (
      modalFunctionName
    ) {

      modalFunctionName.textContent =
        card.getAttribute(
          'data-title'
        );

    }


    if (
      modalDescription
    ) {

      modalDescription.textContent =
        card.getAttribute(
          'data-description'
        );

    }

  }
);


/* ==================================================
   HORIZONTAL WHEEL DELTA
================================================== */

function getHorizontalWheelDelta(
  event
) {

  if (
    Math.abs(event.deltaX) >
    Math.abs(event.deltaY)
  ) {

    return event.deltaX;

  }


  return event.deltaY;

}


/* ==================================================
   DYNAMIC HORIZONTAL SCROLLER
================================================== */

function createDynamicScroller({
  scrollElement,
  scrollbarElement,
  thumbElement
}) {

  if (
    scrollElement.dataset
      .scrollerInitialized ===
    'true'
  ) {

    return;

  }


  scrollElement.dataset
    .scrollerInitialized =
    'true';


  let isDragging = false;

  let dragStartX = 0;

  let dragStartThumbLeft = 0;


  function getMetrics() {

    const visibleWidth =
      scrollElement.clientWidth;


    const totalWidth =
      scrollElement.scrollWidth;


    const maxContentScroll =
      Math.max(
        0,
        totalWidth -
        visibleWidth
      );


    const trackWidth =
      scrollbarElement.clientWidth;


    const thumbWidth =
      thumbElement.offsetWidth;


    const maxThumbMovement =
      Math.max(
        0,
        trackWidth -
        thumbWidth
      );


    return {
      visibleWidth,
      totalWidth,
      maxContentScroll,
      maxThumbMovement
    };

  }


  function updateThumbSize() {

    const visibleWidth =
      scrollElement.clientWidth;


    const totalWidth =
      scrollElement.scrollWidth;


    if (
      totalWidth <= 0
    ) {

      return;

    }


    const visibleRatio =
      Math.min(
        1,
        visibleWidth /
        totalWidth
      );


    const thumbPercentage =
      Math.max(
        12,
        visibleRatio *
        100
      );


    thumbElement.style.width =
      `${thumbPercentage}%`;


    if (
      totalWidth <=
      visibleWidth + 1
    ) {

      scrollbarElement.style.opacity =
        '0';


      scrollbarElement.style.pointerEvents =
        'none';

    }
    else {

      scrollbarElement.style.opacity =
        '1';


      scrollbarElement.style.pointerEvents =
        'auto';

    }

  }


  function updateThumbPosition() {

    const {
      maxContentScroll,
      maxThumbMovement
    } = getMetrics();


    if (
      maxContentScroll <= 0 ||
      maxThumbMovement <= 0
    ) {

      thumbElement.style.left =
        '0px';

      return;

    }


    const scrollRatio =
      scrollElement.scrollLeft /
      maxContentScroll;


    const thumbPosition =
      scrollRatio *
      maxThumbMovement;


    thumbElement.style.left =
      `${thumbPosition}px`;

  }


  function updateScroller() {

    updateThumbSize();


    requestAnimationFrame(
      updateThumbPosition
    );

  }


  function scrollFromThumb(
    requestedPosition
  ) {

    const {
      maxContentScroll,
      maxThumbMovement
    } = getMetrics();


    if (
      maxContentScroll <= 0 ||
      maxThumbMovement <= 0
    ) {

      return;

    }


    const thumbPosition =
      Math.max(
        0,
        Math.min(
          requestedPosition,
          maxThumbMovement
        )
      );


    const ratio =
      thumbPosition /
      maxThumbMovement;


    scrollElement.scrollLeft =
      ratio *
      maxContentScroll;

  }


  thumbElement.addEventListener(
    'pointerdown',
    function (event) {

      event.preventDefault();

      event.stopPropagation();


      isDragging = true;


      dragStartX =
        event.clientX;


      dragStartThumbLeft =
        parseFloat(
          getComputedStyle(
            thumbElement
          ).left
        ) || 0;


      thumbElement.classList.add(
        'dragging'
      );


      thumbElement.setPointerCapture(
        event.pointerId
      );

    }
  );


  thumbElement.addEventListener(
    'pointermove',
    function (event) {

      if (
        !isDragging
      ) {

        return;

      }


      const distanceMoved =
        event.clientX -
        dragStartX;


      scrollFromThumb(
        dragStartThumbLeft +
        distanceMoved
      );

    }
  );


  function stopDragging(
    event
  ) {

    if (
      !isDragging
    ) {

      return;

    }


    isDragging = false;


    thumbElement.classList.remove(
      'dragging'
    );


    if (
      thumbElement.hasPointerCapture(
        event.pointerId
      )
    ) {

      thumbElement.releasePointerCapture(
        event.pointerId
      );

    }

  }


  thumbElement.addEventListener(
    'pointerup',
    stopDragging
  );


  thumbElement.addEventListener(
    'pointercancel',
    stopDragging
  );


  scrollbarElement.addEventListener(
    'pointerdown',
    function (event) {

      if (
        event.target ===
        thumbElement
      ) {

        return;

      }


      const trackRect =
        scrollbarElement
          .getBoundingClientRect();


      const clickPosition =
        event.clientX -
        trackRect.left;


      const centeredPosition =
        clickPosition -
        (
          thumbElement.offsetWidth /
          2
        );


      scrollFromThumb(
        centeredPosition
      );

    }
  );


  scrollElement.addEventListener(
    'scroll',
    updateThumbPosition
  );


  scrollElement.addEventListener(
    'wheel',
    function (event) {

      const {
        maxContentScroll
      } = getMetrics();


      if (
        maxContentScroll <= 0
      ) {

        return;

      }


      const wheelDelta =
        getHorizontalWheelDelta(
          event
        );


      if (
        wheelDelta === 0
      ) {

        return;

      }


      const currentPosition =
        scrollElement.scrollLeft;


      const canScrollLeft =
        wheelDelta < 0 &&
        currentPosition > 0;


      const canScrollRight =
        wheelDelta > 0 &&
        currentPosition <
        maxContentScroll;


      if (
        !canScrollLeft &&
        !canScrollRight
      ) {

        return;

      }


      event.preventDefault();


      const newPosition =
        currentPosition +
        wheelDelta;


      scrollElement.scrollLeft =
        Math.max(
          0,
          Math.min(
            newPosition,
            maxContentScroll
          )
        );

    },
    {
      passive: false
    }
  );


  window.addEventListener(
    'resize',
    updateScroller
  );


  updateScroller();

}


/* ==================================================
   PORTFOLIO FILTER
================================================== */

function initializePortfolioFilters() {

  const filterButtons =
    document.querySelectorAll(
      '.portfolio-filter-button[data-filter]'
    );


  const portfolioProjects =
    document.querySelectorAll(
      '.portfolio-project[data-category]'
    );


  if (
    filterButtons.length === 0 ||
    portfolioProjects.length === 0
  ) {
    return;
  }


  const filterNavigation =
    document.querySelector(
      '.portfolio-filters'
    );


  if (
    filterNavigation?.dataset.filterInitialized === 'true'
  ) {
    return;
  }


  if (
    filterNavigation
  ) {

    filterNavigation.dataset.filterInitialized =
      'true';

  }


  const reducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );


  let isFiltering = false;


  function shouldShow(
    project,
    selectedFilter
  ) {

    return (
      selectedFilter === 'all' ||
      project.dataset.category ===
        selectedFilter
    );

  }


  function updateButtons(
    selectedButton
  ) {

    filterButtons.forEach(
      function (button) {

        const isActive =
          button === selectedButton;


        button.classList.toggle(
          'active',
          isActive
        );


        button.setAttribute(
          'aria-pressed',
          String(isActive)
        );

      }
    );

  }


  function applyFilter(
    selectedFilter
  ) {

    portfolioProjects.forEach(
      function (project) {

        project.hidden =
          !shouldShow(
            project,
            selectedFilter
          );

      }
    );

  }


  function waitForAnimation(
    animation
  ) {

    return animation.finished.catch(
      function () {
        return null;
      }
    );

  }


  async function animateFilter(
    selectedFilter
  ) {

    const visibleProjects =
      Array.from(
        portfolioProjects
      ).filter(
        function (project) {
          return !project.hidden;
        }
      );


    await Promise.all(
      visibleProjects.map(
        function (project) {

          return waitForAnimation(
            project.animate(
              [
                {
                  opacity: 1,
                  transform:
                    'translateY(0) scale(1)'
                },
                {
                  opacity: 0,
                  transform:
                    'translateY(-6px) scale(0.97)'
                }
              ],
              {
                duration: 180,
                easing: 'ease-in',
                fill: 'forwards'
              }
            )
          );

        }
      )
    );


    applyFilter(
      selectedFilter
    );


    const newVisibleProjects =
      Array.from(
        portfolioProjects
      ).filter(
        function (project) {
          return !project.hidden;
        }
      );


    await Promise.all(
      newVisibleProjects.map(
        function (
          project,
          index
        ) {

          return waitForAnimation(
            project.animate(
              [
                {
                  opacity: 0,
                  transform:
                    'translateY(12px) scale(0.98)'
                },
                {
                  opacity: 1,
                  transform:
                    'translateY(0) scale(1)'
                }
              ],
              {
                duration: 280,
                delay: index * 35,
                easing:
                  'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'both'
              }
            )
          );

        }
      )
    );

  }


  filterButtons.forEach(
    function (button) {

      button.addEventListener(
        'click',
        async function () {

          if (
            isFiltering ||
            button.classList.contains(
              'active'
            )
          ) {

            return;

          }


          const selectedFilter =
            button.dataset.filter;


          isFiltering = true;


          updateButtons(
            button
          );


          try {

            if (
              reducedMotion.matches
            ) {

              applyFilter(
                selectedFilter
              );

            }
            else {

              await animateFilter(
                selectedFilter
              );

            }

          }
          finally {

            isFiltering = false;

          }

        }
      );

    }
  );

}




/* ==================================================
   CONTACT FORM
================================================== */

function initializeContactForm() {

  const form =
    document.querySelector(
      '.contact-form'
    );


  if (
    !form ||
    form.dataset.formInitialized === 'true'
  ) {

    return;

  }


  form.dataset.formInitialized =
    'true';


  const submitButton =
    form.querySelector(
      '.contact-submit-button'
    );


  const submitText =
    submitButton?.querySelector(
      'span'
    );


  const submitIcon =
    submitButton?.querySelector(
      'i'
    );


  const statusMessage =
    form.querySelector(
      '.contact-form-status'
    );


  function setStatus(
    message,
    state = ''
  ) {

    if (
      !statusMessage
    ) {

      return;

    }


    statusMessage.textContent =
      message;


    statusMessage.classList.remove(
      'success',
      'error'
    );


    if (
      state
    ) {

      statusMessage.classList.add(
        state
      );

    }

  }


  function setButtonState(
    state
  ) {

    if (
      !submitButton ||
      !submitText ||
      !submitIcon
    ) {

      return;

    }


    if (
      state === 'sending'
    ) {

      submitButton.disabled = true;
      submitText.textContent = 'Sending...';

      submitIcon.className =
        'bi bi-arrow-repeat contact-submit-spinner';

      return;

    }


    if (
      state === 'success'
    ) {

      submitButton.disabled = false;
      submitText.textContent = 'Message Sent';

      submitIcon.className =
        'bi bi-check-lg';

      return;

    }


    submitButton.disabled = false;
    submitText.textContent = 'Send Message';

    submitIcon.className =
      'bi bi-arrow-up-right';

  }


  form.addEventListener(
    'submit',
    async function (event) {

      event.preventDefault();


      if (
        !form.checkValidity()
      ) {

        form.reportValidity();
        return;

      }


      setButtonState(
        'sending'
      );


      setStatus(
        ''
      );


      try {

        const response =
          await fetch(
            form.action,
            {
              method: 'POST',
              body: new FormData(form),
              headers: {
                Accept: 'application/json'
              }
            }
          );


        if (
          !response.ok
        ) {

          throw new Error(
            'Unable to send message.'
          );

        }


        form.reset();


        setButtonState(
          'success'
        );


        setStatus(
          'Thanks! Your message has been sent successfully.',
          'success'
        );


        window.setTimeout(
          function () {

            setButtonState(
              'default'
            );

          },
          3500
        );

      }
      catch (error) {

        console.error(
          error
        );


        setButtonState(
          'default'
        );


        setStatus(
          'Sorry, your message could not be sent. Please try again.',
          'error'
        );

      }

    }
  );

}


/* ==================================================
   INITIALIZE LOADED PAGE
================================================== */

function initializeLoadedPage() {

  const approachScroll =
    document.getElementById(
      'approachScroll'
    );


  const approachScrollbar =
    document.getElementById(
      'approachScrollbar'
    );


  const approachScrollbarThumb =
    document.getElementById(
      'approachScrollbarThumb'
    );


  if (
    approachScroll &&
    approachScrollbar &&
    approachScrollbarThumb
  ) {

    createDynamicScroller({

      scrollElement:
        approachScroll,

      scrollbarElement:
        approachScrollbar,

      thumbElement:
        approachScrollbarThumb

    });

  }


  const techStackScroll =
    document.getElementById(
      'techStackScroll'
    );


  const techStackScrollbar =
    document.getElementById(
      'techStackScrollbar'
    );


  const techStackScrollbarThumb =
    document.getElementById(
      'techStackScrollbarThumb'
    );


  if (
    techStackScroll &&
    techStackScrollbar &&
    techStackScrollbarThumb
  ) {

    createDynamicScroller({

      scrollElement:
        techStackScroll,

      scrollbarElement:
        techStackScrollbar,

      thumbElement:
        techStackScrollbarThumb

    });

  }


  initializePortfolioFilters();


  initializeContactForm();

}


/* ==================================================
   INITIAL PAGE LOAD
================================================== */

restoreGitHubPagesRoute();


normalizeNavigationURLs();


const initialPage =
  getPageFromURL();


const currentRoute =
  isLocalDevelopment
    ? window.location.hash
        .replace('#', '')
        .trim()
    : window.location.pathname
        .split('/')
        .filter(Boolean)
        .pop();


if (
  !routes.includes(
    currentRoute
  )
) {

  window.history.replaceState(
    {
      page: 'about'
    },
    '',
    buildRouteURL(
      'about'
    )
  );

}


loadPage(
  initialPage,
  {
    pushHistory: false
  }
);
