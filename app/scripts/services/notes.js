'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Notes', ['$http', 'BaseUrl', function($http, BaseUrl) {
        return {
            getNotes: function() {
                return $http.get(BaseUrl + 'api/notes').then(function(xhr) {
                    return xhr.data.rows;
                });
            },

            getNote: ['id', function(id) {
                return $http.get(BaseUrl + 'api/notes/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }],

            save: function(note) {
                if(note._id) { // update
                    return $http.put(BaseUrl + 'api/notes/' + note._id, note);
                } else { // save new
                    return $http.post(BaseUrl + 'api/notes', note);
                }
            },

            delete: function(note) {
                if(note._id) { // delete
                    return $http.delete(BaseUrl + 'api/notes/' + note._id +'/'+ note._rev);
                } else {
                    console.log('services/notes.js: Error! Can not delete note that does not exist.');
                    return null; //vil nok krasje
                }
            }
        };
    }]);
})();