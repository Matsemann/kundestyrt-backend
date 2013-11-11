'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationListCtrl', ['$scope', 'conversations', function ($scope, conversations) {
    $scope.conversations = conversations;


        $scope.isUnread = function(conv) {
            return (conv.usersRead !== undefined && (conv.usersRead.indexOf($scope.$user._id) === -1));
        };
  }]);
