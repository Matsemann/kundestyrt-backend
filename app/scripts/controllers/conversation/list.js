'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationListCtrl', ['$scope', 'conversations', 'Conversation', function ($scope, conversations, Conversation) {
        for (var i = 0; i < 10; i++) {
            console.log('conversation controller!!');
        }
        console.log(conversations);
    $scope.conversations = conversations;


  }]);
