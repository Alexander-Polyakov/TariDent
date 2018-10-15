
ymaps.ready(init);

var map;


function init(){
    map = new ymaps.Map ("map", {
        center: [55.753215, 37.622504],
        zoom: 8,
        controls: []
    });

    map.behaviors.disable('scrollZoom');
    map.behaviors.disable('multiTouch');


    //{options: { position: { left: 30, bottom: 30 }}}
    map.controls.add(new ymaps.control.ZoomControl());

    var collection =  document.getElementsByClassName('map-radio-box__input');

    [].forEach.call(collection, function (el) {
        var coords = el.dataset.coords.split(',');

        var placemark = new ymaps.Placemark(coords, {
            balloonContentHeader: el.dataset.title,
            balloonContentBody: el.dataset.address,
            hintContent: el.dataset.title
        });

        placemark.events.add('click', function (e) {
            el.click();
        });

        el.addEventListener('click', function () {
            placemark.balloon.open();
        });

        map.geoObjects.add(placemark);
    });


}

