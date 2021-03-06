var Notes = (function () {

    var NOTES = [['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'], ['A', 'Bf', 'B', 'C', 'Df', 'D', 'Ef', 'E', 'F', 'Gf', 'G', 'Af']],
        NOTES_NAME = [['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']],
        NOTES_EMBELLISHMENTS = ['1', 'b9', '2', 'm3', 'M3', '4', 'b5', '5', '#5', '6', 'm7', 'M7'],
        SCALE = [

            MinorScale = {
                name: 'Minor',
                intervals: [0, 2, 1, 2, 2, 1, 2, 2]
            },

            MajorScale = {
                name: 'Major',
                intervals: [0, 2, 2, 1, 2, 2, 2, 1]
            },

            //#### MODE/COLORS ####
            Ionian = {
                name: 'Ionian',
                intervals: [0, 2, 2, 1, 2, 2, 2, 1]
            },

            Dorian = {
                name: 'Dorian',
                intervals: [0, 2, 1, 2, 2, 2, 1, 2]
            },

            Phrygian = {
                name: 'Phrygian',
                intervals: [0, 1, 2, 2, 2, 1, 2, 2]
            },

            Lydian = {
                name: 'Lydian',
                intervals: [0, 2, 2, 2, 1, 2, 2, 1]
            },

            Mixolydian = {
                name: 'Mixolydian',
                intervals: [0, 2, 2, 1, 2, 2, 1, 2]
            },

            Aeolian = {
                name: 'Aeolian',
                intervals: [0, 2, 1, 2, 2, 1, 2, 2]
            },

            Locrian = {
                name: 'Locrian',
                intervals: [0, 1, 2, 2, 1, 2, 2, 2]
            },

            //#### ARMONIC #### jazzy things
            HarmonicMinor = {
                name: 'Harmonic Minor',
                intervals: [0, 2, 1, 2, 2, 1, 3, 1]
            },

            HarmonicMajor = {
                name: 'Harmonic Major',
                intervals: [0, 2, 2, 1, 2, 1, 3, 2]
            },


            //#### MELODIC ####

            MelodicMinor = {
                name: 'Melodic Minor',
                intervals: [0, 2, 1, 2, 2, 2, 2, 1]
            },

            MelodicMajor = {
                name: 'Melodic Major',
                intervals: [0, 2, 2, 1, 2, 1, 2, 2]
            },

            //#### PENTATONIC ####
            PentatonicMinor = {
                name: 'Pentatonic Minor',
                intervals: [0, 3, 2, 2, 3, 2]
            },

            PentatonicMajor = {
                name: 'Pentatonic Major',
                intervals: [0, 2, 2, 3, 2, 3]
            },

            PentatonicMinor = {
                name: 'Pentatonic Minor',
                intervals: [0, 3, 2, 2, 3, 2]
            },

            //#### BLUES #####
            Blues = {
                name: 'Blues Mode',
                intervals: [0, 3, 2, 1, 1, 2, 3]
            },


            BluesMajor = {
                name: 'Blues Major',
                intervals: [0, 2, 1, 1, 3, 2, 3]
            },

            BluesMinor = {
                name: 'Blues Minor',
                intervals: [0, 3, 2, 1, 1, 3, 2]
            },

            //#### COMMON SCALES ####

            Diminished = {
                name: 'Diminished',
                intervals: [0, 2, 1, 2, 1, 2, 1, 2, 1]
            },

            Augmented = {
                name: 'Augmented',
                intervals: [0, 3, 1, 3, 1, 3, 1]
            },

            WholeTone = {
                name: 'Whole Tone',
                intervals: [0, 2, 2, 2, 2, 2, 2]
            }
        ],

        _way_to_show_notes = 0,

        _notes_from_tonic_classes = [],

        _notes_from_tonic_name = [],

        THE_SCALE = [];

        THE_EMBELLISHMENTS = [];


    /* TO POPULATE SELECT */

    var getNotes = function () {
        return NOTES_NAME[_way_to_show_notes];
    };


    var getScaleName = function () {
        var scalesName = [];

        for (var i = SCALE.length; i--;) {
            scalesName.push(SCALE[i].name);
        }

        return scalesName;
    };


    var getScaleIntervals = function (index) {
        return SCALE[index].intervals;
    };

    /*  GET THE SCALE STARTING FROM THE TONIC NOTE */

    var getNotesFromTonic = function (interval) {

        return slideToTheRightTonic(interval);

    };

    function slideToTheRightTonic(int) {

        var notes_from_tonic_note_classes = NOTES[_way_to_show_notes].slice(0),
            notes_from_tonic_note_name = NOTES_NAME[_way_to_show_notes].slice(0);

        for (var i = int; i--;) {
            var classe = notes_from_tonic_note_classes.shift();
            notes_from_tonic_note_classes.push(classe);

            var name = notes_from_tonic_note_name.shift();
            notes_from_tonic_note_name.push(name);
        }

        _notes_from_tonic_classes = notes_from_tonic_note_classes;
        _notes_from_tonic_name = notes_from_tonic_note_name;


        return {
            names: _notes_from_tonic_name,
            classes: _notes_from_tonic_classes
        };
    }


    /* GET THE SCALE WE WANT */

    var getScale = function (intervals) {
        var single_interval = 0;

        THE_SCALE = [];

        for (var i = intervals.length; i--;) {
            single_interval += intervals[i];
            THE_SCALE.push(_notes_from_tonic_classes[single_interval]);

        }

        return THE_SCALE;
    };

    var getEmbellishments = function (intervals) {
        var single_interval = 0;

        THE_EMBELLISHMENTS = [];

        for (var i = intervals.length - 1; i--;) {
            single_interval += intervals[i];
            THE_EMBELLISHMENTS.push(NOTES_EMBELLISHMENTS[single_interval]);

        }

        return THE_EMBELLISHMENTS;
    };

    return {
        getNotes: getNotes,
        getScaleName: getScaleName,
        getScaleIntervals: getScaleIntervals,
        getScale: getScale,
        getEmbellishments: getEmbellishments,
        getNotesFromTonic: getNotesFromTonic
    };

})();
;var Instrument = (function () {

    var _instrument = document.querySelector('.instruments'),
        _info = document.querySelector('.info'),
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

            var removeInstrument = _instrument.querySelector('.fretboard--active');

            if (removeInstrument !== null) {

                removeInstrument.className += ' fretboard--no-more-active';
                removeClass(removeInstrument, 'fretboard--active');

                var removeAnimatingClass = _instrument.querySelector('.fretboard--no-more-active');
                setTimeout(function () {
                    removeClass(removeAnimatingClass, 'fretboard--no-more-active');
                }, 500);
            }

            instrumentsOnStage[int].className += ' fretboard--active';

        };

    function renderIt(object) {

        var obj = object,
            _fretboard = document.createElement('div'),
            note_name = [],
            note_class = [];

        instrumentsOnStage.push(_fretboard);

        for (var i = obj.strings.length; i--;) {

            var _step = document.createElement('div'),
                notes = Notes.getNotesFromTonic(obj.strings[i]);

            _step.className = 'strings';

            note_name = notes.names;
            note_class = notes.classes;

            for (var j = obj.number; j--;) {

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

        for (var b = obj.inlays; b--;) {
            var _inlay = document.createElement('div');
            _inlay.className = 'inlays';
            _fretboard.appendChild(_inlay);

            _fretboard.insertBefore(_inlay, _fretboard.firstChild);
        }

        if (obj.class) {
            _fretboard.className = 'fretboard fretboard__' + obj.class;
        } else {
            _fretboard.className = 'fretboard fretboard__' + obj.name;
        }

        _instrument.appendChild(_fretboard);
    }

    function resetInterval() {
        _interval_semitones = 0;
        return _interval_semitones;
    }

    function showInfo(notes, embellishment) {

        while (_info.firstChild) {
            _info.removeChild(_info.firstChild);
        }

        if (embellishment !== '') {
            for (var d = notes.length; d--;) {
                var _note = document.createElement('p');

                _note.innerHTML = notes[d];

                var _grades = document.createElement('span');
                _grades.innerHTML = embellishment[d];

                _note.appendChild(_grades);
                _info.appendChild(_note);
            }
        }
    }

    function PaintNotes(noteToHighlight) {

        var removeTonic = _instrument.querySelectorAll('.note--tonic'),
            removeHighlighted = _instrument.querySelectorAll('.note--highlighted'),
            indexTonic,
            indexHighlighted;

        for (indexTonic = removeTonic.length; indexTonic--;) {
            removeClass(removeTonic[indexTonic], 'note--tonic');
        }

        for (indexHighlighted = removeHighlighted.length; indexHighlighted--;) {
            removeClass(removeHighlighted[indexHighlighted], 'note--highlighted');
        }

        // highlighting notes on fretboard
        for (var z = noteToHighlight.length; z--;) {

            var notes_name = noteToHighlight[z],
                notes = _instrument.querySelectorAll('.' + notes_name),
                typeOfNote;

            if (z !== 0) {
                typeOfNote = " note--highlighted";
            }
            else {
                typeOfNote = " note--tonic";
            }

            for (var i = notes.length; i--;) {
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
;var showMeScalesApp = (function () {

    var tonic = '',
        scale = '',
        notesArray = '',
        embellishments = '',
        instrument_to_play,

        instruments_Available = [
            Guitar = {
                name: 'guitar',
                strings: [0, 7, 0, 5, 10, 2, 7],
                number: 22,
                inlays: 10
            },
            Guitar = {
                name: 'guitar 7 strings',
                class: 'guitar fretboard__guitar--seven', //class is optional
                strings: [0,2, 7, 0, 5, 10, 2, 7],
                number: 22,
                inlays: 10
            },
            Bass_5_strings = {
                name: 'bass',
                strings: [0, 7, 0, 5, 10, 0],
                number: 20,
                inlays: 9
            },
            Bass_4_strings = {
                name: 'Bass 4 Strings',
                class: 'bass fretboard__bass--four',
                strings: [0, 7, 0, 5, 0],
                number: 20,
                inlays: 9
            },

            Ukulele = {
                name: 'ukulele',
                strings: [0, 10, 3, 7, 0],
                number: 15,
                inlays: 6
            },
            Banjo = {
                name: 'banjo',
                strings: [0, 10, 5, 10, 2, 5],
                number: 22,
                inlays: 10
            },
            //Mandolino = {
            //    name: 'Mandolino',
            //    strings: [0, 10, 4, 7, 0, 0],
            //    number: 18,
            //    inlays: 9
            //}
        ],

        getInstrument = function () {
            var instrumentNames = [];

            for (var i = instruments_Available.length; i--;) {
                instrumentNames.push(instruments_Available[i].name);
                drawInstrument(i);
            }
           //Instrument.show(0);
            return instrumentNames;
        },

        showInstrument = function (i) {

            if(instrument_to_play===undefined){
                Draggable.dragIt();
            }

            instrument_to_play = i;
            Instrument.show(instrument_to_play);
        },

        drawNotes = function (bool, i) {

            var isTonic = bool;

            if (isTonic === true) {
                tonic = i;
                notesArray = Notes.getNotesFromTonic(tonic).classes[0];

                if (scale !== '') {
                    buildScale();
                }
            }
            else {
                scale = i;
                buildScale();
            }

            function buildScale() {
                var intervals = Notes.getScaleIntervals(scale);
                notesArray = Notes.getScale(intervals);
                embellishments = Notes.getEmbellishments(intervals);
            }

            Instrument.showInfo(notesArray, embellishments);
            Instrument.drawNotes(notesArray);
        },

        getNotes = function () {
            return Notes.getNotes();
        },

        getScaleName = function () {
            return Notes.getScaleName();
        };

    function drawInstrument(i) {
        Instrument.draw(instruments_Available[i]);
    }

    return {
        instruments: instruments_Available,
        drawNotes: drawNotes,
        showInstrument: showInstrument,
        getInstrument: getInstrument,
        getNotes: getNotes,
        getScaleName: getScaleName
    };


})();
;var Select = (function () {

    //VARS
    var _selection = document.querySelector('.selection'),
        _body = document.querySelector('body'),
        bt = document.createElement('div'),
        instrument_to_play = '',
        tonic = '',
        scaleChosen = '';

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

                _body.className = 'scrollable-Options';
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
        for (var i = content.length; i--;) {
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

                _body.className = '';
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

    function setScale(scale, string) {
        // just once, the first time this function is called
        if (scaleChosen === '') {
            _selection.className += ' selection--hide';
            bt.className += ' bt--show';
        }
        var sp = document.querySelector('.selection__boxes.scales span');
        sp.innerHTML = string;
        scaleChosen = scale;
        showMeScalesApp.drawNotes(false, scale);
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


})();;var Draggable = (function () {

    var selected = null,
        x_pos = 0,
        x_elem = 0,
        val = 0,
        elemHiding = document.querySelector('.body'),
        elemToStore,
        maxLimit = function () {
            return selected.offsetWidth - elemHiding.offsetWidth;
        };

    function _drag_init() {
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
        document.removeEventListener("mousemove", _move_elem);
    }

    function _check() {
        document.addEventListener("mousemove", _move_elem);

        if (elemToStore !== document.querySelector('.fretboard--active')) {
            selected = document.querySelector('.fretboard--active');
            elemToStore = selected;
            attachEventToFretboard();
        }
    }

    function attachEventToFretboard() {
        selected.addEventListener("mousedown", function () {
            _drag_init(this);
            return false;
        });
    }

    function init() {
        document.addEventListener("mouseup", _destroy);
        document.addEventListener("mousedown", _check);
    }

    return {
        dragIt: init
    };

})();
