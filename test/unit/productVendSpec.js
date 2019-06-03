describe('Testing List Controller', function () {

    beforeEach(module('digitalvendtouch'));

    // Setup the mock service in an anonymous module.
    beforeEach(module(function ($provide) {
        $provide.value('oneOfMyOtherServicesStub', {
            someVariable: 1
        });
    }));

    it('can get an instance of my factory', inject(function (productvendService) {

    }));
});