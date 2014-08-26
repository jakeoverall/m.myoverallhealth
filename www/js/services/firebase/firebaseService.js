var myHealthApp = angular.module('myHealthApp');

myHealthApp.service('firebaseService', function (environmentService, $firebase) {
    var firebaseUrl = environmentService.getEnv().firebase;

    this.getProfiles = function (userId) {
        return $firebase(new Firebase(firebaseUrl + '/users/' + userId + '/profiles'));
    };

    this.getProfile = function (userId, id) {
        return $firebase(new Firebase(firebaseUrl + '/users/' + userId + '/profiles/' + id)).$asObject().$loaded().then(function (res) {
            return res;
        });
    };

    this.getMedications = function (userId, id) {
        return $firebase(new Firebase(firebaseUrl + '/users/' + userId + '/profiles/' + id + '/medications'));
    };

    this.getDiagnoses = function (userId, id) {
        return $firebase(new Firebase(firebaseUrl + '/users/' + userId + '/profiles/' + id + '/diagnoses'));
    };

    this.getSchedule = function (userId, id) {
        return $firebase(new Firebase(firebaseUrl + '/users/' + userId + '/profiles/' + id + '/diagnoses'));
    };
});
