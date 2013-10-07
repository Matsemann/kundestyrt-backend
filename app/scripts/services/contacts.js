'use strict';

(function(undefined) {
    var groups = [];

    angular.module('kundestyrtApp').factory('Contacts', ['$http', function($http) {
        return {
            getUsers: function() {
                return $http.get('/api/users').then(function(data) {
                   return data.rows;
                });
            },

            getGroups: function() {
                return groups;
            }
        };
    }]);
})();