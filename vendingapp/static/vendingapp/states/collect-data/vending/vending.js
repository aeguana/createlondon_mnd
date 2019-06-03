'use strict';

app.controller('VendingCtrl', function (
    $state,
    $scope,
    $timeout,
    dataCaptureService,
    vendService
) {
    var promise = $timeout(function () {
        $state.go('root.complete');
    }, 5000);

});