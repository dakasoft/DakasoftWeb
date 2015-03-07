(function(){ // define funcionalidad
var app = angular.module('universidad', ["ui.router","ngTable","usuarios","grupos"]);
/*Quitar el hashtag en el browser*/

/* manejador de rutas*/
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: function($rootScope,$state){
        $rootScope.currentStateName = $state.current.name;
      }
    })
    .state('portafolio',{
    	url: "/portafolio",
      templateUrl:"templates/portafolio.html"
    })
    .state('usuarios', {
      url: "/usuarios",
      templateUrl: "templates/usuarios.html"
    })
     .state('grupos',{
      url: "/grupos",
      templateUrl:"templates/grupos.html"
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