var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('bmr', function () {
    return {
        restrict: 'A',
        controller: 'bmrCtrl',
        templateUrl: 'views/logs/bmr.html'
    };
});