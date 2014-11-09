var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('bmrCtrl', ['$scope', function ($scope) {
    $scope.calculate = function(){
      if($scope.profile.feet && $scope.profile.inches && $scope.profile.weight && $scope.profile.age && $scope.profile.gender){
            var factor = 66;
            var weightFactor = 6.23;
            var heightFactor = 12.7;
            var ageFactor = 6.8; 
        if($scope.profile.gender !== 'Male'){
            factor = 655;
            weightFactor = 4.35;
            heightFactor = 4.7;
            ageFactor = 4.7;
        }
        var bmr = factor + (weightFactor * Number($scope.profile.weight)) + (heightFactor * (Number($scope.profile.feet) * 12 + Number($scope.profile.inches))) - (ageFactor * Number($scope.profile.age));
        $scope.profile.bmr = bmr.toFixed(2);
        $scope.profile.$save();
      } else {
        $scope.error = 'Please finish filling out your profile to see your BMR'
      }

    };

    $scope.calculate();

}]);