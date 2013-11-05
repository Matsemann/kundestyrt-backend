'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('AuthInterceptor', ['$q', '$injector', '$rootScope', 'BaseUrl', function($q, $injector, $rootScope, BaseUrl) {

        return {
            request: function(config) {
                return $q.when(config).then(function(conf) {
                    if(conf.url.substring(0, 'api/'.length) === 'api/') {
                        conf.url = BaseUrl + conf.url;
                    }
                    conf.withCredentials = true;
                    return conf;
                });
            },

            responseError: function(response) {
                if(response.status === 401 && response.config.url !== BaseUrl + 'login') {
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