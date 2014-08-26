var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('profilesCtrl', ['$scope', 'profilesRef', function ($scope, profilesRef) {

    $scope.profiles = profilesRef.$asArray();
    
    //form Controls
    $scope.showForm = false;
    $scope.toggleForm = function () {
        $scope.showForm = !$scope.showForm;
    };

    $scope.addProfile = function () {
        $scope.profiles.$add({firstName: $scope.firstName, lastName: $scope.lastName});
        
        //resets form
        document.getElementById('addProfileForm').reset();
        $scope.showForm = false;
        $scope.addProfileForm.$setPristine();
    };

    $scope.restoreProfile = function () {
        if (confirm('Would you like to restore this profile?')) {
            this.profile.removed = false;
            this.profile.removedAt = null;
            $scope.profiles.$save(this.profile);
        }
    };

    $scope.destroyProfile = function() {
        if (confirm('Are you sure you want to destroy this profile?')) {
            $scope.profiles.$remove(this.profile);
        }
    };

}]);