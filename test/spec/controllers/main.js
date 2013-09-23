'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('kundestyrtApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of conversations', function () {
    expect(scope.conversations).to.be.instanceof(Array)
      .and.have.length.above(0);
  });
});
