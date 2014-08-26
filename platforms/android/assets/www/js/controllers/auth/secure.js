'use strict';

angular.module('myHealthApp')
  .controller('secureCtrl', function ($scope, username, $state) {
      if (!username || username === 'undefined') {
          $state.go('login');
      }
      $scope.username = username;
  });