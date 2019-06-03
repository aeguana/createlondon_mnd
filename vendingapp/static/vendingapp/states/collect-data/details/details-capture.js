'use strict';

app.controller('EmailCaptureCtrl', function (
    $state,
    $scope,
    dataCaptureService,
    vendService,
    $timeout
) {

    var listenerEvent = $scope.$on('ALERT', function (event, data) {
        if (data == 69) {
            $state.go('root.data');
        } else if (data == 68) {
            $state.go('root.disabled');
        }
    });

    $timeout(function () {
        $scope.refreshVideo(2);
    }, 10000);

    $scope.refreshVideo = function (status) {
        var parent = document.getElementById('video-container');
        parent.innerHTML = "";
        var video = document.createElement('video');
        parent.appendChild(video);
        if (status == 1) {
            video.src = '/static/vendingapp/assets/videos/loop.mp4';
            video.loop = true;
            video.play();
        } else {
            video.src = '/static/vendingapp/assets/videos/video.mp4';
            video.onended = function (e) {
                $scope.refreshVideo(1);
            };
            video.play();
        }
    };

    $scope.activeVideo = function () {
        $scope.refreshVideo(1);
    };

    $scope.insertPin = function () {
        $state.go('root.data');
    };

    //Clean up
    $scope.$on('$destroy', function () {
        listenerEvent();
    });
});