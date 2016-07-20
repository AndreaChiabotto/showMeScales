(function () {

    var margin = 0,
        difference,
        widthFretboard = document.querySelectorAll('.fretboard')[0].offsetWidth,

        getWindowWidth = function () {

            return document.body.offsetWidth;
        },

        isElementStillHide = function () {
            difference = widthFretboard - getWindowWidth();

            if (difference < 0) {
                difference = 0;
                return false;
            }

            console.log(difference);

            return true;

        };

    isElementStillHide();

    window.onresize = isElementStillHide;

    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
            value = (delta * 35);

        document.documentElement.scrollLeft -= value;
        document.body.scrollLeft -= value;

        margin -= value;

        if (margin < 0) {
            margin = 0;
        }
        if (margin > isElementStillHide()) {
            margin = isElementStillHide();
        }

        var marginLeft = -margin + "px";
        document.querySelectorAll('.fretboard')[0].style.marginLeft = marginLeft;
        e.preventDefault();
    }


    if (isElementStillHide()) {


        if (window.addEventListener) {
            // IE9, Chrome, Safari, Opera
            window.addEventListener("mousewheel", scrollHorizontally, false);
            // Firefox
            window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
        } else {
            // IE 6/7/8
            window.attachEvent("onmousewheel", scrollHorizontally);
        }

    }
})();
