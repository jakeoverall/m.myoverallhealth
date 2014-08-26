'use strict';

angular.module('myHealthApp')
  .controller('loginCtrl', function ($scope, $state, authService) {

      $scope.register = function () {
          $scope.username = $scope.registerUsername;
          authService.register($scope.registerUsername, $scope.registerPassword);
          $scope.registerUsername = '';
          $scope.registerPassword = '';
      };

      $scope.logMeIn = function () {
          authService.logIn($scope.username, $scope.password).then(function () {
              $state.go('secure.main');
          });
      };
  });