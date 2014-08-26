var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('medList', function () {
    return {
        restrict: 'A',
        controller: 'medicationsCtrl',
        templateUrl: 'views/medications/med-list.html'
    };
});