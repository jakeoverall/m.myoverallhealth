var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('DailyCaloriesCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

$scope.wait = function(){
  wait();
};

var wait = function(){
  if($scope.profile.targetCaloricIntake){
    $scope.message = '';
    $scope.dailyCalories = firebaseService.getDailyCalories($scope.username.id, $scope.profile.$id).$asArray();
    listener();
  } else {
      $scope.message = 'Please select a Target Caloric Intake to begin tracking daily calories';
      console.log("Waiting");
  }
};

var listener = $scope.$watch($scope.profile.targetCaloricIntake, wait);


  $scope.addDailyCalories = function(day){
      wait();
      $scope.error = '';
      var toDate = new Date(day.date);
      day.week = toDate.getWeekNumber();
      day.week = day.week + '-' + day.date.slice(0, 4);
      if($scope.dailyCalories){
        $scope.dailyCalories.$add(day);
        $scope.day = '';
        $scope.calculateWeek();
      } else {
        $scope.error = "Something went wrong please try again";
      }
  };

  $scope.calculateWeek = function(date){
    wait();
    var weeklyTotal = 0;
    $scope.limit = 0;
    $scope.thisWeek = [];
    var year = '';
    if(date){
      year = new Date(date).getFullYear();
      $scope.week = new Date(date).getWeekNumber();
    } else {
      year = new Date().getFullYear();
      $scope.week = new Date().getWeekNumber();
    }
    $scope.week = $scope.week + '-' + year;
    if($scope.dailyCalories){
      var test = $scope.dailyCalories.$loaded();
      test.then(function(dailyValues){
        dailyValues.forEach(function(day, i){
          if(day.week == $scope.week){
             weeklyTotal += Number(day.calories);
             $scope.thisWeek.push(day);
             $scope.limit++;
          }
        });
        $scope.weeklyTotal = weeklyTotal;
        $scope.swc = $scope.profile.targetCaloricIntake * 7;
        $scope.diff = $scope.swc - weeklyTotal;
        if($scope.diff < 0){
          $scope.weeklyDeficit = true;
        } else {
          $scope.weeklyDeficit = false;
        }
      });
    }
  };
  $scope.calculateWeek();

}]);