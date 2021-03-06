'use strict';

angular.module('kundestyrtApp')
    .controller('NewConversationCtrl', ['$scope', 'users', 'groups', 'Conversation', '$location', function ($scope, users, groups, Conversation, $location) {
        $scope.users = users;
        $scope.groups = groups;

        $scope.tab = 'users';
        $scope.filter = '';

        $scope.conversation = {
            topic: '',
            message: '',
            inquiry: false,
            recipients: {
                users: [],
                groups: []
            }
        };

        $scope.isUserSelected = function(user) {
            return $scope.conversation.recipients.users.indexOf(user) > -1;
        };

        $scope.toggleUser = function(user) {
            if ($scope.isUserSelected(user)) {
                $scope.conversation.recipients.users.splice($scope.conversation.recipients.users.indexOf(user), 1);
            } else {
                $scope.conversation.recipients.users.push(user);
            }
        };

        $scope.isGroupSelected = function(group) {
            return $scope.conversation.recipients.groups.indexOf(group) > -1;
        };

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupSelected(group)) {
                $scope.conversation.recipients.groups.splice($scope.conversation.recipients.groups.indexOf(group), 1);
            } else {
                $scope.conversation.recipients.groups.push(group);
            }
        };

        $scope.create = function() {
            if (canSend($scope.conversation)) {
                Conversation.create($scope.conversation).then(function(id) {
                    console.log(id);
                    $location.path('/conversation/' + id);
                });
            }
        };

        function canSend(conv) {
            if (conv.topic === '') {
                $scope.$alert('Du må fylle inn et emne');
                return false;
            } else if (conv.message === '') {
                $scope.$alert('Du må skrive en melding');
                return false;
            } else if (conv.message === '') {
                $scope.$alert('Du må skrive en melding');
                return false;
            } else if (conv.recipients.users.length === 0 && conv.recipients.groups.length === 0) {
                $scope.$alert('Du må velge mottakere');
                return false;
            }

            return true;
        }
    }]);
