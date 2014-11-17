var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('DailyCaloriesCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {

Date.prototype.getWeekNumber = function(){
    var day_miliseconds = 86400000,
        onejan = new Date(this.getFullYear(),0,1,0,0,0),
        onejan_day = (onejan.getDay()==0) ? 7 : onejan.getDay(),
        days_for_next_monday = (7-onejan_day),
        onejan_next_monday_time = onejan.getTime() + (days_for_next_monday * day_miliseconds),
        // If one jan is not a monday, get the first monday of the year
        first_monday_year_time = (onejan_day>1) ? onejan_next_monday_time : onejan.getTime(),
        this_date = new Date(this.getFullYear(), this.getMonth(),this.getDate(),0,0,0),// This at 00:00:00
        this_time = this_date.getTime(),
        days_from_first_monday = Math.round(((this_time - first_monday_year_time) / day_miliseconds));

    var first_monday_year = new Date(first_monday_year_time);

    // We add 1 to "days_from_first_monday" because if "days_from_first_monday" is *7,
    // then 7/7 = 1, and as we are 7 days from first monday,
    // we should be in week number 2 instead of week number 1 (7/7=1)
    // We consider week number as 52 when "days_from_first_monday" is lower than 0,
    // that means the actual week started before the first monday so that means we are on the firsts
    // days of the year (ex: we are on Friday 01/01, then "days_from_first_monday"=-3,
    // so friday 01/01 is part of week number 52 from past year)
    // "days_from_first_monday<=364" because (364+1)/7 == 52, if we are on day 365, then (365+1)/7 >= 52 (Math.ceil(366/7)=53) and thats wrong

    return (days_from_first_monday>=0 && days_from_first_monday<364) ? Math.ceil((days_from_first_monday+1)/7) : 52;
}

$scope.show = false;

$scope.showForm = function(){
  $scope.show = true;
}
$scope.cancel = function(){
  $scope.show = false;
}

$scope.wait = function(){
  if(!$scope.dailyCalories){
      wait();
    }
  $scope.calculateWeek($scope.activeWeek);
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
  $scope.dailyCalories.$remove(day).then(function(){
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
      year = date.getFullYear();
      $scope.week = date.getWeekNumber();
      $scope.activeWeek = date;
    } else {
      year = new Date().getFullYear();
      $scope.week = new Date().getWeekNumber();
      $scope.activeWeek = new Date();
    }
    if($scope.week == 52){
      $scope.endOfYear = $scope.week + '-' + (year -1);
    }
    $scope.week = $scope.week + '-' + year;
    if($scope.dailyCalories){
      if($scope.dailyCalories.length === 0){
        $scope.dailyCalories.$loaded().then(function(dailyValues){
          pushToThisWeek(dailyValues);
        });
      } else {
          pushToThisWeek($scope.dailyCalories);
      }
    }
    if($scope.endOfYear){
      $scope.endOfYear = '';
    }
  };

var pushToThisWeek = function(dailyValues){
  var weeklyTotal = 0;
  dailyValues.forEach(function(day, i){
    if(day.week == $scope.week){
       weeklyTotal += Number(day.calories);
       $scope.thisWeek.push(day);
       $scope.limit++;
    } else
    if($scope.endOfYear){
      if(day.week == $scope.endOfYear){
       weeklyTotal += Number(day.calories);
       $scope.thisWeek.push(day);
       $scope.limit++;
      }
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