'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Account', ['$http', 'BaseUrl', function($http, BaseUrl) {
        return {
            login: function(username, password) {
                return $http.post(BaseUrl + 'login', {
                    username: username,
                    password: password
                });
            },

            editPassword: function(oldPw, newPw) {
                return $http.post(BaseUrl + 'password', {
                    'old': oldPw,
                    'new': newPw
                });
            },

            get: function() {
                return $http.get(BaseUrl + 'api/users/me');
            }
        };
    }]);
})();