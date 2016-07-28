var Instrument = (function () {

    var _instrument = document.querySelector(".instrument .container"),
        _info = _instrument.querySelectorAll('.info')[0],
        _interval_semitones = 0,
        instrumentsOnStage = [],
        drawFretboard = function (Instrument) {
            var obj = Instrument;
            renderIt(obj);
        },

        paintNotes = function (notesOfScale) {
            PaintNotes(notesOfScale);
        },

        showFretboard = function (int) {

            var removeInstrument = _instrument.querySelectorAll('.on'),
                indexInstrument;

            for (indexInstrument = removeInstrument.length; indexInstrument--;) {
                removeClass(removeInstrument[indexInstrument], 'on');
            }

            instrumentsOnStage[int].className += ' on';
        };

    function renderIt(object) {

        var obj = object,
            _fretboard = document.createElement('div'),
            note_name = [],
            note_class = [];

        instrumentsOnStage.push(_fretboard);

        for (var i = 0; i < obj.strings.length; i++) {

            var _step = document.createElement('div'),
                notes = Notes.getNotesFromTonic(obj.strings[i]);

            _step.className = 'string';

            note_name = notes.names;
            note_class = notes.classes;

            for (var j = 0; j < obj.number; j++) {

                _interval_semitones++;

                if (_interval_semitones > note_class.length - 1) {
                    resetInterval();
                }

                var _semitone = document.createElement('div');
                _semitone.className = 'note ' + note_class[_interval_semitones];

                if (i !== 0) {
                    var _p = document.createElement('p');
                    _p.innerHTML = note_name[_interval_semitones];

                    _semitone.appendChild(_p);
                }
                _step.appendChild(_semitone);
            }

            resetInterval();

            if (_fretboard.firstChild === null) {
                _fretboard.appendChild(_step);
            }
            else {
                _fretboard.insertBefore(_step, _fretboard.firstChild);
            }
        }

        for (var b = 0; b < obj.inlays; b++) {
            var _inlay = document.createElement('div');
            _inlay.className = 'inlays';
            _fretboard.appendChild(_inlay);

            _fretboard.insertBefore(_inlay, _fretboard.firstChild);
        }
        _fretboard.className = 'fretboard ' + obj.name;
        _instrument.appendChild(_fretboard);
    }

    function resetInterval() {
        _interval_semitones = 0;
        return _interval_semitones;
    }

    function showInfo(notes, embellishment) {

        //remove all paragraph inside info, to create new ones
        while (_info.firstChild) {
            _info.removeChild(_info.firstChild);
        }

        for (var d = 0; d < notes.length; d++) {
            var _note = document.createElement('p');
            _note.innerHTML = notes[d];

            var _grades = document.createElement('span');
            _grades.innerHTML = embellishment[d];

            _note.appendChild(_grades);
            _info.appendChild(_note);

            console.log(_note +'/'+ _grades );
        }

        _instrument.appendChild(_info);
    }

    function PaintNotes(noteToHighlight) {

        var removeTonic = _instrument.querySelectorAll('.tonic.on'),
            removeHighlighted = _instrument.querySelectorAll('.highlighted'),
            indexTonic,
            indexHighlighted;

        for (indexTonic = removeTonic.length; indexTonic--;) {
            removeClass(removeTonic[indexTonic], 'tonic');
        }

        for (indexHighlighted = removeHighlighted.length; indexHighlighted--;) {
            removeClass(removeHighlighted[indexHighlighted], 'highlighted');
        }

        // highlighting notes on fretboard
        for (var z = 0; z < noteToHighlight.length; z++) {

            var notes_name = noteToHighlight[z],
                notes = _instrument.querySelectorAll('.' + notes_name),
                typeOfNote;

            if (z !== 0) {
                typeOfNote = " highlighted";
            }
            else {
                typeOfNote = " tonic";
            }

            for (var i = 0; i < notes.length; i++) {
                notes[i].className += typeOfNote;
            }
        }
    }

    function removeClass(node, className) {
        if (hasClass(node, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            node.className = node.className.replace(reg, ' ');
        }
    }

    function hasClass(node, className) {
        if (node.className) {
            return node.className.match(
                new RegExp('(\\s|^)' + className + '(\\s|$)'));
        } else {
            return false;
        }
    }

    return {
        show: showFretboard,
        draw: drawFretboard,
        drawNotes: paintNotes,
        showInfo: showInfo
    };
})();