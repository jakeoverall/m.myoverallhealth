var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('diagnoses', function () {
    return {
        restrict: 'A',
        controller: 'dxSearchCtrl',
        templateUrl: 'views/history/diagnoses/diagnoses.html'
    };
});