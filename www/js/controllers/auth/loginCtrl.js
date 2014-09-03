'use strict';

angular.module('myHealthApp')
  .controller('loginCtrl', function ($scope, $state, authService) {

      $scope.reg = false;

      $scope.showRegistration = function() {
          $scope.reg = !$scope.reg;
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

      $scope.logMeIn = function () {
          authService.logIn($scope.username, $scope.password).then(function () {
              $state.go('secure.main');
          });
      };
  });