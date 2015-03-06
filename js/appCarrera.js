(function(){
var app = angular.module('carreras', [ ]);

app.directive('carreras', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/parcials/carrerasTabla.html',
        controller:function($scope,$location){
             $scope.totalItems = 64;
               $scope.estudiantes = [
        {
            name: 'Yee Vargas',
            id:1,
            foto:'img/foto.png',
            correo: 'yvargasv@ucenfotac.ac.cr',
            telefono: '2093 0293',
            OtraInfo: 'rem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.cuando un impresor (N. del T. persona que se dedica a la imprenta)',
        },
        {
            name: 'Pamela Solano',
            id:2,
            foto:'img/content/lasuertedejim.jpg',
            correo: 'yvargasv@ucenfotac.ac.cr',
            telefono: '2093 0293',
            OtraInfo: 'rem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.cuando un impresor (N. del T. persona que se dedica a la imprenta)',
        },
        {
            name: 'Yee Vargas',
            id:3,
            foto:'img/content/karma.jpg',
            correo: 'yvargasv@ucenfotac.ac.cr',
            telefono: '2093 0293',
            OtraInfo: 'rem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.cuando un impresor (N. del T. persona que se dedica a la imprenta)',
        }
    ];

      


        },
        controllerAs: 'carrera'
    };
});


})();