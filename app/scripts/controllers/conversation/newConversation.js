'use strict';

angular.module('kundestyrtApp')
    .controller('NewConversationCtrl', ['$scope', 'users', 'groups', function ($scope, users, groups) {
        $scope.users = users;
        $scope.groups = groups;

        $scope.tab = 'users';
        $scope.filter = '';

        $scope.message = {
            topic: '',
            message: '',
            inquiry: false,
            recipients: {
                users: [],
                groups: []
            }
        };
    }]);
