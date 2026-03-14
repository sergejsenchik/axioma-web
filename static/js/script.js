/**
 * Axioma — Main Script
 * All custom interactions for the Axioma website
 */

$(document).ready(function () {

  // -----------------------------------------------
  // Hero Slider -- Crossfade, 6s auto-advance
  // -----------------------------------------------
  var $heroSlides = $('.hero-slide');
  if ($heroSlides.length > 1) {
    var slideCount = $heroSlides.length;
    var currentSlide = 0;
    var slideInterval = 6000;
    var heroTimer;

    function goToSlide(index) {
      $heroSlides.eq(currentSlide).removeClass('active');
      currentSlide = index % slideCount;
      $heroSlides.eq(currentSlide).addClass('active');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startHeroAutoplay() {
      heroTimer = setInterval(nextSlide, slideInterval);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }

    // Navigation arrow buttons
    $('.hero-nav-prev').on('click', function () {
      clearInterval(heroTimer);
      prevSlide();
      startHeroAutoplay();
    });

    $('.hero-nav-next').on('click', function () {
      clearInterval(heroTimer);
      nextSlide();
      startHeroAutoplay();
    });

    startHeroAutoplay();
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // -----------------------------------------------
  // Smooth scroll -- scroll-down indicator
  // -----------------------------------------------
  $('.scroll-down-link').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if ($(target).length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 800);
    }
  });

  // -----------------------------------------------
  // Smart header: hide on scroll down, show on scroll up
  // -----------------------------------------------
  var lastScrollY = 0;
  var scrollThreshold = 50;

  $(window).on('scroll', function () {
    var currentScrollY = window.pageYOffset;

    if (currentScrollY > scrollThreshold) {
      if (currentScrollY > lastScrollY) {
        // Scrolling down -- hide navbar
        $('.site-navbar').addClass('navbar-hidden');
      } else {
        // Scrolling up -- show navbar
        $('.site-navbar').removeClass('navbar-hidden');
      }
    } else {
      // At top of page -- always show
      $('.site-navbar').removeClass('navbar-hidden');
    }

    lastScrollY = currentScrollY;
  });

  // -----------------------------------------------
  // Scroll-triggered reveal animations
  // Replicates Webflow IX2 fade-in-on-scroll behavior
  // -----------------------------------------------
  var $scrollRevealElements = $('.scroll-reveal, .scroll-reveal-simple');
  if ($scrollRevealElements.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    $scrollRevealElements.each(function () {
      revealObserver.observe(this);
    });
  }

  // -----------------------------------------------
  // About -- Digit-train counter animation
  // Matches Webflow IX2 counter behavior:
  // Each counter-train starts at translateY(0) and
  // animates to its target position on scroll-into-view.
  // The counter-box has overflow:hidden and clips to
  // show only one digit height (3.4375rem).
  // -----------------------------------------------
  var $counterWrap = $('.counter-cards-wrap');
  if ($counterWrap.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Animate each counter-train to its target
          $(entry.target).find('.counter-train').each(function (index) {
            var $train = $(this);
            var targetIndex = parseInt($train.data('target'), 10);
            var digitCount = $train.find('.counter-digit').length;

            // Each digit occupies 100%/digitCount of the train height
            // We need to shift by (targetIndex / digitCount) * 100%
            // But since translateY is relative to the element's own height,
            // and each digit has the same height, moving by targetIndex * (100/digitCount)%
            // In Webflow, the transform is percentage of the train's total height
            // With N digits, moving to index I means translateY(-(I/N)*100%)
            var pct = (targetIndex / digitCount) * 100;

            // Small delay stagger per train for visual effect
            var delay = index * 100;
            setTimeout(function () {
              $train.css('transform', 'translate3d(0, -' + pct + '%, 0)');
            }, delay);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe($counterWrap[0]);
  }

  // -----------------------------------------------
  // Location -- Lottie circle + text rotation
  // -----------------------------------------------
  var $locationSection = $('.location-section');
  if ($locationSection.length && typeof lottie !== 'undefined') {
    var circleAnim = lottie.loadAnimation({
      container: document.getElementById('circle-loading'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'static/img/circle-loader.json'
    });

    var locationSteps = [
      { frame: 6 },   // Step 0: Park / By the river (5 min)
      { frame: 12 },  // Step 1: City center / On foot (8 min)
      { frame: 18 },  // Step 2: Shopping mall (10 min)
      { frame: 24 },  // Step 3: Highschool campus (15 min)
      { frame: 30 }   // Step 4: Airport / With car (20 min)
    ];

    var currentLocationStep = 0;
    var locationCycleTimer = null;

    function advanceLocationStep() {
      // Remove active from all
      $('.location-text-item, .location-text-item-2, .circle-number').removeClass('active');

      // Set current step active
      var step = locationSteps[currentLocationStep];
      $('.location-text-item[data-step="' + currentLocationStep + '"]').addClass('active');
      $('.location-text-item-2[data-step="' + currentLocationStep + '"]').addClass('active');
      $('.circle-number[data-step="' + currentLocationStep + '"]').addClass('active');

      // Play Lottie from previous frame to current
      var fromFrame = currentLocationStep === 0 ? 0 : locationSteps[currentLocationStep - 1].frame;
      circleAnim.playSegments([fromFrame, step.frame], true);

      currentLocationStep = (currentLocationStep + 1) % locationSteps.length;
    }

    function startLocationCycle() {
      advanceLocationStep(); // Show first step immediately
      locationCycleTimer = setInterval(advanceLocationStep, 3500); // 3.5s per step
    }

    // Trigger on scroll into viewport
    var locationObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          startLocationCycle();
          locationObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    locationObserver.observe($locationSection[0]);
  }

  // -----------------------------------------------
  // Timeline -- Fixed progress line at 42%
  // PHP: backend will set actual construction progress value
  // -----------------------------------------------
  var $progressFill = $('.progress-line-fill');
  if ($progressFill.length) {
    var timelineProgressObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          $progressFill.css('width', '42%'); /* PHP: replace 42 with actual progress */
          timelineProgressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    timelineProgressObserver.observe($progressFill.closest('.timeline-section')[0]);
  }

  // -----------------------------------------------
  // Timeline -- Scroll-linked perspective animation
  // Background image expands from center (clip-path),
  // purple overlay rotates in with 3D perspective (rotateX)
  // -----------------------------------------------
  var $timelineSection = $('.timeline-section');
  var timelineCached = null;

  function cacheTimelinePositions() {
    if ($timelineSection.length) {
      timelineCached = {
        top: $timelineSection.offset().top,
        height: $timelineSection.outerHeight()
      };
    }
  }

  $(window).on('resize', cacheTimelinePositions);
  cacheTimelinePositions();

  var timelineRafId = null;
  $(window).on('scroll.timeline', function() {
    if (!timelineCached) return;
    if (timelineRafId) return;

    timelineRafId = requestAnimationFrame(function() {
      timelineRafId = null;
      var scrollY = window.pageYOffset;
      var viewH = window.innerHeight;
      var start = timelineCached.top - viewH;
      var end = timelineCached.top + timelineCached.height;

      if (scrollY < start || scrollY > end) return;

      var progress = (scrollY - start) / (end - start); // 0 to 1

      // Background image: expand clip-path from center
      // At progress=0 fully clipped (50%), at progress~0.5 fully visible (0%)
      var clipInset = Math.max(0, 50 - (progress * 100));
      $('.timeline-background-image').css(
        'clip-path', 'inset(' + clipInset + '%)'
      );

      // Purple overlay: rotateX from tilted (15deg) to flat (0deg)
      // Starts rotating in when progress > 0.2
      var rotateProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.5));
      var rotateX = 15 * (1 - rotateProgress);
      var contentOpacity = Math.min(1, rotateProgress * 1.5);
      $('.timeline-content').css({
        'transform': 'rotateX(' + rotateX + 'deg)',
        'opacity': contentOpacity
      });
    });
  });

  // -----------------------------------------------
  // Load mock apartment data (dev only)
  // Backend will replace with PHP server-rendering
  // -----------------------------------------------
  if ($('.apartment-table').length || $('.svg-hold').length) {
    $.getJSON('data/mock-apartments.json', function (data) {
      if (data && data.apartments) {
        initApartmentTable(data.apartments);
        initSvgMap(data.apartments);
      }
    });
  }

  // -----------------------------------------------
  // jQuery UI Datepicker — Lithuanian locale
  // -----------------------------------------------
  if ($('.datepicker').length) {
    $.datepicker.regional['lt'] = {
      closeText: 'Uždaryti',
      prevText: '&#x3C;Atgal',
      nextText: 'Pirmyn&#x3E;',
      currentText: 'Šiandien',
      monthNames: ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
        'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
      monthNamesShort: ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir',
        'Lie', 'Rgp', 'Rgs', 'Spa', 'Lap', 'Grd'],
      dayNames: ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis',
        'ketvirtadienis', 'penktadienis', 'šeštadienis'],
      dayNamesShort: ['sek', 'pir', 'ant', 'tre', 'ket', 'pen', 'šeš'],
      dayNamesMin: ['Se', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št'],
      weekHeader: 'SAV',
      dateFormat: 'yy-mm-dd',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['lt']);
    $('.datepicker').datepicker();
  }

  // -----------------------------------------------
  // Fancybox initialization
  // -----------------------------------------------
  if (typeof $.fancybox !== 'undefined') {
    $('[data-fancybox]').fancybox({
      loop: true,
      buttons: ['zoom', 'close'],
      thumbs: { autoStart: true }
    });
  }

  // -----------------------------------------------
  // Apartment table rendering
  // -----------------------------------------------
  function initApartmentTable(apartments) {
    var $tbody = $('.apartment-table tbody');
    if (!$tbody.length) return;

    apartments.forEach(function (apt) {
      var statusText = {
        'available': 'Laisvas',
        'reserved': 'Rezervuotas',
        'sold': 'Parduotas'
      };

      var $row = $('<tr>')
        .addClass('tr-status-' + apt.status)
        .attr('data-apartment-id', apt.svg_polygon_id)
        .html(
          '<td>' + apt.number + '</td>' +
          '<td>' + apt.rooms + '</td>' +
          '<td>' + apt.area + ' m²</td>' +
          '<td>' + apt.price.toLocaleString('lt-LT') + ' €</td>' +
          '<td><span class="status-badge status-' + apt.status + '">' +
          (statusText[apt.status] || apt.status) + '</span></td>'
        );

      $tbody.append($row);
    });
  }

  // -----------------------------------------------
  // SVG map initialization
  // -----------------------------------------------
  function initSvgMap(apartments) {
    apartments.forEach(function (apt) {
      var $polygon = $('#' + apt.svg_polygon_id);
      if ($polygon.length) {
        $polygon
          .addClass('status-' + apt.status)
          .attr('data-apartment-id', apt.svg_polygon_id);
      }
    });

    // SVG polygon click handler
    $(document).on('click', '.apartment-polygon', function () {
      var aptId = $(this).attr('id');
      // Highlight corresponding table row
      $('.apartment-table tr').removeClass('active');
      $('.apartment-table tr[data-apartment-id="' + aptId + '"]').addClass('active');
    });

    // Table row click highlights SVG polygon
    $(document).on('click', '.apartment-table tr[data-apartment-id]', function () {
      var aptId = $(this).data('apartment-id');
      $('.apartment-polygon').removeClass('active');
      $('#' + aptId).addClass('active');
    });
  }

});
