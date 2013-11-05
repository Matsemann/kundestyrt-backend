'use strict';

(function(undefined) {

    var BASE_URL = 'http://kundestyrt.azurewebsites.net/';

    angular.module('kundestyrtApp').factory('AuthInterceptor', ['$q', '$injector', '$rootScope', function($q, $injector, $rootScope) {

        return {
            request: function(config) {
                return $q.when(config).then(function(conf) {
                    if(conf.url.substring(0, 'api/'.length) === 'api/' || conf.url === 'login') {
                        conf.url = BASE_URL + conf.url;
                    }
                    conf.withCredentials = true;
                    return conf;
                });
            },

            responseError: function(response) {
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