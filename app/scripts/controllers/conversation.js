'use strict';

angular.module('kundestyrtApp')
  .controller('ConvCtrl', ['$scope', '$routeParams', 'Conversation', function ($scope, $routeParams, Conversation) {
    $scope.conversations = Conversation.get();
    $scope.messages = Conversation.get($routeParams.id);
  }]);
