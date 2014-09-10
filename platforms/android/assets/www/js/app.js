// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter = angular.module('starter', ['ionic'])

starter.run(function($ionicPlatform, $rootScope) {
  $rootScope.isLogged=false;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
    .factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);
starter.config(function($stateProvider,$urlRouterProvider){
       $stateProvider
                .state('todo', {
                    url: "/todo",
                    templateUrl:"templates/todolist.html",
                    controller: 'listController'
                })
                .state('main',{
                    url:"/main",
                    templateUrl:"templates/main.html",
                    controller:'main'

                })
               .state('sign_up',{
                   url:"/signup",
                   templateUrl:"templates/signup.html",
                   controller:'sign_up'

               })
                $urlRouterProvider.otherwise('/main')
     })
