var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('editEvent', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/schedules/form-edit.html'
    };
});