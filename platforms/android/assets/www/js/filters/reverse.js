var myHealthApp = angular.module('myHealthApp');

myHealthApp.filter('reverse', function () {
    return function (items) {
        return items.slice().reverse();
    };
});