var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('addMed', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/medications/form.html'
    };
});