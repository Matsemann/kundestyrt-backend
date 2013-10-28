'use strict';

angular.module('kundestyrtApp')
    .controller('UserCtrl', ['$scope', '$sce', 'user', function ($scope, $sce, user) {
        // Tell Angular that this html is safe and can be rendered
        user.html = $sce.trustAsHtml(user.html);

        $scope.user = user;
    }]);
