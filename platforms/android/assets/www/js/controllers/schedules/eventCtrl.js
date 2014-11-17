angular.module('myHealthApp')
  .controller('EventCtrl', function ($scope, eventsRef, $cordovaCalendar) {
    $scope.events = eventsRef.$asArray();
    // $cordovaCalendar.createCalendar({
    //     calendarName: 'MyHealthCalendar',
    //     calendarColor: '#FF0000'
    // }).then(function(res){
    //     if(res){
    //         console.log(res);
    //     }
    // }, function (err) {
    //     if(err){
    //         console.log(err);
    //     }
    // });

    // var addEvent = function (event) {
    //     $cordovaCalendar.createEvent({
    //         title: event.title,
    //         location: event.location || '',
    //         notes: event.notes || '',
    //         startDate: event.startDate || new Date(),
    //         endDate: event.endDate || new Date()
    //     }).then(function (result) {
    //         if(result){
    //             console.log(result);
    //         }
    //     }, function (err) {
    //         if(err){
    //             console.log(err);
    //         }
    //     });
    // };

    $scope.formShow = false;
    $scope.showForm = function () {
        $scope.event = '';
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