'use strict';

app.controller('ServiceSpecCtrl', function (
    $scope,
    $rootScope,
    basketService,
    productService,
    socketService,
    overlayService) {


    // Get Products
    productService.getProducts().then(function (result) {

        // Product Service Test
        console.log('>>>>>>>>>>>>>>>>>>>>>');
        console.log('Product Service Test');
        console.log("-> Return at least one product");

        if (productService.products.length > 0) {
            console.log(productService.products);
            console.log("Success");
        } else {
            console.log("Failed");
        }

        // Basket Service Test
        console.log('>>>>>>>>>>>>>>>>>>>>>');
        console.log('Basket Service Test');
        console.log('-> Added 1 item in temporary basket and order bigger than 0');
        basketService.addToTempBasket({
            product: productService.products[0],
            qty: 1
        }, false);

        $scope.orderTotal = basketService.orderTotal;

        if ($scope.orderTotal.d[0] == 1 && $scope.orderTotal.d[1] > 0) {
            console.log('Success');
        } else {
            console.log("Failed");
        }

        console.log('-> 1 item in tempOrder');
        $scope.tempOrder = basketService.tempOrder || [];
        if ($scope.tempOrder.length == 1) {
            console.log('tempOrder: 1');
            console.log('Success');
        } else {
            console.log("Failed");
        }

        console.log('-> Added 1 product to basket to pay');
        basketService.addToBasket($scope.tempOrder, true, false)
            .then(function (response) {
                console.log('added products to basket: ' + $scope.tempOrder.length);
                console.log("Success");

                console.log('-> Remove product from basket');
                console.log('removing product index from basket: ' + 0);
                basketService.removeFromTempBasket(0);
                $scope.orderTotal = basketService.orderTotal;
                console.log("Success");
            })
            .catch(function (response) {
                console.log('caught error adding to basket!!');
                console.log("Failed");
            });
    });

});