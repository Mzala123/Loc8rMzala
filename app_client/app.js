(function() {

angular.module('loc8rApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

function config ($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('');
    $routeProvider
     .when('/', {
       templateUrl: 'home/home.view.html',
       controller: 'homeCtrl',
       controllerAs: 'vm'
    })
    .when('/about', {
      templateUrl: '/common/views/genericText.view.html',
      controller: 'aboutCtrl',
      controllerAs: 'vm'
    })
    .when('/location/:locationid',{
      templateUrl: '/locationDetail/locationDetail.view.html',
      controller: 'locationDetailCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
       templateUrl: '/auth/register/register.view.html',
       controller: 'registerCtrl',
       controllerAs: 'vm'
    })
    .when('/login',{
      templateUrl: '/auth/login/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}

angular
  .module('loc8rApp')
  .config(['$routeProvider', '$locationProvider' ,config]);
  
})();