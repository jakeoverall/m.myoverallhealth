var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('CaloricIntakeCtrl', ['$scope', function ($scope) {

    $scope.calculateWeightGoal = function(){
        if($scope.profile.bmr){
            $scope.message = '';
            $scope.warning = '';
            $scope.profile.targetCaloricIntake = Number($scope.profile.bmr) * Number($scope.profile.fitLevel);
            if($scope.profile.weightGoal === 'Loss'){
                $scope.profile.targetCaloricIntake *= 0.18;
                $scope.message = 'One pound of body weight is roughly equivalent to 3500 calories, so eating 500 calories less per day will cause you to lose one pound a week. Best results for successful weight loss usually 1-2 pounds per week. Do not lose more than this unless directed by your physician.';
                if($scope.profile.targetCaloricIntake < 1200 && $scope.profile.gender !== 'Male'){
                    $scope.profile.targetCaloricIntake = 1200;
                    $scope.warning = 'Never drop below 1200 calories unless directed by your physician';
                } else if($scope.profile.targetCaloricIntake < 1800 && $scope.profile.gender === 'Male'){
                    $scope.profile.targetCaloricIntake = 1800;
                    $scope.warning = 'Never drop below 1800 calories unless directed by your physician';
                }
            } else if($scope.profile.weightGoal === 'Gain'){
                $scope.profile.targetCaloricIntake += 500;
                $scope.message = 'If you want to gain body weight, you need to consume more calories than you burn. One pound of body weight is roughly equivalent to 3500 calories, so eating an extra 500 calories per day will cause you to gain one pound a week. Do not attempt to gain more than a pound a week unless directed by your physician.';
            }
        $scope.profile.$save();
        }
    };

    if(!$scope.profile.bmr){
        $scope.error = "You must complete your profile to calculate your target caloric intake";
    } else {
        $scope.error = '';
    }

}]);