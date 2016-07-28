var Notes = (function () {

    var NOTES = [['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'], ['A', 'Bf', 'B', 'C', 'Df', 'D', 'Ef', 'E', 'F', 'Gf', 'G', 'Af']],
        NOTES_NAME = [['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']],
        NOTES_EMBELLISHMENTS = ['1', 'b9', '2', 'm3', 'M3', '4', 'b5', '5', '#5', '6', 'm7', 'M7'],
        SCALE = [

            //#### BASIC ONES ####
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


            //#### BLUES #####
            Blues = {
                name: 'Blues Mode',
                intervals: [0, 3, 2, 1, 1, 2, 3]
            },

            BluesMinor = {
                name: 'Blues Minor',
                intervals: [0, 3, 2, 1, 1, 3, 2]
            },

            BluesMajor = {
                name: 'Blues Major',
                intervals: [0, 2, 1, 1, 3, 2, 3]
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


    /*
     --------------------------------------
     TO POPULATE SELECT
     --------------------------------------
     */

    var getNotes = function () {
        return NOTES_NAME[_way_to_show_notes];
    };


    var getScaleName = function () {
        var scalesName = [];

        for (var i = 0; i < SCALE.length; i++) {
            scalesName.push(SCALE[i].name);
        }

        return scalesName;
    };


    var getScaleIntervals = function (index) {
        return SCALE[index].intervals;
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
            THE_SCALE.push(_notes_from_tonic_classes[single_interval]);

        }

        return THE_SCALE;
    };

    var getEmbellishments = function (intervals) {
        var single_interval = 0;

        THE_EMBELLISHMENTS = [];

        for (var i = 0; i < intervals.length - 1; i++) {
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
