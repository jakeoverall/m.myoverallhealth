var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('DailyCaloriesCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

$scope.show = false;

$scope.showForm = function(){
  $scope.show = true;
}
$scope.cancel = function(){
  $scope.show = false;
}

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
    if(!$scope.dailyCalories){
      wait();
    }
    if(day && $scope.profile.targetCaloricIntake){
      $scope.error = '';
      var toDate = new Date(day.date);
      day.week = toDate.getWeekNumber();
      day.week = day.week + '-' + day.date.slice(0, 4);
      if(Number(day.calories) > $scope.profile.targetCaloricIntake){
        day.overLimit = true;
      }
      if($scope.dailyCalories){
        $scope.dailyCalories.$add(day).then(function(){
          $scope.day = '';
          $scope.calculateWeek();
        });
      } else {
        $scope.error = "Something went wrong please try again";
      }
    }
  };

$scope.changeWeek = function(direction){
  if(direction){
    $scope.calculateWeek(new Date($scope.activeWeek.setDate($scope.activeWeek.getDate() + 7)));
  } else {
    $scope.calculateWeek(new Date($scope.activeWeek.setDate($scope.activeWeek.getDate() - 7)));
  }
}

$scope.removeDay = function(day, i){
  debugger;
  $scope.dailyCalories.$remove(day).then(function(){
    debugger;
    $scope.thisWeek.splice(i, 1);
    $scope.calculateWeek($scope.activeWeek);
  });
};

  $scope.calculateWeek = function(date){
    if(!$scope.dailyCalories){
      wait();
    }
    var w;
    $scope.limit = 0;
    $scope.thisWeek = [];
    var year = '';
    if(date){
      console.log(date);
      year = date.getFullYear();
      $scope.week = date.getWeekNumber();
      $scope.activeWeek = date;
    } else {
      year = new Date().getFullYear();
      $scope.week = new Date().getWeekNumber();
      $scope.activeWeek = new Date();
    }
    if($scope.week === 1){
        year++;
      }
    $scope.week = $scope.week + '-' + year;
    if($scope.dailyCalories.length === 0){
      $scope.dailyCalories.$loaded().then(function(dailyValues){
        pushToThisWeek(dailyValues);
      });
    } else {
        pushToThisWeek($scope.dailyCalories);
    }
  };

var pushToThisWeek = function(dailyValues){
  var weeklyTotal = 0;
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
};

  $scope.calculateWeek();
}]);