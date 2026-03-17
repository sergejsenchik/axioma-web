/**
 * Axioma — Main Script
 * All custom interactions for the Axioma website
 */

$(document).ready(function () {

  // -----------------------------------------------
  // Intro loader screen (homepage only, once per session)
  // -----------------------------------------------
  var $introLoader = $('#intro-loader');
  if ($introLoader.length) {
    if (sessionStorage.getItem('axioma-intro-shown')) {
      $introLoader.remove();
    } else {
      sessionStorage.setItem('axioma-intro-shown', '1');

      // Hide hero elements before loader finishes
      $('.hero-heading-wrap').addClass('hero-reveal-hidden');
      $('.site-navbar').addClass('navbar-reveal-hidden');
      $('.hero-scroll-down, .hero-nav').addClass('hero-ui-reveal-hidden');

      setTimeout(function () {
        // Fade out loader
        $introLoader.addClass('fade-out');

        // Sequence: bg visible → heading+CTA → navbar → scroll/arrows
        setTimeout(function () { $('.hero-heading-wrap').addClass('hero-revealed'); }, 200);
        setTimeout(function () { $('.site-navbar').addClass('hero-revealed'); }, 500);
        setTimeout(function () { $('.hero-scroll-down, .hero-nav').addClass('hero-revealed'); }, 800);

        setTimeout(function () {
          $introLoader.remove();
          // Clean up classes
          $('.hero-heading-wrap').removeClass('hero-reveal-hidden hero-revealed');
          $('.site-navbar').removeClass('navbar-reveal-hidden hero-revealed');
          $('.hero-scroll-down, .hero-nav').removeClass('hero-ui-reveal-hidden hero-revealed');
        }, 1500);
      }, 2500);
    }
  }

  // -----------------------------------------------
  // Hero Slider -- Crossfade, 9s auto-advance, slow zoom
  // -----------------------------------------------
  var $heroSlides = $('.hero-slide');
  if ($heroSlides.length > 1) {
    var slideCount = $heroSlides.length;
    var currentSlide = 0;
    var slideInterval = 6000;
    var heroTimer;

    function startZoom($slide) {
      var $bg = $slide.find('.hero-slide-bg-img');
      if ($bg.length) {
        $bg.css({ transform: 'scale(1)', transition: 'none' });
        // Force reflow then start zoom
        $bg[0].offsetHeight;
        $bg.css({ transform: 'scale(1.4)', transition: 'transform ' + (slideInterval / 1000) + 's ease-out' });
      }
    }

    function resetZoom($slide) {
      var $bg = $slide.find('.hero-slide-bg-img');
      if ($bg.length) {
        $bg.css({ transform: 'scale(1)', transition: 'none' });
      }
    }

    function goToSlide(index) {
      var $prev = $heroSlides.eq(currentSlide);
      $prev.removeClass('active');
      resetZoom($prev);
      currentSlide = index % slideCount;
      var $next = $heroSlides.eq(currentSlide);
      $next.addClass('active');
      startZoom($next);
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

    // Start zoom on first active slide
    startZoom($heroSlides.eq(currentSlide));
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
  // Navbar: transparent at top, purple on scroll
  // -----------------------------------------------
  var navbarScrollThreshold = 50;

  $(window).on('scroll', function () {
    var currentScrollY = window.pageYOffset;

    if (currentScrollY > navbarScrollThreshold) {
      $('.site-navbar').addClass('navbar-scrolled');
    } else {
      $('.site-navbar').removeClass('navbar-scrolled');
    }
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

  // Image reveal — separate observer with bottom margin
  // so animation starts only when image is well into viewport
  var $imageRevealElements = $('.image-reveal');
  if ($imageRevealElements.length) {
    var imageRevealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('revealed');
          imageRevealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });

    $imageRevealElements.each(function () {
      imageRevealObserver.observe(this);
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
  // Location -- Scroll-linked circle + text rotation
  // -----------------------------------------------
  var $locationSection = $('.location-section');
  if ($locationSection.length) {
    var $circleArcFill = $('.circle-arc-fill');
    var circleCircumference = 2054.87; // 2 * PI * 327
    var locationActiveStep = -1;

    // Steps: scroll ranges map to destination + arc percentage
    // Arc percentages match Webflow: 20%, 30%, 40%, 60%, 100%
    var locationSteps = [
      { arc: 0.20 },  // Step 0: Park / By the river (5 min)
      { arc: 0.30 },  // Step 1: City center / On foot (8 min)
      { arc: 0.40 },  // Step 2: Shopping mall (10 min)
      { arc: 0.60 },  // Step 3: Highschool campus (15 min)
      { arc: 1.00 }   // Step 4: Airport / With car (20 min)
    ];

    // Scroll keyframes (% of section scroll progress) matching Webflow
    // Each step has a "hold" range and a "transition" range
    var stepRanges = [
      { start: 0.00, end: 0.20 },  // Step 0: 0-20%
      { start: 0.20, end: 0.38 },  // Step 1: 20-38%
      { start: 0.38, end: 0.56 },  // Step 2: 38-56%
      { start: 0.56, end: 0.74 },  // Step 3: 56-74%
      { start: 0.74, end: 1.00 }   // Step 4: 74-100%
    ];

    function setLocationStep(stepIndex) {
      if (stepIndex === locationActiveStep) return;
      var prevStep = locationActiveStep;
      locationActiveStep = stepIndex;

      // Remove all states
      $('.location-text-item, .location-text-item-2, .circle-number').removeClass('active prev');

      // Mark previous step items as .prev (slide up and out)
      if (prevStep >= 0) {
        $('.location-text-item[data-step="' + prevStep + '"]').addClass('prev');
        $('.location-text-item-2[data-step="' + prevStep + '"]').addClass('prev');
        $('.circle-number[data-step="' + prevStep + '"]').addClass('prev');
      }

      // Mark current step items as .active (slide in from below)
      $('.location-text-item[data-step="' + stepIndex + '"]').addClass('active');
      $('.location-text-item-2[data-step="' + stepIndex + '"]').addClass('active');
      $('.circle-number[data-step="' + stepIndex + '"]').addClass('active');
    }

    function updateLocationArc(progress) {
      // Determine which step we're in
      var stepIndex = 0;
      for (var i = 0; i < stepRanges.length; i++) {
        if (progress >= stepRanges[i].start) {
          stepIndex = i;
        }
      }

      setLocationStep(stepIndex);

      // Interpolate arc within current step range
      var range = stepRanges[stepIndex];
      var stepProgress = Math.min(1, (progress - range.start) / (range.end - range.start));

      // Ease the arc: lerp from previous arc to current arc
      var prevArc = stepIndex > 0 ? locationSteps[stepIndex - 1].arc : 0;
      var targetArc = locationSteps[stepIndex].arc;
      var currentArc = prevArc + (targetArc - prevArc) * stepProgress;

      // Set SVG stroke-dashoffset
      var dashoffset = circleCircumference * (1 - currentArc);
      $circleArcFill.attr('stroke-dashoffset', dashoffset);
    }

    // Cache section position
    var locationCached = null;
    function cacheLocationPosition() {
      locationCached = {
        top: $locationSection.offset().top,
        height: $locationSection.outerHeight()
      };
    }
    $(window).on('resize', cacheLocationPosition);
    cacheLocationPosition();

    // Set initial state
    updateLocationArc(0);

    // Scroll handler with rAF
    var locationRafId = null;
    $(window).on('scroll', function() {
      if (!locationCached) return;
      if (locationRafId) return;

      locationRafId = requestAnimationFrame(function() {
        locationRafId = null;
        var scrollY = window.pageYOffset;
        var viewH = window.innerHeight;
        var start = locationCached.top;
        var end = locationCached.top + locationCached.height - viewH;

        if (scrollY < start || scrollY > end) return;

        var progress = (scrollY - start) / (end - start);
        progress = Math.max(0, Math.min(1, progress));

        updateLocationArc(progress);
      });
    });
  }

  // -----------------------------------------------
  // Timeline -- Scroll-linked pinned animation
  // Section is 400vh tall with sticky inner container (pinned for 300vh).
  // Keyframes are scaled to fit within the pinned range (unpin at 80%).
  //
  // 1. Background image: grows 50%/60% → 100%/100%, scale 1.2→1.0 (32-60%)
  // 2. Purple overlay: translateY 150→0% + rotateX 90→0deg (54-62%)
  // 3. Progress line: translateX slides in to construction progress (62-76%)
  //
  // Webflow ref: a-249 "Discover Image Animation", a-282 "Progress line"
  // -----------------------------------------------
  var $timelineSection = $('.timeline-section');
  if ($timelineSection.length) {
    var $timelineBg = $timelineSection.find('.timeline-background-image');
    var $timelineImg = $timelineSection.find('.timeline-image');
    var $timelineContent = $timelineSection.find('.timeline-content');
    var $progressFill = $timelineSection.find('.progress-line-fill');
    var timelineCached = null;

    function cacheTimelinePositions() {
      timelineCached = {
        top: $timelineSection.offset().top,
        height: $timelineSection.outerHeight()
      };
    }

    $(window).on('resize', cacheTimelinePositions);
    cacheTimelinePositions();

    // Mobile/tablet detection for vertical timeline layout
    var isTabletOrMobile = window.innerWidth <= 1024;

    if (isTabletOrMobile) {
      // Static layout for background and content
      $timelineBg.css({ 'width': '100%', 'height': '' });
      $timelineImg.css('transform', 'none');
      $timelineContent.css('transform', 'none');

      // Timeline card reveal animation (slide in from left)
      var $timelineCards = $timelineSection.find('.timeline-card');
      var cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            $(entry.target).addClass('revealed');
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      $timelineCards.each(function() {
        cardObserver.observe(this);
      });

      // Vertical progress line scroll-linked animation
      var $timelineGrid = $timelineSection.find('.timeline-grid');
      var verticalRafId = null;
      $(window).on('scroll.timeline-vertical', function() {
        if (verticalRafId) return;
        verticalRafId = requestAnimationFrame(function() {
          verticalRafId = null;
          var scrollY = window.pageYOffset;
          var viewH = window.innerHeight;
          var gridOffset = $timelineGrid.offset();
          if (!gridOffset) return;
          var gridTop = gridOffset.top;
          var gridHeight = $timelineGrid.outerHeight();
          var progress = (scrollY + viewH - gridTop) / gridHeight;
          progress = Math.max(0, Math.min(1, progress));
          // Target: 42% fill (construction progress, same as desktop -58%)
          var translateY = -100 + 42 * progress;
          $progressFill.css('transform', 'translateY(' + translateY + '%)');
        });
      });
    }

    // Linear interpolation helper
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    // Map scroll progress within a keyframe range to 0-1
    function rangeProgress(progress, start, end) {
      if (progress <= start) return 0;
      if (progress >= end) return 1;
      return (progress - start) / (end - start);
    }

    var timelineRafId = null;

    // Only bind scroll-linked animation on desktop (>1024px)
    if (!isTabletOrMobile) {
      $(window).on('scroll.timeline', function() {
        if (!timelineCached) return;
        if (timelineRafId) return;

        timelineRafId = requestAnimationFrame(function() {
          timelineRafId = null;
          var scrollY = window.pageYOffset;
          var viewH = window.innerHeight;

          // Progress matches Webflow SCROLLING_IN_VIEW (startsEntering: true):
          // 0% = section top enters viewport from bottom
          // 100% = section bottom exits viewport from top
          var start = timelineCached.top - viewH;
          var end = timelineCached.top + timelineCached.height;

          if (scrollY < start || scrollY > end) return;

          var progress = (scrollY - start) / (end - start);
          progress = Math.max(0, Math.min(1, progress));

          // Convert to Webflow's 0-100 scroll percentage scale
          var pct = progress * 100;

          // --- 1. Background image size + scale (32-60%) ---
          var bgT = rangeProgress(pct, 32, 60);
          var bgW = lerp(50, 100, bgT);
          var bgH = lerp(60, 100, bgT);
          $timelineBg.css({ 'width': bgW + '%', 'height': bgH + '%' });
          $timelineImg.css('transform', 'scale(' + lerp(1.2, 1.0, bgT) + ')');

          // --- 2. Purple overlay animation (54-62%) ---
          // translateY 150→0% + rotateX 90→0deg simultaneously
          if (pct <= 54) {
            $timelineContent.css('transform', 'translateY(150%) rotateX(90deg)');
          } else if (pct <= 62) {
            var t2 = rangeProgress(pct, 54, 62);
            $timelineContent.css('transform', 'translateY(' + lerp(150, 0, t2) + '%) rotateX(' + lerp(90, 0, t2) + 'deg)');
          } else {
            $timelineContent.css('transform', 'translateY(0%) rotateX(0deg)');
          }

          // --- 3. Progress line fill animation (62-76%) ---
          // PHP: backend sets progressTarget (42% done = translateX(-58%))
          var progressTarget = -58;
          var progressTranslateX;
          if (pct <= 62) {
            progressTranslateX = -100;
          } else if (pct <= 76) {
            progressTranslateX = lerp(-100, progressTarget, rangeProgress(pct, 62, 76));
          } else {
            progressTranslateX = progressTarget;
          }

          $progressFill.css('transform', 'translateX(' + progressTranslateX + '%)');
        });
      });
    }
  }

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
