'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Account', ['$http', function($http) {
        return {
            login: function(username, password) {
                return $http.post('login', {
                    username: username,
                    password: password
                });
            },

            editPassword: function(oldPw, newPw) {
                return $http.post('api/password', {
                    'old': oldPw,
                    'new': newPw
                });
            },

            get: function() {
                return $http.get('api/users/me');
            }
        };
    }]);
})();