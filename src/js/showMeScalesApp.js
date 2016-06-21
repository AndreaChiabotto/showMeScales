var showMeScalesApp = (function () {

    var tonic = '',
        scale = '',
        notesArray = '',
        instrument_to_play,

        instruments_Available = [
            Guitar = {
                name: 'guitar',
                strings: [0, 7, 0, 5, 10, 2, 7],
                number: 22,
                inlays: 10
            },
            Bass_5_strings = {
                name: 'bass',
                strings: [0, 7, 0, 5, 10, 0],
                number: 20,
                inlays: 9
            }
            //,
            //Bass_4_strings = {
            //    name: '4 Strings Bass',
            //    strings: [0, 7, 0, 5, 0],
            //    number: 20,
            //    inlays: 9
            //},
            //
            //Ukulele = {
            //    name: 'Ukulele',
            //    strings: [0, 10, 4, 7, 0, 0],
            //    number: 18,
            //    inlays: 9
            //},
            //Banjo = {
            //    name: 'Banjo',
            //    strings: [0, 10, 4, 7, 0, 0],
            //    number: 18,
            //    inlays: 9
            //},
            //Mandolino = {
            //    name: 'Mandolino',
            //    strings: [0, 10, 4, 7, 0, 0],
            //    number: 18,
            //    inlays: 9
            //}
        ],

        getInstrument = function () {
            var instrumentNames = [];

            for (var i = 0; i < instruments_Available.length; i++) {
                instrumentNames.push(instruments_Available[i].name);
                drawInstrument(i);
            }

            //Instrument.show(0);

            return instrumentNames;
        },

        showInstrument = function (i) {
            instrument_to_play = i;
            Instrument.show(instrument_to_play);
        },

        drawNotes = function (bool, i) {

            var isTonic = bool;

            console.log(isTonic);

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
            }

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
