'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Users', ['$http', '$q', function($http, $q) {
        return {
            getUsers: function() {
                return $http.get('api/users').then(
                    function(xhr) {
                        return xhr.data.rows;
                    });
            },


            getUser: ['id', function(id) {
                return $http.get('api/users/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }],

            save: function(user) {
                if(user._id) { // update
                    return $http.put('api/users/' + user._id, user);
                } else { // save new
                    return $http.post('api/users', user);
                }
            },

            delete: function(user) {
                if(user._id) { // delete
                    return $http.delete('api/users/' + user._id +'/'+ user._rev);
                } else {
                   return $q.reject(new Error('/services/users.js: Error! Can not delete user that does not exist.'));
                }
            }
        };
    }]);
})();