'use strict';

app.controller('DataCaptureCtrl', function (
    $scope,
    $state,
    $timeout,
    dataCaptureService
) {
    var pins = [
        2995,
        1663,
        1747,
        1410,
        8745,
        2738,
        1837,
        3709,
        9800,
        6612,
        1411,
        2689
    ];
    var decodeKeys = {
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        66: 'delete_last',
        67: 'delete_all',
        65: 'confirm',
    };

    $scope.pinCodeStage = 0;
    $scope.pinCodeSimbol = '';
    $scope.pinCodeVal = '';

    $scope.timeoutPageOut = function () {
        $scope.refreshTime = $timeout(function () {
            $scope.pinCodeStage = 0;
            $scope.pinCodeSimbol = '';
            $scope.pinCodeVal = '';
            $timeout.cancel($scope.refreshTime);
            $state.go('root.home');
        }, 15000);
    }

    $scope.timeoutPageOut();

    var listenerEvent = $scope.$on('ALERT', function (event, data) {
        $timeout.cancel($scope.refreshTime);
        $scope.timeoutPageOut();
        $scope.$apply(function () {
            switch (decodeKeys[data]) {
                case 'delete_all':
                    $scope.pinCodeVal = '';
                    break;
                case 'delete_last':
                    $scope.pinCodeVal = $scope.pinCodeVal.slice(0, -1);
                    break;
                case 'confirm':
                    // $timeout(function () {
                    //     $scope.insertPin();
                    // });
                    break;
                default:
                    if (data != 69 && $scope.pinCodeVal.length < 4 && data != 68) {
                        $scope.pinCodeVal += decodeKeys[data];
                    }
                    break;
            }
            $scope.pinCodeSimbol = '';
            for (let v = 0; v < $scope.pinCodeVal.length; v++) {
                $scope.pinCodeSimbol += ' ✱ ';
            }
            if ($scope.pinCodeVal.length == 4) {
                $timeout(function () {
                    $scope.insertPin();
                });
            }
        });
    });

    //Clean up
    $scope.$on('$destroy', function () {
        $timeout.cancel($scope.refreshTime);
        listenerEvent();
    });

    $scope.insertPin = function () {
        if (pins.indexOf(parseInt($scope.pinCodeVal)) > -1) {
            dataCaptureService.send_print(
                "file.txt")
                .then(function (result) {
                    $state.go("root.vending");
                });
        } else {
            $state.go("root.oops");
        }
    }
});