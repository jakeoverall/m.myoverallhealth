var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('bmi', function () {
    return {
        restrict: 'A',
        controller: 'bmiCtrl',
        templateUrl: 'views/shared/bmi.html'
    };
});