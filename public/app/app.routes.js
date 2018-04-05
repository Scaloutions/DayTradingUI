var dayTradingApp = angular.module('app.routes', ['ngRoute'])

dayTradingApp.config(function($routeProvider, $locationProvider){
  $routeProvider

  // Route for home page
  .when("/", {
    templateUrl: 'app/views/pages/home.html',
    controller: 'homeController',
    controllerAs: 'home'
  })

  // .when('/login', {
  //     templateUrl: 'app/views/pages/login.html',
  //     controller: 'loginController',
  //     controllerAs: 'login'
  //   })

  // .when('/register', {
  //   templateUrl: 'app/views/pages/register.html',
  //   controller: 'registerController',
  //   controllerAs: 'register'
  // })

  // dayTradingApp.run(function ($rootScope, $location, $route, AuthService) {
  //   $rootScope.$on('$routeChangeStart', function (event, next, current) {
  //     if (AuthService.isLoggedIn() === false) {
  //       $location.path('/login');
  //       $route.reload();
  //     } else {
  //     }
  //   });
  // });

  $locationProvider.html5Mode(true);

});
