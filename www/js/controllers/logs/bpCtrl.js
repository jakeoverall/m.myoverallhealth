var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('bpCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {
    var bps = firebaseService.getBps($scope.username.id, $scope.profile.$id).$asArray();

    $scope.bps = bps;
    $scope.limit = -5;
    $scope.hide = true;
    $scope.changeLimit = function(){
        if($scope.limit < 0){
            $scope.hide = false;
            $scope.limit = 100000;
        } else {
            $scope.hide = true;
            $scope.limit = -5;
        }
    }

    $scope.add = function (bp) {
        if(bp.sys && bp.dia){
            if(bp.sys >= 150 || bp.sys <= 90 || bp.dia >= 80 || bp.dia <= 40){
                bp.warning = true;
            }
        $scope.hide = true;
        bp.time = new Date().toISOString();
        $scope.bps.$add(bp);
        $scope.bp = '';
        }
    };
    $scope.cancel = function(){
        $scope.changeLimit();
        $scope.bp = '';
    }
}]);