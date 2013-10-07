'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('kundestyrtApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('ConversationListCtrl', {
      $scope: scope,
      conversations: [0,1,2] // TODO: insert actual mock-data
    });
  }));

  it('should attach a list of conversations', function () {
    expect(scope.conversations).to.be.instanceof(Array)
      .and.have.length.above(0);
  });
});
