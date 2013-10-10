'use strict';

angular.module('kundestyrtApp')
    .controller('GroupEditCtrl', ['$scope', function ($scope) {
        $scope.note = note;

        $scope.saveNote = function() {
            Notes.save($scope.note).then(function() {
                $location.path('/notes/' + note._id);
            });
        };
    }]);
