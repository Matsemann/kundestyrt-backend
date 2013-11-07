'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationListCtrl', ['$scope', 'conversations', function ($scope, conversations) {
    $scope.conversations = conversations;

        // dirty fix to set the last time something happened in the inquiry to the latest message in any conversation..
        for (var i = 0; i < $scope.conversations.length; i++) {
            if ($scope.conversations[i].type == 1) {
                var latestDate = "";
                for (var j = 0; j < $scope.conversations[i].conversations.length; j++) {
                    if ($scope.conversations[i].conversations[j].messages[$scope.conversations[i].conversations[j].messages.length - 1].date > latestDate) {
                        latestDate = $scope.conversations[i].conversations[j].messages[$scope.conversations[i].conversations[j].messages.length - 1].date;
                    }
                }
                $scope.conversations[i].messages = [{date: latestDate}];
            }
        }


        $scope.isUnread = function(conv) {
            return (conv.usersRead !== undefined && (conv.usersRead.indexOf($scope.$user._id) === -1));
        };
  }]);
