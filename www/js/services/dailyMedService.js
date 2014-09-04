var myHealthApp = angular.module('myHealthApp');

myHealthApp.service('dailyMedService', function ($http) {
    this.find = function (med) {
        var s = 'http://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?both=' + med;
        return $http({ 'method': 'GET', 'url': s }).then(function (res) {
            console.log(res);
            return res.data;
        });
    };
});
