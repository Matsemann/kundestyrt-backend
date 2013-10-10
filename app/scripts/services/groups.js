'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Groups', ['$http', function($http) {
        return {
            getGroups: function() {
                return $http.get('/api/groups').then(function(xhr) {
                    return xhr.data.rows;
                });
            },

            getGroup: ['id', function(id) {
                return $http.get('/api/groups/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }]
        };
    }]);
})();