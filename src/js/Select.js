var Select = (function () {

    //VARS
    var _selection = document.querySelector('.selection'),
        _body = document.querySelector('body'),
        bt = document.createElement('div'),
        instrument_to_play = '',
        tonic = '';

    // CREATE THE ELEMENTS
    fillSelectWithContent('Show me the', 'scales', showMeScalesApp.getScaleName());
    fillSelectWithContent('Show me tonic', 'notes', showMeScalesApp.getNotes());
    fillSelectWithContent('Show me the', 'playinginstrument', showMeScalesApp.getInstrument());
    createButtonToSwitchOptions();

    function fillSelectWithContent(text, name, content) {

        var box = document.createElement('div'),
            paragraph = document.createElement('p'),
            span = document.createElement('span'),
            select = document.createElement('ul');

        paragraph.innerHTML = text;
        span.innerHTML = text;

        span.addEventListener('click', function (el) {
                var ulToActive = el.target.className;
                var ul = document.querySelector('ul.' + ulToActive);
                ul.className += ' options--active';
            }
        );

        select.className = 'options ' + name;

        switch (name) {
            case 'scales':
                span.innerHTML = 'scales';
                span.className = 'scales ';
                box.className = 'selection__boxes scales';
                break;
            case 'notes' :
                span.innerHTML = 'notes';
                span.className = 'notes ';
                box.className = 'selection__boxes notes';
                break;
            case 'playinginstrument' :
                span.innerHTML = 'instrument';
                span.className = 'playinginstrument';
                box.className = 'selection__boxes selection__boxes--active playinginstrument';
                break;
        }

        // populate the list with real content
        for (var i = 0; i < content.length; i++) {
            var opt = document.createElement('li');
            opt.innerHTML = content[i];
            setValue(opt, i, name, content[i]);
            select.appendChild(opt);
        }

        box.appendChild(paragraph);
        box.appendChild(span);
        _body.appendChild(select);
        _selection.appendChild(box);
    }

    function setValue(element, ind, classP, txt) {

        var listElement = element,
            index = ind,
            classOfParent = classP,
            string = txt;

        listElement.addEventListener('click', function () {

                var ul = document.querySelector('.options--active');
                ul.className = '';
                ul.className = 'options ' + classOfParent;

                switch (classOfParent) {
                    case 'scales':
                        setScale(index, string);
                        break;
                    case 'notes' :
                        setTonic(index, string);
                        break;
                    case 'playinginstrument' :
                        setInstrument(index, string);
                        break;
                }
            }
        );
    }

    function setInstrument(index, string) {

        // just once, the first time this function is called
        if (instrument_to_play === '') {

            var sel = document.querySelector('.selection__boxes.playinginstrument p');
            sel.innerHTML = 'on ';

            var notes = document.querySelector('.selection__boxes.notes');
            notes.className = 'selection__boxes selection__boxes--active notes';

            var instrument = document.querySelector('.instruments');
            instrument.className += ' instruments--active';

            _selection.className += ' selected';
        }

        var sp = document.querySelector('.selection__boxes.playinginstrument span');
        sp.innerHTML = string;

        instrument_to_play = index;
        showMeScalesApp.showInstrument(index);
    }

    function setTonic(note, string) {
        // just once, the first time this function is called
        if (tonic === '') {
            var sel = _selection.querySelector('.selection__boxes.notes p');
            sel.innerHTML = 'of tonic';
            var notes = _selection.querySelector('.selection__boxes.scales.scales');
            notes.className = 'selection__boxes selection__boxes--active scales';
        }

        var sp = document.querySelector('.selection__boxes.notes span');
        sp.innerHTML = string;

        tonic = note;

        showMeScalesApp.drawNotes(true, tonic);

    }

    function createButtonToSwitchOptions() {
        bt.className = 'bt';
        bt.innerHTML = '<p>❮</p>';

        bt.addEventListener('click', function () {

            if (bt.className === 'bt bt--show') {
                bt.className = 'bt bt--hide';
                _selection.className = 'selection';
            } else {
                bt.className = 'bt bt--show';
                _selection.className = 'selection selection--hide';
            }
        });

        _body.appendChild(bt);
    }


    function setScale(scale, string) {

        var sp = document.querySelector('.selection__boxes.scales span');
        sp.innerHTML = string;
        showMeScalesApp.drawNotes(false, scale);

        if (_selection.className !== '.selection.selection--hide') {
            _selection.className += ' selection--hide';
            bt.className += ' bt--show';
        }
    }

})();