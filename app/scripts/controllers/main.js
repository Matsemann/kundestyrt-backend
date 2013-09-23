'use strict';

angular.module('kundestyrtApp')
  .controller('MainCtrl', ['$scope', 'Conversation', function ($scope, Conversation) {
    $scope.conversations = Conversation.get();
  }]);
