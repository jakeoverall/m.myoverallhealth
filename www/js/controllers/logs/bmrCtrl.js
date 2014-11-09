var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('bmrCtrl', ['$scope', function ($scope) {
    $scope.calculate = function(){
      if($scope.profile.feet && $scope.profile.inches && $scope.profile.weight && $scope.profile.age && $scope.profile.gender){
            var factor = 5;
        if($scope.profile.gender !== 'Male'){
            factor = -161;
        }
        var bmr = (($scope.profile.weight / 2.2) * 10) + (6.25 * ((($scope.profile.feet * 12) + $scope.profile.inches) / 2.54) - ((5 * $scope.profile.age) + factor));
        $scope.profile.bmr = bmr.toFixed(2);
        $scope.profile.$save();
      } else {
        $scope.error = 'Please finish filling out your profile to see your BMR'
      }

    };

    $scope.calculate();

}]);
