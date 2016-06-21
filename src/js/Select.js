var Select = (function () {


    //VARS
    var _selection = document.querySelector(".selection .container"),
         _selection_parent = document.querySelector(".selection"),
        _body = document.querySelector("body"),
        instrument_to_play = '',
        tonic = '';

    // CREATE THE ELEMENTS
    fillSelectWithContent('Show me the', 'scales', showMeScalesApp.getScaleName());
    fillSelectWithContent('Show me tonic', 'notes', showMeScalesApp.getNotes());
    fillSelectWithContent('Show me the', 'playinginstrument', showMeScalesApp.getInstrument());

    function fillSelectWithContent(text, name, content) {

        var box = document.createElement('div');

        var paragraph = document.createElement('p');
        paragraph.innerHTML = text;

        var span = document.createElement('span');
        span.innerHTML = text;

        span.addEventListener("click", function (el) {

                var ulToActive = el.target.className;
                var ul = document.querySelector("ul." + ulToActive);
                ul.className += ' active';
                // toggleDisplay(ul);
            }
        );

        var select = document.createElement('ul');
        select.className = 'list ' + name;

        switch (name) {
            case 'scales':
                span.innerHTML = 'scales';
                span.className = 'scales ';
                box.className = 'box scales disabled';
                break;
            case 'notes' :
                span.innerHTML = 'notes';
                span.className = 'notes ';
                box.className = 'box notes disabled';
                break;
            case 'playinginstrument' :
                span.innerHTML = 'instrument';
                span.className = 'playinginstrument';
                box.className = 'box playinginstrument';
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

    function setValue(el, i, c, s) {

        var listElement = el,
            index = i,
            classOfParent = c,
            string = s;

        listElement.addEventListener("click", function () {

                var ul = document.querySelector("ul.active");
                ul.className = '';
                ul.className = 'list ' + classOfParent;

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

        // just once
        if (instrument_to_play === '') {

            var sel = document.querySelector('.box.playinginstrument p');
            sel.innerHTML = 'on ';

            var notes = document.querySelector('.box.disabled.notes');
            notes.className = 'box notes';

            _selection_parent.className += ' selected';
        }

        var sp = document.querySelector('.box.playinginstrument span');
        sp.innerHTML = string;

        instrument_to_play = index;
        showMeScalesApp.showInstrument(index);
    }

    function setTonic(note, string) {

        if (tonic === '') {
            var sel = _selection.querySelector('.box.notes p');
            sel.innerHTML = 'of tonic';
            var notes = _selection.querySelector('.box.scales.disabled');
            notes.className = 'box scales';
        }

        var sp = document.querySelector('.box.notes span');
        sp.innerHTML = string;

        tonic = note;

        //console.log('select js: tonic is ' + tonic);
        showMeScalesApp.drawNotes(true, tonic);

    }

    function setScale(scale, string) {

        var sp = document.querySelector('.box.scales span');
        sp.innerHTML = string;

        //console.log('select js: scale is ' + scale);
        showMeScalesApp.drawNotes(false, scale);
    }


})();