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

        $scope.isUserSelected = function(user) {
            return $scope.message.recipients.users.indexOf(user) > -1;
        };

        $scope.toggleUser = function(user) {
            if ($scope.isUserSelected(user)) {
                $scope.message.recipients.users.splice($scope.message.recipients.users.indexOf(user), 1);
            } else {
                $scope.message.recipients.users.push(user);
            }
        };

        $scope.isGroupSelected = function(group) {
            return $scope.message.recipients.groups.indexOf(group) > -1;
        };

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupSelected(group)) {
                $scope.message.recipients.groups.splice($scope.message.recipients.groups.indexOf(group), 1);
            } else {
                $scope.message.recipients.groups.push(group);
            }
        };

        $scope.createConversation = function() {

        }
    }]);
