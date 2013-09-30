'use strict';

angular.module('kundestyrtApp')
  .controller('NoteCtrl', ['$scope', '$routeParams', 'Notes', function ($scope, $routeParams, Notes) {
    $scope.notes = Notes.getNotes();
    if($routeParams.id) {
        $scope.note = Notes.getNote(parseInt($routeParams.id));
    }
  }]);
