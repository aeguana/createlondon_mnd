'use strict';

app.controller('OopsCtrl', function (
    $scope,
    $state,
    $timeout
) {

    $scope.cancel = function () {
        $state.go('root.data');
    }

    var promise = $timeout(function () {
        $state.go('root.data');
    }, 3000);

    $scope.$on('$destroy', function () {
        $timeout.cancel(promise);
    });
});