'use strict';

(function(undefined) {
    var groups = [];

    angular.module('kundestyrtApp').factory('Contacts', ['$http', '$q', function($http, $q) {
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