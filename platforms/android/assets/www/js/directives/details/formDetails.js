﻿var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('formDetails', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/profiles/form-details.html'
    };
});