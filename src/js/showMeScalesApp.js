var showMeScalesApp = (function () {

    var tonic,
        scale,
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

        drawInstrument = function (i) {
            instrument_to_play = instruments_Available[i];
            Instrument.draw(instrument_to_play);
        },

        setInstrument = function () {
            var instrumentNames = [];

            for (var i = 0; i < instruments_Available.length; i++) {
                instrumentNames.push(instruments_Available[i].name);
            }

            return instrumentNames;
        },

        drawTonic = function (i) {
            tonic = Notes.getNotesFromTonic(i).classes[0];
            Instrument.drawNotes(tonic);
        },

        drawScales = function (i) {
            var intervals = Notes.getScaleIntervals(i);
            scale = Notes.getScale(intervals);
            Instrument.drawNotes(scale);
        },

        setNotes = function () {
            return Notes.getNotes();
        },

        setScaleName = function () {
            return Notes.getScaleName();
        };


    return {
        instruments: instruments_Available,
        drawInstrument: drawInstrument,
        setInstrument: setInstrument,
        drawTonic: drawTonic,
        drawScales: drawScales,
        setNotes: setNotes,
        setScaleName: setScaleName
    };


})();
