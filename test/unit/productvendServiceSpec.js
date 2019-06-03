describe('Testing productvendService Controller', function () {
    beforeEach(module("digitalvendtouch"));
    var scope, state, timeout, rootScope;

    //Setup the mock service in an anonymous module.
    beforeEach(module(function ($provide) {
        $provide.value('getProducts', {
            someVariable: 1
        });
    }));

    it('verify that exist at least one product', inject(function (productService) {
        //expect(productService).toBeDefined();
        // productvendService.getProductsToVend();
    }));
});