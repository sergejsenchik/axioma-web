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
  // About -- Digit-train counter animation
  // -----------------------------------------------
  var $counterWrap = $('.counter-cards-wrap');
  if ($counterWrap.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).find('.counter-train').each(function () {
            var target = parseInt($(this).data('target'), 10);
            var pct = target * 100;
            $(this).css('transform', 'translate3d(0, -' + pct + '%, 0)');
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
