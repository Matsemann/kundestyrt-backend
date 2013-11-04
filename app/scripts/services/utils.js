'use strict';

(function(undefined) {
    angular.module('kundestyrtApp').factory('utils', ['$http', function($http) {
        function validatePassword(pw) {
            if(pw.length < 4)
                return 'må være lengre enn 4 tegn.';

            return null;
        }

        return {
            validatePassword: validatePassword
        };
    }]);
})();