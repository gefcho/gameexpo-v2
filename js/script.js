(function ($) {
    "use strict"; // this function is executed in strict mode

    $(function () {
        
        /* -------------------------------------------------------------------------*
         * HOME COLUMNS HEIGHT EQUAL TO WINDOW HEIGHT
         * -------------------------------------------------------------------------*/
        $('.home-content, .home-image').css({
            'min-height': $(window).outerHeight()
        });
        
        $(window).on('resize', function () {
            $('.home-content, .home-image').css({
                'min-height': $(window).outerHeight()
            });
        });
        
        /* -------------------------------------------------------------------------*
         * COUNTDOWN
         * -------------------------------------------------------------------------*/
        $('[data-countdown]').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                $this.html(event.strftime('<p class="countdown-days"><span class="value">%-D</span> <span class="text">дни</span></p> <p class="countdown-hours"><span class="value">%-H</span> <span class="text">часы</span></p> <p class="countdown-minutes"><span class="value">%M</span> <span class="text">минуты</span></p> <p class="countdown-second"> <span class="value">%S</span> <span class="text">секунды</span></p>'));
            });
        });
        
        /* -------------------------------------------------------------------------*
         * ANIMATE SCROLL
         * -------------------------------------------------------------------------*/
        $('#navigation li a, .back-to-top a, .scroll').on('click', function (e) {
            e.preventDefault();
            var attr = $(this).attr('href');
            $(attr).animatescroll({
                padding: -1,
                easing: 'easeInOutExpo', //swing, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine, easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc, easeInElastic, easeOutElastic, easeInOutElastic, easeInBack, easeOutBack, easeInOutBack, easeInBounce, easeOutBounce, easeInOutBounce
                scrollSpeed: 2000
            });
        });
        
        /* -------------------------------------------------------------------------*
         * LIGHT GALLERY
         * -------------------------------------------------------------------------*/
        $('#gallery').lightGallery({
            selector: '.gallery-item',
            thumbnail: true
        });
        $('#video').lightGallery({
            youtubePlayerParams: {
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                controls: 0
            },
        }); 

        /* -------------------------------------------------------------------------*
         * wowJS
         * -------------------------------------------------------------------------*/
        if ( $('.wow').length ) {
            var wow = new WOW();
            wow.init();
        }
        
        /* -------------------------------------------------------------------------*
         * PROGRESS BAR ANIMATIONS
         * -------------------------------------------------------------------------*/
        if ( $('.progress-bar').length ) {
            var waypoint = new Waypoint({
                element: $('.progress-bar'),
                handler: function (direction) {
                    $('.progress-bar').each(function () {
                        var bar_value = $(this).attr('aria-valuenow') + '%';
                        $(this).css("width", bar_value);
                    });
                    this.destroy();
                },
                offset: '100%'
            });
        }
        
        if ( $('#about').length ) {
            var waypoint2 = new Waypoint({
                element: $('#about'),
                handler: function (direction) {
                    $('.back-to-top').toggleClass('show');
                    $('.menu-toggle-btn, .menu-toggle-btn button').toggleClass('fixed');
                },
                offset: '80%'
            });
        }
        
        /* -------------------------------------------------------------------------*
         * OWL CARSOUSEL
         * -------------------------------------------------------------------------*/
        var homeSlider = $(".home-slider")
        ,   testimonialSlider = $('.testimonial-slider')
        ,   teamSlider = $('.team-members')
        ,   aboutPageTeamSlider = $('.about-page-team-members')
        ,   pressSlider = $('.press-items')
        ,   postImageSlider = $('.blog-page-post-slider');

        if ( homeSlider.length ) {
            homeSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true,
                addClassActive : true
            });
            $(".owl-next-button").on('click', function () {
                homeSlider.trigger('owl.next');
            });
            $(".owl-prev-button").on('click', function () {
                homeSlider.trigger('owl.prev');
            });
        }

        if ( testimonialSlider.length ) {
            testimonialSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true,
                dots: true
            });
        }

        if ( teamSlider.length ) {
            teamSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                items : 3,
                itemsDesktop: [1000,2],
                autoPlay: false,
                navigation: true, // Show next and prev buttons
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });
        }

        if ( aboutPageTeamSlider.length ) {
            aboutPageTeamSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                items: 2,
                itemsDesktop: [1000,2], //5 items between 1000px and 901px
                autoPlay: false,
                navigation: true, // Show next and prev buttons
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });
        }

        if ( pressSlider.length ) {
            pressSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 600,
                items : 4,
                autoPlay: true,
                navigation: true, // Show next and prev buttons
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });
        }

        if ( postImageSlider.length ) {
            postImageSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true,
                navigation: false
            });
            $(".blog-page-post-slider-controls .owl-next-button").on('click', function () {
                postImageSlider.trigger('owl.next');
            });
            $(".blog-page-post-slider-controls .owl-prev-button").on('click', function () {
                postImageSlider.trigger('owl.prev');
            });
        }
        
        /* -------------------------------------------------------------------------*
         * COUNTER
         * -------------------------------------------------------------------------*/
        if ( $('.counter-number').length ) {
            $('.counter-number').counterUp({
                delay: 1,
                time: 250
            });
        }

        /* -------------------------------------------------------------------------*
         * REPAIR PARRALAX AFTER TABS AND ACCORDION
         * -------------------------------------------------------------------------*/

        $(window).on('shown.bs.collapse hidden.bs.collapse, hidden.bs.collapse shown.bs.collapse, shown.bs.tab', function() {
            $(window).trigger('resize.px.parallax');
        });
        
        /* -------------------------------------------------------------------------*
         * TOGGLE OFF-CANVAS MENU
         * -------------------------------------------------------------------------*/
        var offCanvasMenu = $('#off-canvas-menu');
        
        $('.menu-toggle-btn button').on('click', function () {
            offCanvasMenu.toggleClass('menu-open');
        });
        
        $(document).mouseup(function (e) {
            e.preventDefault();
            if (!offCanvasMenu.is(e.target) && offCanvasMenu.has(e.target).length === 0) {
                offCanvasMenu.removeClass('menu-open');
            }
        });

        offCanvasMenu.on('click', 'a.scroll', function (e) {
            if ($(e.target).is('a')) {
                offCanvasMenu.removeClass('menu-open');
            }
            e.preventDefault();
        });
        
    });

    $(window).on('load', function () {
        /* -------------------------------------------------------------------------*
         * TOOLTIP
         * -------------------------------------------------------------------------*/
        if ($('[data-toggle="tooltip"]').length) {
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover manual'
            });
        }
        
        $('#navigation li.active').tooltip('show');
        
        $('#navigation').on('activate.bs.scrollspy', function (event) {
            $(this).children('ul').children('li').not('.active').tooltip('hide');
            $(this).children('ul').children('li.active').tooltip('show');
        });
        
        /* -------------------------------------------------------------------------*
         * PRELOADER
         * -------------------------------------------------------------------------*/
        $(".preloader-holder").fadeOut('slow');

    });
    
})(jQuery);
