var Instrument = (function () {

    var _instrument = document.querySelector(".instrument .container"),
        _interval_semitones = 0;

    var drawFretboard = function (Instrument) {
        var obj = Instrument;
        renderIt(obj);
    };

    function renderIt(object) {

        var obj = object,
            _fretboard = document.createElement('div'),
            note_name = [],
            note_class = [];

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

    var paintTonic = function (tonic) {

        PaintNotes(tonic, 'tonic');
    };

    var paintScales = function (notesOfScale) {

        PaintNotes(notesOfScale, 'highlighted');
    };

    function PaintNotes(noteToHighlight, typeOfHighlighting) {

        console.log( noteToHighlight +'/'+ noteToHighlight.length );

        var removeNotes = _instrument.querySelectorAll('.' + typeOfHighlighting),
            reg = new RegExp('(\\s|^)' + typeOfHighlighting + '(\\s|$)');

        for (var a = 0; a < removeNotes.length; a++) {
            removeNotes[a].className = removeNotes[a].className.replace(reg, ' ');
        }

        for (var z = 0; z < noteToHighlight.length; z++) {

            var notes_name = noteToHighlight[z],
                notes = _instrument.querySelectorAll('.' + notes_name),
                typeOfNote = " " + typeOfHighlighting;

            for (var i = 0; i < notes.length; i++) {
                notes[i].className += typeOfNote;
            }
        }
    }

    return {
        draw: drawFretboard,
        drawTonic: paintTonic,
        drawScales: paintScales
    };
})();