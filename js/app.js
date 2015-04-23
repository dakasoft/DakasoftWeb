(function(){ // define funcionalidad



var app = angular.module('universidad', ["ui.router","factory","ngTable","usuarios","grupos","loginU","portafolio","carreras","cursos","reporte","historialAcademico","votacionesPrivadas","parametros","proyectosVotacion","proyectos","factorHumano","rubricaCursos","verCursos","misCursos","proyectoganador","areasAcademicas"]);



/*Quitar el hashtag en el browser*/

app.controller('mainController', ['$scope','$http', '$state','$rootScope', function ($scope, $http, $state, $rootScope) {
    var main = this;
    $rootScope.currentUser = {};
    $rootScope.bLoggedIn = true; //cambiar para deslogear
    $rootScope.roleLv = 5;
    $rootScope.currentUser.id=7; 

    main.logOut = function () {
      $rootScope.currentUser = {};
      $rootScope.bLoggedIn = false;
      $rootScope.roleLv = 0;
      $state.go('login');
    }

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
      controller: function($rootScope, $state,funciones){
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
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
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
    controller: function ($rootScope, $state,funciones) {
      $rootScope.currentStateName = $state.current.name;
      if (!$rootScope.bLoggedIn) {
        $state.go('login');
      }
    }
  })

  .state('usuarios', {
    url: "/usuarios",
    templateUrl: "templates/usuarios.html",
    controller: function ($rootScope, $state,funciones) {
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
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('rubricacursos', {
      url: "/rubricacursos",
      templateUrl: "templates/rubricaCursos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('grupos',{
      url: "/grupos",
      templateUrl:"templates/grupos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('verproyectos',{
      url: "/verproyectos",
      templateUrl:"templates/verProyectos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }       
      }
    })

    .state('factorhumano', {
      url: "/factorhumano",
      templateUrl: "templates/factorHumano.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('cursos', {
      url: "/cursos",
      templateUrl: "templates/cursos.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('proyectosvotacion',{
      url: "/proyectosvotacion",
      templateUrl:"templates/proyectosVotacion.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })


    .state('reportenotas',{
      url: "/reportenotas",
      templateUrl:"templates/reporteNotas.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('votacionprivada',{
      url: "/votacionprivada",
      templateUrl:"templates/votacionPrivada.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('miscursos',{
      url: '/miscursos',
      templateUrl:'templates/misCursos.html',
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })

    .state('vercursos',{
      url: '/vercursos',
      templateUrl:'templates/verCursos.html',
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }
    })
    
    .state('areasAcademicas', {
      url: '/areasAcademicas',
      templateUrl:'templates/areasAcademicas.html'
    })

    .state('proyectoganador',{
      url: '/proyectoganador',
      templateUrl:'templates/proyectoGanador.html',
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
        if (!$rootScope.bLoggedIn) {
          $state.go('login');
        }
      }

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

/*Custom para todos*/

app.directive('modalConfirmarBorrar', function(){
  return{
    restrict: 'E',
    templateUrl: 'templates/partials/shared/modalConfirmacion.html'
  };
});

/*Directiva para el tooltip*/
app.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
}); 
app.directive('formatDate',formatDate);
  function formatDate(){
    return {
     require: 'ngModel',
      link: function(scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function(modelValue){
          return new Date(modelValue);
        })
      }
    }
   }  


})();