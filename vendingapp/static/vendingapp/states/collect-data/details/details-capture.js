'use strict';

app.controller('EmailCaptureCtrl', function (
    $state,
    $scope,
    dataCaptureService,
    vendService,
    $timeout
) {

    var listenerEvent = $scope.$on('DONATION', function (event, data) {
        $scope.refreshVideo(2);
    });

    $scope.refreshVideo = function (status) {
        var parent = document.getElementById('video-container');
        parent.innerHTML = "";
        var video = document.createElement('video');
        parent.appendChild(video);
        if (status == 1) {
            video.src = '/static/vendingapp/assets/videos/loop.mov';
            video.loop = true;
            video.play();
        } else {
            video.src = '/static/vendingapp/assets/videos/video.mov';
            video.onended = function (e) {
                $scope.refreshVideo(1);
            };
            video.play();
        }
    };

    $scope.refreshVideo(1);

    $scope.insertPin = function () {
        $state.go('root.data');
    };

    //Clean up
    $scope.$on('$destroy', function () {
        listenerEvent();
    });
});