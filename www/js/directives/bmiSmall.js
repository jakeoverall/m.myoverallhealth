var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('bmiSmall', function () {
    return {
        restrict: 'A',
        controller: 'bmiCtrl',
        templateUrl: 'views/shared/BMI-small.html'
    };
});