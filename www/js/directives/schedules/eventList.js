var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('eventList', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/schedules/event-list.html'
    };
});