'use strict';

app.controller('SuccessCtrl', function (
    $scope,
    $state,
    productService,
    vendService,
    basketService,
    dataCaptureService,
    $timeout
) {
    var promise = $timeout(function () {
        $state.go('root.home');
    }, 5000);

    $scope.$on('$destroy', function () {
        $timeout.cancel(promise);
    });
});