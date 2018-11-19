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

        });


        myMap.geoObjects.add(myPlacemark);
    });


    var scrollSettings = getBrowserScrollSize();

    function getBrowserScrollSize() {
        var css = {
            "border": "none",
            "height": "200px",
            "margin": "0",
            "padding": "0",
            "width": "200px"
        };

        var inner = $("<div>").css($.extend({}, css));
        var outer = $("<div>").css($.extend({
            "left": "-1000px",
            "overflow": "scroll",
            "position": "absolute",
            "top": "-1000px"
        }, css)).append(inner).appendTo("body")
            .scrollLeft(1000)
            .scrollTop(1000);

        var scrollSize = {
            "height": (outer.offset().top - inner.offset().top) || 0,
            "width": (outer.offset().left - inner.offset().left) || 0
        };

        outer.remove();
        return scrollSize;
    }

    $(".js-mobile-contacts-toggle").click(function () {
        $(".page-header__contacts-section").stop().slideToggle(400);
    });


    $(".js-dropmenu-toggle").click(function (e) {
        e.preventDefault();
        $(this).closest(".js-dropmenu-item").toggleClass('opened');
        $(this).closest(".js-dropmenu-item").children(".sidebar-menu__dropdown").stop().slideToggle('400');
    });

    function impairedOptions(){
        var color =  $("[data-color-scheme].active").data("color-scheme"),
            font =  $("[data-page-fz].active").data("page-fz");

        if ($("body").hasClass('impaired-opened')) {
            $("body").attr({ 'data-body-fz': font, 'data-body-scheme' : color });
        } else {
            $("body").attr({ 'data-body-fz': "16", 'data-body-scheme' : 'normal' });
        }

    }

    $(".js-page-fz").click(function () {
       $(".js-page-fz").removeClass("active");
       $(this).addClass("active");

        impairedOptions();
    });

    $(".js-color-scheme").click(function () {
        $(".js-color-scheme").removeClass("active");
        $(this).addClass("active");

        impairedOptions();
    });

    $(".js-impaired-toggle").click(function () {
        $("body").toggleClass('impaired-opened');
        $(".page-header__impaired-section").slideToggle(400);

        impairedOptions();
    });

    $(".js-collapse-button").click(function(){
        var _this = $(this).closest('.js-collapse-parent'),
            target = _this.find('.js-collapse-dropdown');


        target.slideToggle(400, function(){
            _this.toggleClass("opened");
        });

    });

    $(".js-small-slider").owlCarousel({
        dots: true,
        nav: true,
        margin: 0,
        items: 1,
        loop: true
    });

    function openPopup(popupName, _this){
        console.log(scrollSettings);
        $('body').addClass('ovh').css("padding-right", scrollSettings.width);

        if (popupName == 'video') {
            var videoSrc = _this.data('video-src');
            $(".js-popup-video").attr('src', videoSrc);
        }
        $('.js-popups-overlay').fadeIn(400);
        $('.js-popups').fadeIn(400);
        $('[data-popup-name='+popupName+']').addClass('active');
    }


    $('.js-page-menu-open').click(function () {
        $('body').addClass('ovh').css("padding-right", scrollSettings.width);

        $('.js-page-menu').addClass("opened");
        $('.js-popups-overlay').fadeIn(400);
    });


    $('.js-page-menu-close').click(function () {
        $('body').removeClass('ovh').css("padding-right", "");

        $('.js-page-menu').removeClass("opened");
        $('.js-popups-overlay').fadeOut(400);
    });

    $('.js-open-popup').click(function (e) {
        e.preventDefault();
        var targetPopup = $(this).data('target-popup');

        openPopup(targetPopup, $(this));
    });

    $(".js-close-popups").click(function () {
        $('body').removeClass('ovh').css("padding-right", "");

        $(".js-popup-video").attr('src', '');
        $('.js-popups-overlay').fadeOut(400);
        $('.js-popups').fadeOut(400);

        $('[data-popup-name]').removeClass('active');
    });

    $('.js-field-label .field-label__field').bind('blur', function(){
        if ($(this).val() == '') {
            $(this).closest(".js-field-label").removeClass("focused");
        }
    });

    $('.js-field-label .field-label__field').bind('focus', function(){
        $(this).closest(".js-field-label").addClass("focused");
    });


    $(".description-box .js-full-descr").click(function () {
        $(this).closest(".description-box").addClass("full-text");
    });


    $(".js-scroll-top").click(function () {
        $('body, html').animate({scrollTop:0},800)
    });
});