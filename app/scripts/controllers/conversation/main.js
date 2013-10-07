'use strict';

angular.module('kundestyrtApp')
  .controller('ConversationCtrl', ['$scope', 'conversation', function ($scope, conversation) {
    $scope.conversation = conversation;
  }]);
