(function(){ // define funcionalidad
var app = angular.module('universidad', ["ui.router","ngTable","usuarios","reporteNotas"]);
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
      templateUrl:"templates/portafolio.html",
    })

    .state('reportenotas',{
      url: "/reportenotas",
      templateUrl:"templates/reporteNotas.html",
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