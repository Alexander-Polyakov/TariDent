$(document).ready(function() {
    ymaps.ready(function () {
        var center = [51.656843, 39.2075939];
        var myMap = new ymaps.Map('map', {
            center: center,
            zoom: 17,
            controls: ['zoomControl']
        });
        myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

        }, {

        });


        myMap.geoObjects.add(myPlacemark);
    });


    // $(".js-accordion").each(function () {
    //     var _this = $(this),
    //         accordionItems = _this.find('.description-box'),
    //         accordionButtons = _this.find('.description-box__header'),
    //         accordionContents = _this.find('.description-box__main'),
    //         removeOpened = function(target){
    //             target.removeClass('opened');
    //         };
    //
    //
    //     accordionButtons.click(function () {
    //         accordionContents.slideUp(500);
    //
    //         console.log($(this));
    //
    //     });
    // });

    $(".js-page-fz").click(function () {
        var fz = $(this).data("page-fz"),
            color = $(".js-color-scheme.active").data("color-scheme");
       $(".js-page-fz").removeClass("active");
       $(this).addClass("active");

       $('body').attr("class", "page-fz-"+fz+" color-scheme-"+color+"");

    });

    $(".js-color-scheme").click(function () {
        var color = $(this).data("color-scheme"),
            fz = $(".js-page-fz.active").data("page-fz");
        $(".js-color-scheme").removeClass("active");
        $(this).addClass("active");

        $('body').attr("class", "page-fz-"+fz+" color-scheme-"+color+"");

    });

    $(".js-impaired-toggle").click(function () {
        $('.page-header').toggleClass('impaired-opened');
        $(".page-header__impaired-section").slideToggle(400);
        $('body').attr("class", "");
        $('body').addClass("color-scheme-white");
    });

    $(".description-box_accordion .description-box__header").click(function () {
        var thisBl = $(this).closest('.description-box_accordion'),
            thisContent = thisBl.find('.description-box__main');
        thisContent.slideToggle(300, function () {
            thisBl.toggleClass("opened");
       });
    });


    $(".js-small-slider").owlCarousel({
        dots: true,
        nav: true,
        margin: 0,
        items: 1,
        loop: true 
    });

    // METHODS
    function openPopup(popupName, _this){
        $('body').addClass('ovh');

        if (popupName == 'video') {
            var videoSrc = _this.data('video-src');
            $(".js-popup-video").attr('src', videoSrc);
        }

        $('.js-popups-overlay').fadeIn(400);
        $('.js-popups').fadeIn(400);

        $('[data-popup-name='+popupName+']').addClass('active');
    }


    var carouselGallery = $(".js-carousel-gallery");

    if ($(window).outerWidth() < 768) {
        carouselGallery.owlCarousel({
            dots: false,
            nav: false,
            margin: 15,
            responsive:{
                0:{
                    items: 1,
                    nav: true
                },
                500:{
                    items: 2,
                    nav: true
                }
            }
        });
    }

    var sync1 = $(".js-full-slider");
    var sync2 = $(".js-carousel");
    var slidesPerPage = 1;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items : 1,
        slideSpeed : 2000,
        nav: true,
        dots: false,
        loop: true,
        responsiveRefreshRate : 200,
        responsive:{
            0:{
                nav: true
            },
            992:{
                nav: true
            }
        }
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : 5,
            dots: false,
            margin: 15,
            nav: false,
            smartSpeed: 200,
            slideSpeed : 500,
            mouseDrag: false,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate : 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);

        if(current < 0) {
            current = count;
        }
        if(current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

    $(".slider-carousel").owlCarousel({
        nav: true,
        slideSpeed: 2000,
        dots: false,
        loop: true,
        margin: 30,
        responsiveRefreshRate: 200,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            767: {
                items: 3
            },
            992: {
                nav: true,
                items: 4
            }
        }
    })


    $(".js-promo-slider").owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop: true,
        margin: 30,
        responsiveRefreshRate: 200,
        responsive: {
            0: {
                nav: true
            },
            992: {
                nav: true
            }
        }
    });


    var $grid = $('.masonry-grid').isotope({
        itemSelector: '.masonry-grid__item',
        layoutMode: 'masonry',
        filter: '.kitchen'
    });

    $('.filters-button-group').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });


    ///////////////////////////



    $(".js-collapse-button").click(function(){
       var _this = $(this).closest('.js-collapse-parent'),
           target = _this.find('.js-collapse-dropdown');


        target.slideToggle(400, function(){
            _this.toggleClass("opened");
        });

    });

    $('.js-page-menu-open').click(function () {
        $('body').addClass('ovh');

        $('.js-page-menu').addClass("opened");
        $('.js-popups-overlay').fadeIn(400);
    });


    $('.js-page-menu-close').click(function () {
        $('body').removeClass('ovh');

        $('.js-page-menu').removeClass("opened");
        $('.js-popups-overlay').fadeOut(400);
    });


    $(".js-dropmenu-toggle").click(function (e) {
        e.preventDefault();
        $(this).closest(".main-nav").toggleClass('dropmenu-opened');
        // $(this).closest(".js-dropmenu").find(".main-nav-item__dropmenu").slideToggle('400');
    });


    $("[data-fancybox]").fancybox({
        thumbs : {
            autoStart : true
        }
    });

    $(".js-header-basket").hover(function(){
        $(this).addClass("opened");
    }, function(){
        $(this).removeClass("opened");
    });

    $(".js-header-basket .basket-box__close").click(function () {
       $(this).closest('.js-header-basket').removeClass("opened");
    });


    $('.js-open-popup').click(function (e) {
        e.preventDefault();
        var targetPopup = $(this).data('target-popup');

        openPopup(targetPopup, $(this));
    });

    $(".js-close-popups").click(function () {
        $('body').removeClass('ovh');

        $(".js-popup-video").attr('src', '');
        $('.js-popups-overlay').fadeOut(400);
        $('.js-popups').fadeOut(400);

        $('[data-popup-name]').removeClass('active');
    });


    $(".js-toggle-content").on('click', '.toggle-content__button', function(){
        var thisBlock = $(this).closest('.js-toggle-content'),
            index = $(this).index();

        thisBlock.find('.toggle-content__button').removeClass("active");
        thisBlock.find('.toggle-content__content-item').removeClass('active');
        thisBlock.find('.toggle-content__content-item').eq(index).addClass("active");
        $(this).addClass("active");
    });

    // $(".js-toggle-dropmenu").click(function(){
    //     var item = $(this).closest('.main-nav-item');
    //     item.toggleClass('opened');
    //     item.find(".main-nav-item__dropmenu").stop().slideToggle(400);
    // });

    $('.js-counter').each(function(){
        var _this = $(this),
            field = _this.find(".counter__field"),
            value,
            minus = _this.find(".counter__button_minus"),
            plus = _this.find(".counter__button_plus");

        minus.click(function () {
            value = +field.val();
            if (value > 1) {
                field.val(value-1);
            }
        });

        plus.click(function () {
            value = +field.val();
            field.val(value+1);

        });
    });



    $(".js-checkbox-toggle").change(function(){
        var _id = $(this).attr('id'),
            _target = $('[data-checkbox-toggle-target='+_id+']');

        if ($(this).is(':checked')) {
            _target.stop().slideDown(300);
        } else {
            _target.stop().slideUp(300);
        }
    });


    $(".js-video-dummy").click(function (event) {
        var video = $(this).find('.video-box__video'),
            oldSrc = video.attr('src');

        video.show();
        video.attr('src', oldSrc+'&autoplay=1');
        event.preventDefault();
    });


    $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-9999"});


    $(".js-order-step-button").click(function(){
        $(this).closest('.step-box').validate();

    });



    var products = [
        {
            value: "Мебельный кондуктор \"угольник\" шаг 25/50 диаметр втулки 7мм. Можно ставить шканты",
            image: "./images/examples/closet.jpg",
            link: "/product-card.html"
        },
        {
            value: "Мебельный кондуктор \"угольник\" шаг 25/50 диаметр втулки 7мм. Можно ставить шканты",
            image: "./images/examples/closet.jpg",
            link: "/product-card.html"
        },
        {
            value: "Мебельный кондуктор \"угольник\" шаг 25/50 диаметр втулки 7мм. Можно ставить шканты",
            image: "./images/examples/closet.jpg",
            link: "/product-card.html"
        },
        {
            value: "Мебельный кондуктор \"угольник\" шаг 25/50 диаметр втулки 7мм. Можно ставить шканты",
            image: "./images/examples/closet.jpg",
            link: "/product-card.html"
        },
        {
            value: "Мебельный кондуктор \"угольник\" шаг 25/50 диаметр втулки 7мм. Можно ставить шканты",
            image: "./images/examples/closet.jpg",
            link: "/product-card.html"
        },
        {
            value: "Мебельный кондуктор \"угольник\" шаг 25/50 диаметр втулки 7мм. Можно ставить шканты",
            image: "./images/examples/closet.jpg",
            link: "/product-card.html"
        }
    ];

    // $( ".js-search-header" ).autocomplete({
    //     minLength: 0,
    //     source: products
    // }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
    //     return $( "<li>" )
    //         .data( "ui-autocomplete-item", item )
    //         .append( "<a href="+item.link+"> <img src="+item.image+"><br>" + item.value + "</a>" )
    //         .appendTo( ul );
    // };


    var sidebarParent = $(".js-sidebar-parent");


    if (sidebarParent.length) {
        var priceBoxPos = sidebarParent.offset().top,
            totalPriceBox = $(".js-total-price-box");

        function totalPriceBoxPosition() {
            if ($(document).scrollTop() >  priceBoxPos) {
                totalPriceBox.addClass("fixed");
            } else {
                totalPriceBox.removeClass("fixed");
            }
        }

        totalPriceBoxPosition();

        $(window).scroll(function () {
            if ($(document).outerWidth() > 992) {
                totalPriceBoxPosition();
            }
        });
    }



    $(".js-toggle-search").click(function () {
       $(".page-header").toggleClass("search-opened");
    });


});