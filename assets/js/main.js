/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 14 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  // Language switcher functionality is handled by inline script to avoid conflicts

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

 function copyCode() {
    const codeBlock = document.getElementById('code-block');
    const range = document.createRange();
    range.selectNode(codeBlock);
    window.getSelection().removeAllRanges();  // Clear current selection
    window.getSelection().addRange(range);  // Select the text
    try {
      document.execCommand('copy');
      // Change the icon to 'checked' after copy
      const copyButton = document.querySelector('.copy-button i');
      copyButton.classList.remove('fa-copy');
      copyButton.classList.add('fa-check');
      // Reset the icon back to 'copy' after 2 seconds
      setTimeout(() => {
        copyButton.classList.remove('fa-check');
        copyButton.classList.add('fa-copy');
      }, 2000);
    } catch (err) {
      alert('Failed to copy code');
    }
    window.getSelection().removeAllRanges();  // Deselect the text
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  // Typed.js initialization is handled by inline script to support language switching
  // const selectTyped = document.querySelector('.typed');
  // if (selectTyped) {
  //   new Typed('.typed', {
  //     strings: ['Data Scientist', 'AI/ML Engineer', 'Data Engineer', 'NLP Developer', 'Python Developer', 'BI Developer'],
  //     loop: true,
  //     typeSpeed: 100,
  //     backSpeed: 50,
  //     backDelay: 2000
  //   });
  // }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Scroll Progress Bar
  const scrollProgressBar = document.querySelector("#scrollProgress #innerBar");
  if (scrollProgressBar) {
    function scrollPBar() {
      const scrollDistance = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (window.scrollY * 100) / scrollDistance;
      scrollProgressBar.style.width = percent + "%";
  }

    window.addEventListener('scroll', scrollPBar);
    scrollPBar(); // Initial call
  }

  /* TODO : Complete
  $("section").each(function(){
    console.log($(this).offset().top * 100 / $("html").height() + "%");
    $("#scrollProgress").append($("<span></span>").css({
      position:"absolute",
      width:"5px",
      height:"inherit",
      backgroundColor:"blue",
      top:0,
      left:$(this).offset().top * 100 / $("html").height() + "%",
      display:"block"
    }));
  });
  */
  
  /**
   * Handle form submission with Formspree
   */
 document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const loadingElement = form.querySelector('.loading');
  const errorElement = form.querySelector('.error-message');
  const sentElement = form.querySelector('.sent-message');

  loadingElement.style.display = 'block';
  errorElement.style.display = 'none';
  sentElement.style.display = 'none';

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    loadingElement.style.display = 'none';
    sentElement.style.display = 'block';
    setTimeout(() => {
      sentElement.style.display = 'none';
    }, 3000);
    form.reset();
  }).catch(error => {
    loadingElement.style.display = 'none';
    sentElement.style.display = 'block';
    setTimeout(() => {
      sentElement.style.display = 'none';
    }, 3000);
    form.reset();
  });
});

})();
