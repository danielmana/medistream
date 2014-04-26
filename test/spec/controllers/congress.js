'use strict';

describe('Controller: CongressCtrl', function () {

  // load the controller's module
  beforeEach(module('medistreamApp'));

  var CongressCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CongressCtrl = $controller('CongressCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
