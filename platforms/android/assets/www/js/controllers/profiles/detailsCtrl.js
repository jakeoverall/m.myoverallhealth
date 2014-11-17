var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('detailsCtrl', ['$scope', '$stateParams', '$location', 'profileRef', function ($scope, $stateParams, $location, profileRef) {
    
    $scope.profile = profileRef;
    
    //form Controlls
    $scope.edit = false;
    $scope.showForm = function () {
        $scope.edit = !$scope.edit;
    };
    
    var calculateAge = function(date){
        if(date){
            date = new Date(date);
        } else {
            date = new Date($scope.profile.dob);
        }
        var now = new Date().getTime();
        var diff = now - date.getTime();
        $scope.profile.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
    var getGenderClass = function () {
        if ($scope.profile.gender === 'Male') {
            $scope.genderBtn = 'btn btn-primary btn-sm';
            $scope.genderClass = 'fa fa-male';
        } else {
            $scope.genderBtn = 'btn btn-pink btn-sm';
            $scope.genderClass = 'fa fa-female';
        }
    };

    $scope.bloodTypes = ['A -', 'B -', 'O -', 'AB -', 'A +', 'B +', 'O +', 'AB +'];

    $scope.save = function () {
        $scope.profile.$save();
    };

    $scope.saveDetails = function () {
        getGenderClass();
        calculateBMI($scope.profile.weight);
        calculateAge($scope.profile.dob);
        $scope.profile.$save();
        $scope.showForm();
    };
    
    $scope.removeProfile = function () {
        var verify = prompt('To remove this profile type in ' + $scope.profile.firstName + ' ' + $scope.profile.lastName + ' Exactly as it appears here');

        if (verify === $scope.profile.firstName + ' ' + $scope.profile.lastName) {
            $scope.profile.removed = true;
            $scope.profile.removedAt = new Date();
            $scope.profile.BMI = 0;
            $scope.profile.$save();
            $location.path('/profiles');
        } else {
            alert('The profile was not removed');
        }
    };
    
    //BMI
    
    var conversionFactor = 703;

    var calculateBMI = function (weight) {
        var heightInches = function () {
            var feetToInches = (12 * $scope.profile.feet);
            var inches = parseInt($scope.profile.inches);
            return feetToInches + inches;
        }();

        if (weight) {
            $scope.profile.BMI = (weight / (heightInches * heightInches)) * conversionFactor;
            $scope.profile.weight = weight;
            $scope.save();
        } else {
            $scope.profile.BMI = (this.profile.weight / (heightInches * heightInches)) * conversionFactor;
        }

        if ($scope.profile.BMI) {
            var b = $scope.profile.BMI;
            if (b <= 18.5) {
                $('#BMI').css({ 'color': 'red', 'top': - b });
            } else if (b >= 25 && b < 30) {
                $('#BMI').css({ 'color': 'orangered', 'top': (-55) + (- b) });
            } else if (b >= 30) {
                $('#BMI').css({ 'color': 'red', 'top': (-60) + (- b) });
            } else {
                $('#BMI').css({ 'color': 'green', 'top': (-32) + (- b) });
            }
        }
    };
    $scope.calculateBMI = calculateBMI;

    ////////

       
    getGenderClass();
    
    //todo Extract Allergies to their own Directive or controller
    //$scope.Allergy = function (name, type, reaction) {
    //    this.name = name;
    //    this.type = type;
    //    this.reaction = reaction;
    //};

    //$scope.addAllergy = function (allergy) {
    //    $scope.allergies.push(allergy);
    //};

    //$scope.allergies = [];

    //$scope.redCrossLink = 'http://www.redcrossblood.org/learn-about-blood/blood-types';
}]);