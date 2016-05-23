var showMeScalesApp = (function () {

    var tonic,
        scale,
        instrument_to_play,

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
        },
        /*
        Bass_4_strings = {
            name: '4 Strings Bass',
            strings: [0, 7, 0, 5,  0],
            number: 20,
            inlays: 9
        },

        Ukulele = {
            name: 'Ukulele',
            strings: [0, 10, 4, 7,  0, 0],
            number: 18,
            inlays: 9
        },
        */
        instruments_Available = [Guitar,
                                 Bass_5_strings//,
                                 // Bass_5_strings,
                                 // Ukulele
        ],

        drawInstrument = function (i) {
            instrument_to_play = instruments_Available[i];
            Instrument.draw(instrument_to_play);
        },

        drawTonic = function (i) {
            tonic = Notes.getNotesFromTonic(i).classes[0];
            Instrument.drawTonic(tonic);
        };


    return {
        instruments: instruments_Available,
        drawInstrument: drawInstrument,
        drawTonic: drawTonic
    };


})();
