var Select = (function () {


    //VARS
    var _selection = document.querySelector(".selection .container"),
        instrument_to_play = '',
        tonic = '';


    // CREATE THE ELEMENTS
    fillSelectWithContent('Show me the', 'scales', Notes.getScaleName().names);
    fillSelectWithContent('Show me tonic', 'notes', Notes.getNotes());
    fillSelectWithContent('Show me the', 'playinginstrument', showMeScalesApp.instruments);

    [].slice.call(document.querySelectorAll('.select')).forEach(function (el) {
        new SelectFx(el,
            {
                onChange: function (val) {
                    return true;
                }
            }
        );
    });


    function fillSelectWithContent(text, name, content) {

        var box = document.createElement('div');


        //set the description of selection

        var paragraph = document.createElement('p');
        paragraph.className = 'text';
        paragraph.innerHTML = text;

        //set the select

        var select = document.createElement('select');

        select.className = 'select ' + name;

        var placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);


        if (name === 'scales') {
            placeholder.innerHTML = 'scale';
            box.className = 'box scales disabled';
        }
        if (name === 'notes') {
            placeholder.innerHTML = 'note';
            box.className = 'box notes disabled';
        }
        if (name === 'playinginstrument') {
            placeholder.innerHTML = 'instrument';
            box.className = 'box playinginstrument';
        }

        for (var i = 0; i < content.length; i++) {

            var opt = document.createElement('option');
            opt.value = content[i];
            opt.innerHTML = content[i];

            if (name === 'playinginstrument') {
                opt.value = content[i].name;
                opt.innerHTML = content[i].name;
            }

            select.appendChild(opt);
        }

        box.appendChild(paragraph);
        box.appendChild(select);
        _selection.appendChild(box);
    }

    function setValue(el, val) {

        if (el.indexOf('playinginstrument') !== -1) {
            setInstrument(val);
        }
        if (el.indexOf('note') !== -1) {
            setTonic(val);
        }
        if (el.indexOf('scales') !== -1) {
            setScale(val);
        }

    }

    function setInstrument(obj) {

        // just once
        if (instrument_to_play === '') {
            var sel = _selection.querySelector('.box.playinginstrument p');
            sel.innerHTML = 'on ';
            var notes = _selection.querySelector('.box.notes');
            notes.className = 'box notes';
        }

        instrument_to_play = obj;
        showMeScalesApp.drawInstrument(instrument_to_play);
    }


    function setTonic(note) {

        // just once
        if (tonic === '') {
            var sel = _selection.querySelector('.box.notes p');
            sel.innerHTML = 'of tonic';
            var notes = _selection.querySelector('.box.scales');
            notes.className = 'box scales';
        }

        tonic = note;
        showMeScalesApp.drawTonic(tonic);

        // Instrument.getTonic(;
    }

    function setScale(index) {

        scale_index = index;

        var intervals = Notes.getScaleName().intervals[scale_index];
        var scale = Notes.getScale(intervals);
        Instrument.highlight(scale);
        console.log(intervals + '  |  ' + scale);
    }

    return {
        setValue: setValue
    };

})();