'use strict';

(function(undefined) {

    var BASE_URL = '/';//'http://kundestyrt.azurewebsites.net/';

    angular.module('kundestyrtApp').factory('AuthInterceptor', ['$q', '$injector', '$rootScope', function($q, $injector, $rootScope) {

        function log(response) {
            console.log(response.status + ': ' + response.config.url);
            return response;
        }

        return {
            request: function(config) {
                return $q.when(config).then(function(conf) {
                    if(conf.url.substring(0, 'api/'.length) === 'api/' || conf.url === 'login') {
                        conf.url = BASE_URL + conf.url;
                        if(conf.method !== 'POST') {
                            conf.url += '?ver=' + new Date().getTime();
                        }
                    }
                    conf.withCredentials = true;


                    console.log('Request ' + conf.url + ' using ' + conf.method);
                    return conf;
                });
            },

            response: log,

            responseError: function(response) {
                log(response);

                if(response.status === 401 && response.config.url !== BASE_URL + 'login') {
                    var $http = $injector.get('$http'); // trick to avoid circular dependency.
                    var config = response.config;
                    if(!$rootScope.$user) {
                        var deferred = $q.defer();
                        $rootScope.$login(deferred);
                        return deferred.promise.then(function() {
                            return $http(config);
                        });
                    }
                }

                return $q.reject(response);
            }
        };
    }]);
})();