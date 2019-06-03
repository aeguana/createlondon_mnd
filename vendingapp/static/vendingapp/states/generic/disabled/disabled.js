'use strict';

app.controller('DisabledCtrl', function (
    $state,
    $scope
) {
    var listenerEvent = $scope.$on('ALERT', function (event, data) {
        if (data == 68) {
            $state.go('root.home');
        }
    });

    //Clean up
    $scope.$on('$destroy', function () {
        listenerEvent();
    });
});