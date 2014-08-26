var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('editDiagnosis', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/history/diagnoses/form-edit.html'
    };
});