'use strict';

angular.module('kundestyrtApp')
  .controller('MainCtrl', ['$scope', '$routeParams', 'Conversation', function ($scope, $routeParams, Conversation) {
    $scope.conversations = Conversation.get();

    if($routeParams.id) {
        if($routeParams.sub) {
            $scope.conversation = Conversation.get($routeParams.id);
            $scope.subConversation = Conversation.get($routeParams.id, parseInt($routeParams.sub, 10) - 1);
        } else {
            $scope.conversation = Conversation.get($routeParams.id);
        }
    }

    $scope.$watch(function() {
        if(!$scope.conversation) {
            return null;
        }

        if($routeParams.sub) {
            return '/views/inquiry-conv.html';
        }

        switch($scope.conversation.type) {
            case 0: return '/views/conversation.html';
            case 1: return '/views/inquiry.html';
        }

        return null;
    }, function(value) {
        $scope.view = value;
    });

    $scope.send = function(msg) {
        Conversation.send($routeParams.id, parseInt($routeParams.sub || '0', 10) - 1, msg);
    };
  }]);
