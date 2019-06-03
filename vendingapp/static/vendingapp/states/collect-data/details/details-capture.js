'use strict';

app.controller('EmailCaptureCtrl', function (
    $state,
    $scope,
    dataCaptureService,
    vendService
) {
    var listenerEvent = $scope.$on('ALERT', function (event, data) {
        if (data == 69) {
            $state.go('root.data');
        } else if (data == 68) {
            $state.go('root.disabled');
        }
    });

    //Clean up
    $scope.$on('$destroy', function () {
        listenerEvent();
    });


    $scope.insertPin = function () {
        $state.go('root.data');
    }
});