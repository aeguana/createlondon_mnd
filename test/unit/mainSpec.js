describe('Testing Main Controller', function () {
    beforeEach(module("digitalvendtouch"));
    var scope, state, timeout, rootScope;

    beforeEach(inject(function ($controller, $rootScope, $state, $timeout) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        timeout = $timeout;

        ctrl = $controller("MainCtrl", {
            $scope: scope,
            $state: state,
            $timeout: timeout
        });

        spyOn(state, 'go');
    }));

    it('Should maxItems == 4 and maxBasketValue == 250', function () {
        expect(scope.maxItems).toBe(4);
        expect(scope.maxBasketValue.d[0]).toBe(250);
    });
});