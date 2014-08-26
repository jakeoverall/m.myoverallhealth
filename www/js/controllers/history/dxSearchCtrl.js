var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('dxSearchCtrl', ['$scope', 'icd9DataService', 'firebaseService', function ($scope, icd9DataService, firebaseService) {

    var diagnoses = firebaseService.getDiagnoses($scope.username.id, $scope.profile.$id).$asArray();

    $scope.diagnoses = diagnoses;

    $scope.formShow = false;
    $scope.showForm = function () {
        $scope.formShow = !$scope.formShow;
    };


    $scope.searchDx = function () {
        icd9DataService.find($scope.dxSearch).then(function (res) {
            $scope.results = res;
        });
    };

    $scope.setDx = function (dx) {
        $scope.dx = dx;
        $scope.formShow = true;
    };

    $scope.addDx = function () {
        var add = true;
        $scope.diagnoses.forEach(function (d) {
            if ($scope.dx.description === d.description) {
                $scope.diagnoses.$save($scope.dx);
                add = false;
            }
        });
        if (add) {
            delete $scope.dx.$$hashKey;
            $scope.diagnoses.$add($scope.dx);
            $scope.dx = null;
        }
        $scope.dx = null;
        $scope.formShow = false;
    };

    $scope.updateDx = function (dx) {
        $scope.diagnoses.$save(dx);
    };

    $scope.removeDx = function (dx) {
        $scope.diagnoses.$remove(dx);
    };
}]);