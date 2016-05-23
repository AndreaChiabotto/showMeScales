var Notes = (function () {

    var NOTES = [['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'], ['A', 'Bf', 'B', 'C', 'Df', 'D', 'Ef', 'E', 'F', 'Gf', 'G', 'Af']],
        NOTES_NAME = [['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']],

        SCALE_NAME = [
            'Cromatic Scale',
            'Major Scale',
            'Minor Scale',
          //  'Harmonic Major',
          //  'Harmonic Minor',
            'Melodic Major Scale',
            'Melodic Minor Scale',
            'Pentatonic Major Scale',
            'Pentatonic Minor Scale',
            'Blues Scale'
        ],

        INTERVALS_SCALE = [
            //cromatic
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            //Major
            [0, 2, 2, 1, 2, 2, 2, 1],
            // Minor
            [0, 2, 1, 2, 2, 1, 2, 2],

            // Harmonic major TODO CORRECT
            //[0, 2, 2, 1, 2, 1, 2, 3],
            // Harmonic Minor
          //  [0, 2, 1, 2, 2, 1, 3, 1],

            // melodic major
            [0, 2, 2, 1, 2, 1,2, 2],

            // melodic Minor
            [0, 2, 1, 2, 2, 2, 2, 2],

            // Major  pentatonic
            [0, 2, 2, 3 , 2, 3],
            // pentatonic Minor
            [0, 3, 2, 2 ,3 , 2],

            // blues
            [0, 3, 2, 1, 1, 3, 2],
        ],
        SCALE = {
            names:  SCALE_NAME,
            intervals: INTERVALS_SCALE,
        },

        _way_to_show_notes = 0,

        _notes_from_tonic_classes = [],

        _notes_from_tonic_name = [],

        THE_SCALE = [];


    /*
    --------------------------------------
    TO POPULATE SELECT
    --------------------------------------
    */

    var getNotes = function () {
        return NOTES_NAME[_way_to_show_notes];
    };

    var getModes = function () {
        return MODES;
    };

    var getScaleName = function () {
        return SCALE;
    };


    /*
    --------------------------------------
    GET THE SCALE STARTING FROM THE TONIC NOTE
    --------------------------------------
    */

    var getNotesFromTonic = function (interval) {

        return slideToTheRightTonic(interval);

    };

    function slideToTheRightTonic(int) {

        var notes_from_tonic_note_classes = NOTES[_way_to_show_notes].slice(0),
            notes_from_tonic_note_name = NOTES_NAME[_way_to_show_notes].slice(0);

        for (var i = 0; i < int; i++) {
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


    /*
    --------------------------------------
    GET THE SCALE WE WANT
    --------------------------------------
    */

    var getScale = function (intervals) {
        var single_interval = 0;

        THE_SCALE = [];

        for (var i = 0; i < intervals.length - 1; i++) {
            single_interval += intervals[i];

            if (_notes_from_tonic_classes === []) {

                THE_SCALE.push(NOTES[single_interval]);

            }
            else {

                THE_SCALE.push(_notes_from_tonic_classes[single_interval]);

            }
        }

        return THE_SCALE;
    };

    return {
        getNotes: getNotes,
        getModes: getModes,
        getScaleName: getScaleName,
        getScale: getScale,
        getNotesFromTonic: getNotesFromTonic
    };

})();
