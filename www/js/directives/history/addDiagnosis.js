var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('addDiagnosis', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/history/diagnoses/form.html'
    };
});