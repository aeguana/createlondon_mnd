app.factory('machineService', function ($state, vendService) {

    var machineService = {};

    machineService.machineCheck = function () {

        var disableMachine = function (setMachineState) {
            if (setMachineState == false) {
                $state.go('root.disabled');
            }
        };

        vendService.getConfig().then(
            function (response) {
                disableMachine(response.data.enabled);
            }
        );
    };

    return machineService;

});