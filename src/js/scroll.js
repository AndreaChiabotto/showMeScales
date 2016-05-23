/**
 * Created by andreachiabotto on 21/04/16.
 */

(function () {


    var margin = 0;


    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
            value = (delta * 20);

        document.documentElement.scrollLeft -= value;
        document.body.scrollLeft -= value;

        var widthFretboard = document.querySelectorAll('.fretboard')[0].offsetWidth,
            widthWindows = document.body.offsetWidth,
            difference ;

        if (widthFretboard < widthWindows){
            difference =  widthWindows - widthFretboard;
        }
        if (widthFretboard > widthWindows ){
            difference = widthFretboard - widthWindows;
        }


        margin -= value;

        if (margin < 0){
            margin = 0;
        }
        if (margin > difference ){
            margin = difference;
        }

        console.log( margin + " / " + difference );

        var marginLeft = margin + "px";


        document.querySelectorAll('.selection')[0].style.marginLeft = marginLeft ;


        e.preventDefault();
    }

    if (window.addEventListener) {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        window.attachEvent("onmousewheel", scrollHorizontally);
    }
})();
