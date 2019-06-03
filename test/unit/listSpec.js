describe('Testing List Controller', function () {
    beforeEach(module("digitalvendtouch"));
    var scope, state, timeout;

    //Setup the mock service in an anonymous module.
    beforeEach(module(function ($provide) {
        $provide.value('getProductsToVend', {
            someVariable: 1
        });
    }));

    beforeEach(inject(function ($controller, $rootScope, $state, $timeout) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        timeout = $timeout;

        ctrl = $controller("ListCtrl", {
            $scope: scope,
            $state: state,
            $timeout: timeout
        });

        spyOn(state, 'go');
    }));

    it('Should tempOrder and orderTotal be initialize', function () {
        expect(scope.tempOrder).toBeDefined;
        expect(scope.orderTotal).toBeDefined;
    });
});