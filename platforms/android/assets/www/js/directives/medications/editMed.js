var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('editMed', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/medications/form-edit.html'
    };
});