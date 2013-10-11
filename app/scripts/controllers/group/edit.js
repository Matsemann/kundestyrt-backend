'use strict';

angular.module('kundestyrtApp')
    .controller('GroupEditCtrl', ['$scope', 'group', 'Groups', 'users', '$location', function ($scope, group, Groups, users, $location) {

        $scope.group = group || {name: '', members: []};
        $scope.users = users;

        $scope.saveGroup = function() {
            Groups.save($scope.group).then(function(xhr) {
                console.log(xhr);
                if ($scope.group._id) {
                    $scope.group = xhr.data;
                } else {
                    $location.path('/groups/' + xhr.data.id);
                }
            });
        };

        $scope.deleteGroup = function() {
            Groups.delete($scope.group).then(function() {
                $location.path('/groups');
            });
        };

        $scope.toggleUser = function(user) {
            if ($scope.isUserIdInGroup(user._id)) {
                $scope.group.members.splice($scope.group.members.indexOf(user._id), 1);
            } else {
                $scope.group.members.push(user._id);
            }
        };

        $scope.isInGroup = function() {
            return function(user) {
                return $scope.isUserIdInGroup(user._id);
            };
        };

        $scope.isUserIdInGroup = function(userId) {
            return ($scope.group.members.indexOf(userId) > -1);
        };
    }]);
