'use strict';

(function(undefined) {
    var notes = [
        {
            _id: 1,
            name: 'Test',
            content: 'This is a test note'
        },
        {
            _id: 2,
            name: 'Test 2',
            content: 'This is also simply a test note.'
        }

    ];

    angular.module('kundestyrtApp').factory('Notes', [function() {
        return {
            getNotes: function() {
                return notes;
            },

            getNote: function(id) {
                return notes[id - 1];
            }
        };
    }]);
})();