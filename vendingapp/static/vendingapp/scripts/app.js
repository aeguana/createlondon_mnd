var app = angular.module('digitalvendtouch', [
  'ui.router',
  'ui.bootstrap',
  'ngSanitize',
  'ng-virtual-keyboard'
]);
app.run(function ($state, $timeout) {
  $timeout(function () {
    $state.go('root.home');
  });
});