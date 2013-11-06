'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Conversation', ['$q', '$http', function($q, $http) {
        return {
            list: [function() {
                return $http.get('api/conversations').then(function(xhr) {
                    return xhr.data.rows;
                });
            }],

            get: ['id', function(id) {
                return $http.get('api/conversations/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }],

            send: function(msg, id, sub) {
                var data = {content: msg};
                var url = 'api/conversations/' + id;
                if(sub) {
                    url += '/' + sub;
                }
                url += '/send';

                return $http.post(url, data).then(function(xhr) {
                    return xhr.data;
                });
            },

            create: function(conversation) {
                return $http.post('api/conversations', conversation).then(function (xhr) {
                    return xhr.data.id;
                });
            }
        };
    }]);
})();