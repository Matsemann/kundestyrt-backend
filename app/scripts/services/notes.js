'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Notes', ['$http', function($http) {
        return {
            getNotes: function() {
                return $http.get('/api/notes').then(function(xhr) {
                    return xhr.data.rows;
                });
            },

            getNote: ['id', function(id) {
                return $http.get('/api/notes/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }],

            save: function(note) {
                if(note._id) { // update
                    return $http.put('/api/notes/' + note._id, note);
                } else { // save new
                    return $http.post('/api/notes', note);
                }
            },

            delete: function(note) {
                if(note._id) { // delete
                    return $http.delete('/api/notes/' + note._id +'/'+ note._rev, note);
                } else {
                    console.log("services/notes.js: Error! Can not delete note that does not exist.");
                    return null; //vil nok krasje
                }
            }
        };
    }]);
})();