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
            }],

            save: function(group) {
                if(group._id) { // update
                    return $http.put('/api/groups/' + group._id, group);
                } else { // save new
                    return $http.post('/api/groups', group);
                }
            },

            delete: function(group) {
                if(group._id) { // delete
                    return $http.delete('/api/groups/' + group._id +'/'+ group._rev);
                } else {
                    console.log('services/groups.js: Error! Can not delete group that does not exist.');
                    return null;
                }
            }
        };
    }]);
})();