// 'use strict';

app.config(function ($stateProvider, $urlRouterProvider, VKI_CONFIG) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        // main view
        .state('root', {
            url: '/main',
            templateUrl: 'static/vendingapp/states/generic/main/main.html',
            controller: 'MainCtrl'
        })

        // collect data
        .state('root.home', {
            url: '/details-capture',
            templateUrl: 'static/vendingapp/states/collect-data/details/details-capture.html',
            controller: 'EmailCaptureCtrl',
        })
        .state('root.data', {
            url: '/data-capture',
            templateUrl: 'static/vendingapp/states/collect-data/data/data-capture.html',
            controller: 'DataCaptureCtrl'
        })

        // complete 
        .state('root.vending', {
            url: '/vending',
            templateUrl: 'static/vendingapp/states/collect-data/vending/vending.html',
            controller: 'VendingCtrl'
        })
        .state('root.complete', {
            url: '/complete',
            templateUrl: 'static/vendingapp/states/complete/success.html',
            controller: 'SuccessCtrl'
        })

        // generic
        .state('root.oops', {
            url: '/oops',
            templateUrl: 'static/vendingapp/states/generic/oops/oops.html',
            controller: 'OopsCtrl'
        })

        // generic
        .state('root.disabled', {
            url: '/disabled',
            templateUrl: 'static/vendingapp/states/generic/disabled/disabled.html',
            controller: 'DisabledCtrl'
        })

        // tests
        .state('root.tests', {
            url: '/tests',
            controller: 'ServiceSpecCtrl'
        });

    //Touch Keyboard Configuration
    VKI_CONFIG.layout = 'custom';
    VKI_CONFIG.display = {
        'meta1': '?123',
        'meta2': '#+=',
        'normal': 'ABC',
        'bksp': 'DEL'
    };
    VKI_CONFIG.customLayout = {
        'normal': [
            'q w e r t y u i o p',
            'a s d f g h j k l ',
            'z x c v b n m {bksp}',
            '{meta1} {space} . @ {shift}'
        ],
        'shift': [
            'Q W E R T Y U I O P ',
            'A S D F G H J K L ',
            'Z X C V B N M {bksp}',
            '{meta1} {space} . @  {shift}'
        ],
        'meta1': [
            '1 2 3 4 5 6 7 8 9 0',
            '- / : $ & @ "',
            "{meta2} . , ? ! ' {bksp}",
            '{normal} {space} '
        ],
        'meta2': [
            '[ ] { } # % ^ * + =',
            '_ \ | ~ < > € £',
            "{meta1} . , ? ! ' {bksp}",
            '{normal} {space}'
        ]
    };
    VKI_CONFIG.usePreview = false;
    VKI_CONFIG.autoAccept = true;
    VKI_CONFIG.alwaysOpen = false;

});