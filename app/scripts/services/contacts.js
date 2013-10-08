'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Contacts', ['$http', function($http) {
        return {
            getUsers: function() {
                return $http.get('/api/users').then(function(xhr) {
                   return xhr.data.rows;
                });
            },

            getGroups: function() {
                return $http.get('/api/groups').then(function(xhr) {
                    return xhr.data.rows;
                });
            }
        };
    }]);
})();