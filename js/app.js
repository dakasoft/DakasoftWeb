(function(){ // define funcionalidad

var app = angular.module('universidad', ["ui.router","ngTable","usuarios","grupos","loginU","portafolio","carreras","cursos","reporte","historialAcademico","votacionesPrivadas","parametros","proyectosVotacion","proyectos","factorHumano","rubricaCursos","verCursos"]);

/*Quitar el hashtag en el browser*/

app.controller('mainController', ['$scope','$http', '$state','$rootScope', function ($scope, $http, $state, $rootScope) {
    var main = this;
    $rootScope.currentUser = {};
    $rootScope.bLoggedIn = true; //cambiar para deslogear

   
}])


/* manejador de rutas*/
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('carreras', {
    url: "/carreras",
    templateUrl: "templates/carreras.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })


  .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('historialacademico',{
      url: "/historialacademico",
      templateUrl:"templates/historialAcademico.html",
      controller: function ($rootScope, $state) {
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

  .state('portafolio',{
    url: "/portafolio",
    templateUrl:"templates/portafolio.html",
    controller: function ($rootScope, $state) {
      $rootScope.currentStateName = $state.current.name;
      if (!$rootScope.bLoggedIn) {
        $state.go('login');
      }
    }
  })

  .state('usuarios', {
    url: "/usuarios",
    templateUrl: "templates/usuarios.html",
    controller: function ($rootScope, $state) {
      $rootScope.currentStateName = $state.current.name;
      if (!$rootScope.bLoggedIn) {
        $state.go('login');
      }
    }
  })

    .state('parametros', {
      url: "/parametros",
      templateUrl: "templates/parametros.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('rubricacursos', {
      url: "/rubricacursos",
      templateUrl: "templates/rubricaCursos.html"
    })

    .state('grupos',{
      url: "/grupos",
      templateUrl:"templates/grupos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('verproyectos',{
      url: "/verproyectos",
      templateUrl:"templates/verProyectos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('factorhumano', {
      url: "/factorhumano",
      templateUrl: "templates/factorHumano.html"
    })

    .state('cursos', {
      url: "/cursos",
      templateUrl: "templates/cursos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('proyectosvotacion',{
      url: "/proyectosvotacion",
      templateUrl:"templates/proyectosVotacion.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })


    .state('reportenotas',{
      url: "/reportenotas",
      templateUrl:"templates/reporteNotas.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('votacionprivada',{
      url: "/votacionprivada",
      templateUrl:"templates/votacionPrivada.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
      }
    })

    .state('miscursos',{
      url: '/miscursos',
      templateUrl:'templates/misCursos.html'
    })

    .state('miscursos.equipo', {
      url: '/equipo',
      templateUrl:'templates/partials/miEquipo.html'
    })

    .state('miscursos.cursos', {
      url: '/curso',
      templateUrl:'templates/partials/misCursos.html'
    })

    .state('vercursos',{
      url: '/vercursos',
      templateUrl:'templates/verCursos.html'
    })

    .state('vercursos.entregas', {
      url: '/entregas',
      templateUrl:'templates/partials/verEntregas.html'
    })

    .state('vercursos.estudiantes', {
      url: '/estudiantes',
      templateUrl:'templates/partials/verEstudiantes.html'
    })

    .state('vercursos.equipo', {
      url: '/equipo',
      templateUrl:'templates/partials/verEquipo.html'
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