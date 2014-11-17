'use strict';

angular.module('myHealthApp')
  .controller('loginCtrl', function ($scope, $state, authService) {

      var reg = $state.current.name;

      $scope.showRegistration = function() {
          if(reg === 'register'){
            $state.go('login');
          } else {
            $state.go('register');
          }
      };

      $scope.register = function () {
          if ($scope.registerPassword === $scope.repeatPassword) {
              $scope.username = $scope.registerUsername;
              authService.register($scope.registerUsername, $scope.registerPassword);
              $scope.registerUsername = '';
              $scope.registerPassword = '';
          } else {
              alert("Passwords do not match");
          }
      };

      $scope.logMeIn = function (user) {
          authService.logIn(user).then(function (res) {
              $state.go('secure.main');
          });
      };
  });