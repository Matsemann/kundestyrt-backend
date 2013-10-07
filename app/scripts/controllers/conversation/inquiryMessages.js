'use strict';

angular.module('kundestyrtApp')
  .controller('InquiryMessagesCtrl', ['$scope', '$routeParams', 'conversation', function ($scope, $routeValues, conversation) {
    $scope.conversation = conversation.conversations[parseInt($routeValues.sub, 10) - 1];
  }]);
