'use strict';

angular.module('kundestyrtApp')
    .controller('GroupListCtrl', ['$scope', 'groups', function ($scope, groups) {
        $scope.groups = groups;
    }]);
