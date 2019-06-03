'use strict';

app.controller('MainCtrl', function (
    $state,
    $rootScope,
    $scope,
    basketService,
    overlayService,
    socketService) {

    //Get the order the first time it's loaded

    // basketService.getOrder().then(function (response) {
    //   $scope.order = basketService.order;
    // });

    $rootScope.tempOutcomesOdds = null;
    overlayService.setScreensaverState(false);

    $rootScope.$on('resetSession', function (event) {
        // clear basket
        basketService.clearBasket();

        // clear order
        basketService.clearOrder();
        $state.go('root.home');
    });

});