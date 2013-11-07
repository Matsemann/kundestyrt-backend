'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationListCtrl', ['$scope', 'conversations', 'Conversation', function ($scope, conversations, Conversation) {
        alert('controller loaded');
    $scope.conversations = conversations;


  }]);
