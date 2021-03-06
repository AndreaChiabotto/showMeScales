var showMeScalesApp = (function () {

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
