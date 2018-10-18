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
        $('body').addClass('ovh');
        if (popupName == 'video') {
            var videoSrc = _this.data('video-src');
            $(".js-popup-video").attr('src', videoSrc);
        }
        $('.js-popups-overlay').fadeIn(400);
        $('.js-popups').fadeIn(400);
        $('[data-popup-name='+popupName+']').addClass('active');
    }


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

    $('.js-field-label .field-label__field').bind('blur', function(){
        if ($(this).val() == '') {
            $(this).closest(".js-field-label").removeClass("focused");
        }
    });

    $('.js-field-label .field-label__field').bind('focus', function(){
        $(this).closest(".js-field-label").addClass("focused");
    });


    $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-9999"});

});