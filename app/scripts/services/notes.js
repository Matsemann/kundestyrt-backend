'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Notes', ["$http", function($http) {
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
            }]
        };
    }]);
})();