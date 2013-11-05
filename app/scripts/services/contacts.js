'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Contacts', ['$http', 'BaseUrl', function($http, BaseUrl) {
        return {
            getUsers: function() {
                return $http.get(BaseUrl + 'api/users').then(function(xhr) {
                   return xhr.data.rows;
                });
            },

            get: function(id) {
                return $http.get(BaseUrl + 'api/users/' + id).then(function(xhr) {
                    return xhr.data;
                });
            },

            getGroups: function() {
                return $http.get(BaseUrl + 'api/groups').then(function(xhr) {
                    return xhr.data.rows;
                });
            }
        };
    }]);
})();