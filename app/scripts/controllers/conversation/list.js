'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationListCtrl', ['$scope', 'conversations', function ($scope, conversations) {
    $scope.conversations = conversations;
  }]);
