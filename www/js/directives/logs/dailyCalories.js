var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('dailyCalories', function () {
    return {
        restrict: 'A',
        controller: 'DailyCaloriesCtrl',
        templateUrl: 'views/logs/daily-calories.html'
    };
});