var Draggable = (function () {

    var selected = null,
        x_pos = 0,
        x_elem = 0,
        val = 0,
        elemHiding = document.querySelector('.body'),
        elemToStore,
        maxLimit = function () {
            return selected.offsetWidth - elemHiding.offsetWidth;
        };

    function _drag_init(elem) {
        x_elem = x_pos - selected.offsetLeft;
    }

    function _move_elem(e) {
        x_pos = document.all ? window.event.clientX : e.pageX;
        if (selected !== null && maxLimit() > 0) {
            val = x_pos - x_elem;
            if (val > 0) {
                val = 0;
            }
            if (val <= maxLimit() * -1) {
                val = maxLimit() * -1;
            }
            selected.style.left = val + 'px';
        }
    }

    function _destroy() {
        //  console.error('destroyng...');
        //selected = null;
        document.removeEventListener("mousemove", _move_elem);
    }

    function _check() {
        document.addEventListener("mousemove", _move_elem);

        if (elemToStore !== document.querySelector('.fretboard--active')) {
            //console.log('non uguale');
            selected = document.querySelector('.fretboard--active');
            elemToStore = selected;
            attachEventToFretboard();
        } //else {
          //  console.log('uguale');
        // }
    }

    function attachEventToFretboard() {
        // console.warn('attached');
        //console.warn(selected);
        selected.addEventListener("mousedown", function () {
            _drag_init(this);
            // console.log('mouse down');
            return false;
        });
    }

    function init() {
        //console.log('starting');
        document.addEventListener("mouseup", _destroy);
        document.addEventListener("mousedown", _check);
    }

    return {
        dragIt: init
    };

})();
