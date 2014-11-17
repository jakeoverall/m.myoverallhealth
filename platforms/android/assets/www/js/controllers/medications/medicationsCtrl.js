var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('medicationsCtrl', ['$scope', 'firebaseService', 'dailyMedService', function ($scope, firebaseService, dailyMedService) {

    var medications = firebaseService.getMedications($scope.username.id, $scope.profile.$id).$asArray();

    $scope.medications = medications;
    $scope.listOfMeds = [];
    $scope.findMed = function (med) {
        if(med.name.length > 4){
            dailyMedService.find(med.name).then(function (meds) {
            $scope.listOfMeds = meds;
        });
      }
    };

    ////---------------------------------New Medication----------------------------------------
    $scope.formShow = false;
    $scope.showNew = true;
    $scope.showForm = function () {
        $scope.formShow = !$scope.formShow;
        $scope.showNew = !$scope.showNew;
    };

    $scope.routes = ['PO - By Mouth', 'PR - Per Rectum', 'TOP - Apply Topically', 'INJ - Inject SubQ or IM', 'OU - Both Eyes ', 'OD - Rigth Eye', 'OS - Left Eye', 'AU - Both Eyes', 'AD - Right Ear', 'AS - Left Ear', 'INH - Inhaled'];

    $scope.route = 'PO - By Mouth';

    $scope.addMed = function () {
        var med = {
            name: this.name,
            strength: this.strength || '',
            quantity: this.quantity || '',
            route: this.route || '',
            frequency: this.frequency || '',
            startDate: this.startDate || '',
            rxNumber: this.rxNumber || '',
            notes: this.notes || '',
            infoUrl: 'http://www.drugs.com/search.php?searchterm=' + this.name,
            active: true
        };
        $scope.medications.$add(med);
        $scope.showForm();
    };

    $scope.cancel = function () {
        document.getElementById('addMedicationForm').reset();
        $scope.addMedicationForm.$setPristine();
        $scope.formShow = false;
    };

    //---------------------------------Edit Medication------------------------------------------------

    $scope.editForm = false;

    $scope.updateMed = function (med) {
        $scope.med = med;
        $scope.editForm = true;
        $scope.showNew = false;
    };

    $scope.editMed = function () {
        $scope.medications.$save($scope.med);
        $scope.editForm = false;
        $scope.showNew = true;
    };

    $scope.cancelEdit = function () {
        $scope.editForm = false;
        $scope.showNew = true;
    };

    $scope.discontinueMedication = function (med) {
        med.active = false;
        if (med.dcDate === null) {
            med.dcDate = new Date();
        }
        $scope.medications.$save(med);
    };


    $scope.activateMed = function (med) {
        med.active = true;
        med.dcDate = '';
        $scope.medications.$save(med);
    };

    $scope.removeMedication = function (med) {
        if (confirm('Are you sure you want to delete ' + med.name + ' ?')) {
            $scope.medications.$remove(med);
        }
    };
}]);