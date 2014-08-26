var myHealthApp = angular.module('myHealthApp', ['ionic', 'ui.bootstrap', 'ui.calendar', 'firebase', 'ui.router', 'restangular']);


myHealthApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});


//Routes
myHealthApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/main');

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'views/shared/main.html'
        })
        .state('profiles', {
            url: '/profiles',
            templateUrl: 'views/profiles/profiles.html',
            controller: 'profilesCtrl',
            resolve: {
                profilesRef: function (firebaseService) {
                    return firebaseService.getProfiles();
                }
            }
        })
        .state('profile', {
            abstract: true,
            url: '/profile/:profileId',
            template: '<div ui-view></div>',
            controller: 'detailsCtrl',
            resolve: {
                profileRef: function (firebaseService, $stateParams) {
                    return firebaseService.getProfile($stateParams.profileId);
                }
            }
        })
        .state('profile.details', {
            url: '/details',
            templateUrl: 'views/profiles/details.html'
        })
        .state('profile.medications', {
            url: '/medications',
            templateUrl: 'views/medications/medications.html',
        })
        .state('profile.schedules', {
            url: '/schedules',
            templateUrl: 'views/schedules/schedules.html'
        })
        .state('profile.logs', {
            url: '/logs',
            templateUrl: 'views/logs/logs.html'
        })
        .state('profile.history', {
            url: '/history',
            templateUrl: 'views/history/history.html'
        })
        .state('profile.immunizations', {
            url: '/immunizations',
            templateUrl: 'views/history/immunizations.html'
        })
        .state('profile.symptoms', {
            url: '/symptoms',
            templateUrl: 'views/symptoms/symptoms.html'
        });
}]);