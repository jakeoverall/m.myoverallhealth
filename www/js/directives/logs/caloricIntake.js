var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('caloricIntake', function () {
    return {
        restrict: 'A',
        controller: 'CaloricIntakeCtrl',
        templateUrl: 'views/logs/caloric-intake.html'
    };
});