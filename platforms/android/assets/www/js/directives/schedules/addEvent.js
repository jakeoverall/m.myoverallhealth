var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('addEvent', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/schedules/form.html'
    };
});