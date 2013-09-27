'use strict';

angular.module('kundestyrtApp')
  .controller('NewConvCtrl', ['$scope', '$routeParams', '$location', 'Conversation', 'Contacts', function ($scope, $routeParams, $location, Conversation, Contacts) {
    $scope.users = Contacts.getUsers();
    var inquiry = $scope.inquiry = {
        enable: false,
        value: ''
    };

    var recipents = $scope.recipents = [];

    $scope.toggle = function(recipent, isGroup, oldValue) {
        var add = !oldValue;
        if(add) {
            recipents.push({
                recipent: recipent,
                isGroup: isGroup
            });
        } else {
            for(var i = 0, l = recipents.length; i < l; i++) {
                if(recipents[i] === recipent) {
                    recipents.splice(i, 1);
                    return;
                }
            }
        }

        return add;
    };

    $scope.send = function() {
        if(!$scope.canSend) { return; }

        Conversation.create(recipents.length > 1 && inquiry.enable, recipents, $scope.topic, inquiry.value);
        $location.path('/');

    };

    $scope.$watch(function() {
        if(!recipents.length) { return false; }
        if(!$scope.topic || !$scope.topic.length) { return false; }
        if(inquiry.enable && !inquiry.value) { return false; }
        return true;
    }, function(value) {
        $scope.canSend = value;
    });
  }]);
