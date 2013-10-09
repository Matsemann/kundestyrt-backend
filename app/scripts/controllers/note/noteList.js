'use strict';

angular.module('kundestyrtApp')
  .controller('NoteListCtrl', ['$scope', 'notes', function ($scope, notes) {
    $scope.notes = notes;
  }]);
