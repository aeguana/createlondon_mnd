app.factory('dataCaptureService', function ($http) {
    var dataCaptureService = {};
    dataCaptureService.capturedDataDict = [];
    dataCaptureService.email = null;

    dataCaptureService.verifyEmail = function (email) {
        return $http.post('/api/1.0/verify-email/', {
            email: email
        })
    };

    dataCaptureService.send_print = function () {
        return $http.get('/api/1.0/send-print/')
    };

    dataCaptureService.addData = function (data) {
        //First we need to check if we've already answered the question
        dataCaptureService.capturedDataDict.push(data);
        return dataCaptureService.capturedDataDict
    };

    return dataCaptureService;
});