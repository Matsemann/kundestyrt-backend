'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationListCtrl', ['$scope', 'conversations', 'Conversation', function ($scope, conversations, Conversation) {
    $scope.conversations = conversations;

  }]);
