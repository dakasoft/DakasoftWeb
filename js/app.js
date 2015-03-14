(function(){ // define funcionalidad
var app = angular.module('universidad', ["ui.router","ngTable","usuarios","grupos","misCursos"]);
/*Quitar el hashtag en el browser*/

/* manejador de rutas*/
app.config(function($stateProvider, $urlRouterProvider) {

  //$urlRouterProvider.otherwise("/home");
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
    })

    .state('miscursos',{
      url: "/miscursos",
      templateUrl:"templates/misCursos.html"
    })

    .state('miscursos.equipo', {
      url: "/equipo",
      templateUrl:"templates/partials/miEquipo.html"
    })

    .state('miscursos.curso', {
      url: "/curso",
      templateUrl:"templates/partials/miCurso.html"
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