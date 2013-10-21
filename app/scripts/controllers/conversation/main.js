'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationCtrl', ['$scope', 'conversation', 'Conversation', function ($scope, conversation, Conversation) {
    $scope.conversation = conversation;

    $scope.send = function(msg) {
        Conversation.send(msg, conversation._id).then(function(c) {
            if(c) {
                $scope.conversation = c;
            }
        });
    };
  }]);
