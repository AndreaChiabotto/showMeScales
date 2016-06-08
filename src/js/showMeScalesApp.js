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

        drawNotes = function (bool, i) {

            var isTonic = bool;

            console.log(isTonic);

            if (isTonic === true ) {
                tonic = i;
                notesArray = Notes.getNotesFromTonic(tonic).classes[0];
                //console.log('showMeScales: tonic is ' + notesArray + ',tonic index is ' + tonic + ', scale is undefined');

                if(scale !== '') {
                    buildScale();
                }
            }
            else {
                scale = i;
                buildScale();
            }

            function buildScale(){
                var intervals = Notes.getScaleIntervals(scale);
                notesArray = Notes.getScale(intervals);
                //console.log('showMeScales: scale is ' + notesArray + ',tonic index is ' + tonic + ', scale is '+ scale);
            }

            Instrument.drawNotes( notesArray );

        },

        setNotes = function () {
            return Notes.getNotes();
        },

        setScaleName = function () {
            return Notes.getScaleName();
        };


        drawInstrument(0);


    return {
        instruments: instruments_Available,
        drawInstrument: drawInstrument,
        setInstrument: setInstrument,

        drawNotes: drawNotes,

        setNotes: setNotes,
        setScaleName: setScaleName
    };


})();
