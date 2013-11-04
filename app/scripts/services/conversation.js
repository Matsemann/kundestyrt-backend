'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('Conversation', ['$q', '$http', 'BaseUrl', function($q, $http, BaseUrl) {
        return {
            list: [function() {
                return $http.get(BaseUrl + 'api/conversations').then(function(xhr) {
                    return xhr.data.rows;
                });
            }],

            get: ['id', function(id) {
                return $http.get(BaseUrl + 'api/conversations/' + id).then(function(xhr) {
                    return xhr.data;
                });
            }],

            send: function(msg, id, sub) {
                var data = {content: msg};
                var url = BaseUrl + 'api/conversations/' + id;
                if(sub) {
                    url += '/' + sub;
                }
                url += '/send';

                return $http.post(url, data).then(function(xhr) {
                    return xhr.data;
                });
            },

            create: function(conversation) {
                return $http.post(BaseUrl + 'api/conversations', conversation).then(function (xhr) {
                    return xhr.data.id;
                });
            }
        };
    }]);
})();