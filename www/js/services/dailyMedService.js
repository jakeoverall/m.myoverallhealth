var myHealthApp = angular.module('myHealthApp');

myHealthApp.service('dailyMedService', function ($http) {
    this.find = function (med) {
    	console.log(med);
        var s = 'http://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name='+ med;
        return $http({ 'method': 'GET', 'url': s }).then(function (res) {
            return res.data.data.map(function (drugObj) {
            	return drugObj.drug_name;
            });
        });
    };
});
