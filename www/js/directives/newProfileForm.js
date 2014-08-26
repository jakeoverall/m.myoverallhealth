var myHealthApp = angular.module('myHealthApp');

myHealthApp.directive('newProfileForm', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/profiles/new-profile-form.html'
    };
});