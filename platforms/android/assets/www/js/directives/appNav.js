var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('appNav', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/shared/app-nav.html'
    };
});