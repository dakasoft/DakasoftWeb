(function(){ // define funcionalidad

var app = angular.module('universidad', ["ui.router","ngTable","usuarios","grupos","loginU","portafolio","carreras","cursos","factorHumano"]);

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
    templateUrl: "templates/carreras.html"
    })


  .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: function($rootScope, $state){
        $rootScope.currentStateName = $state.current.name;
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
      console.log("wtf?");
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
    }
  })

  .state('cursos', {
    url: "/cursos",
    templateUrl: "templates/cursos.html"
  })
  .state('factorhumano', {
    url: "/factorhumano",
    templateUrl: "templates/factorHumano.html"
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