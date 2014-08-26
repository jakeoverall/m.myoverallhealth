var myHealthApp = angular.module('myHealthApp');

myHealthApp.controller('medicationsCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {
    
    var medications = firebaseService.getMedications($scope.username.id, $scope.profile.$id).$asArray();

    $scope.medications = medications;
    
    ////---------------------------------New Medication---------------------------------------------------------------------------
    $scope.formShow = false;
    $scope.showForm = function () {
        $scope.formShow = !$scope.formShow;
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

    //---------------------------------Edit Medication---------------------------------------------------------------------------

    $scope.editForm = false;
    
    $scope.updateMed = function (med) {
        $scope.med = med;
        $scope.editForm = true;        
    };

    $scope.editMed = function () {
        $scope.medications.$save($scope.med);
        $scope.editForm = false;
    };

    $scope.cancelEdit = function () {
        $scope.editForm = false;
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