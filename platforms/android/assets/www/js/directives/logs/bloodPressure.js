var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('bloodPressure', function () {
    return {
        restrict: 'A',
        controller: 'bpCtrl',
        templateUrl: 'views/logs/blood-pressure.html'
    };
});