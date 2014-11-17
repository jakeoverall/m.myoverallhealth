var myHealthApp = angular.module('myHealthApp', ['ionic', 'ui.bootstrap', 'firebase', 'ui.router', 'restangular']);


myHealthApp.run(function ($ionicPlatform, $state) {

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
        //modify the android hardware back button action
        $ionicPlatform.registerBackButtonAction(function (event) {
            if ($state.current === "secure.main") {
                if(confirm('Are you sure you want to close the app?')){
                    navigator.app.exitApp();
                }
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);

    });
});


//Routes
myHealthApp.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/shared/login.html',
            controller: 'loginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/shared/register.html',
            controller: 'loginCtrl'
        })
        .state('secure', {
            abstract: true,
            template: '<div ui-view></div>',
            controller: 'secureCtrl',
            resolve: {
                username: function (authService) {
                    return authService.getUser();
                }
            }
        })
        .state('secure.main', {
            url: '/main',
            templateUrl: 'views/shared/main.html'
        })
        .state('secure.profiles', {
            url: '/profiles/:userId',
            templateUrl: 'views/profiles/profiles.html',
            controller: 'profilesCtrl',
            resolve: {
                profilesRef: function (firebaseService, $stateParams) {
                    return firebaseService.getProfiles($stateParams.userId);
                }
            }
        })
        .state('secure.profile', {
            abstract: true,
            url: '/:userId/profile/:profileId',
            template: '<div ui-view></div>',
            controller: 'detailsCtrl',
            resolve: {
                profileRef: function (firebaseService, $stateParams) {
                    return firebaseService.getProfile($stateParams.userId, $stateParams.profileId);
                }
            }
        })
        .state('secure.profile.details', {
            url: '/details',
            templateUrl: 'views/profiles/details.html'
        })
        .state('secure.profile.medications', {
            url: '/medications',
            templateUrl: 'views/medications/medications.html',
        })
        .state('secure.profile.schedules', {
            url: '/schedules',
            templateUrl: 'views/schedules/schedules.html',
            controller: 'EventCtrl',
            resolve: {
                eventsRef: function(firebaseService, $stateParams){
                    return firebaseService.getEvents($stateParams.userId, $stateParams.profileId);
                }
            }
        })
        .state('secure.profile.logs', {
            url: '/logs',
            templateUrl: 'views/logs/logs.html'
        })
        .state('secure.profile.history', {
            url: '/history',
            templateUrl: 'views/history/history.html'
        })
        .state('secure.profile.immunizations', {
            url: '/immunizations',
            templateUrl: 'views/history/immunizations.html'
        })
        .state('secure.profile.symptoms', {
            url: '/symptoms',
            templateUrl: 'views/symptoms/symptoms.html'
        })
        .state('secure.logout', {
            url: '/login',
            templateUrl: 'views/shared/login.html',
            controller: 'loginCtrl',
            resolve: {
                logout: function (authService, $state) {
                    authService.logOut();
                    $state.go('login');
                }
            }
        });;
}]);