var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('bmiCtrl', ['$scope', function ($scope) {

    $scope.calculateBMI();

}]);