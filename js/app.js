(function(){ // define funcionalidad
var app = angular.module('universidad', ["ui.router","ngTable","usuarios","loginU"]);
/*Quitar el hashtag en el browser*/

app.controller('mainController', ['$scope','$http', '$state', function ($scope, $http, $state) {
    var main = this;

    main.currentUser = {};
    main.bLoggedIn = false;

    main.logOut = function () {
      main.currentUser = {};
      main.bLoggedIn = false;
      $state.go('login');
    }
    
  }])


/* manejador de rutas*/
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: function($rootScope,$state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html"
      })

    .state('portafolio',{
    	url: "/portafolio",
      templateUrl:"templates/portafolio.html",
    })

    .state('usuarios', {
      url: "/usuarios",
      templateUrl: "templates/usuarios.html"
    });

});



/*Directiva para el menu*/
app.directive('menu', function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/partials/menu.html'
	};
});

app.directive('menuMobile', function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/partials/menuMobile.html'
	};
});



})();