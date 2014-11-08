angular.module('myHealthApp')
  .controller('EventCtrl', function ($scope, eventsRef) {
    $scope.events = eventsRef.$asArray();

    $scope.formShow = false;
    $scope.showForm = function () {
        $scope.formShow = !$scope.formShow;
    };

     $scope.addEvent = function (event) {
        if(!event.start){
            event.start = new Date().toISOString();
        }
        $scope.events.$add(event);
        $scope.showForm();
    };

    $scope.cancel = function () {
        $scope.event = '';
        $scope.formShow = false;
    };

    //---------------------------------Edit Event------------------------------------------------

    $scope.editForm = false;

    $scope.updateEvent = function (event) {
        $scope.event = event;
        $scope.editForm = true;
    };

    $scope.editEvent = function () {
        $scope.events.$save($scope.event);
        $scope.editForm = false;
    };

    $scope.cancelEdit = function () {
        $scope.editForm = false;
    };

    $scope.removeEvent = function (event) {
      $scope.events.$remove(event);
    };

  });