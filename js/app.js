(function(){ // define funcionalidad
var app = angular.module('universidad', ["ui.router","ngTable","carreras"]);
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
    });

    .state('carreras', {
      url: "/carreras",
      templateUrl: "templates/carreras.html",
    });


});



/*Directiva para el menu*/
app.directive('menu', function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/partials/menu.html',
		controller:function($scope,$location){
			//$scope.menu = true;
		},
		controllerAs: 'menuCtrl'
	};
});

app.directive('menuMobile', function(){
	return{
		restrict: 'E',
		templateUrl: 'templates/partials/menuMobile.html'
	};
});



})();