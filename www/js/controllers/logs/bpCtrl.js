var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('bpCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {
    var bps = firebaseService.getBps($scope.username.id, $scope.profile.$id).$asArray();

    $scope.bps = bps;

    $scope.add = function () {
        var bp = {};
        bp.sys = $scope.sys;
        bp.dia = $scope.dia;
        bp.time = $scope.time || new Date().toISOString();

        $scope.bps.$add(bp);

        $scope.sys = '';
        $scope.dia = '';
        $scope.time = '';
    };
}]);