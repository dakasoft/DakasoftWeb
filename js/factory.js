
(function () { // define funcionalidad

var app = angular.module('factory', []);
//auto crear alerta
app.factory('funciones',function(){
    return{
        alert:function(containerId, alertType, message,hide){
        			$(".alert").remove();
        	    $("#" + containerId).append('<div class="alert alert-' + alertType + '" id="alert' + containerId + '">' + message + '</div>');
              return  $("#alert" + containerId).alert();
                
        },
        closeC:function(){
         	return $(".alert").remove();
        },
        usuario:function(){
        	return {id:"",nombre:"",apellido:"",email:"",password:"",rol:""};
        },
        carrera:function(){
          return {id:"",nombre:"",cod:"",cursos:[]};
        },
        curso:function(){
          return {id:"",nombre:"",cod:"",area:[]};
        },
        grupo:function(){
          return {id:"",nombre:"",curso:"",cursoId:"",encargado:"",encargadoId:"",profesores:[],estudiantes:[]};
        },
        votacion:function(){
          return {id:"",fecha:"",fechaProyectos:"",fechaCierre:"",activo:0};
        },
        rubro:function(){
          return {id:"",nombre:"",valor:""};
        },  
        agregarALista:function(lista,objeto){
      	  lista.push(objeto);
      	  return lista;
        },
        agregarAListaNoRepetido:function(lista,objeto){
          var repetido = false;
          angular.forEach(lista, function(value, key) {
            if(value.id == objeto.id){
              repetido = true;
            }
          });

          if(!repetido) lista.push(objeto);

          return lista;
        },
        agregarAListaNoRepetidoPorNombre:function(lista,objeto){
          var repetido = false;
          angular.forEach(lista, function(value, key) {
            if(value.nombre.toLowerCase() == objeto.nombre.toLowerCase()){
              repetido = true;
            }
          });

          if(!repetido) lista.push(objeto);

          return lista;
        },
        editarDeLista:function(lista,objeto){
        	angular.forEach(lista, function(value, key) {
            if(value.id == objeto.id){
              lista[key] = objeto;
            }
          });
          return lista;
        },
        nuevoId:function(lista){
          if(lista.length){
            var last = lista[lista.length - 1];
            return last.id+1;
          }else{
            return 1;
          }

        },
        borrarDeLista:function(lista,objeto){
        	angular.forEach(lista, function(value, key) {
            if(value.id == objeto.id){
              lista.splice(key, 1);
            }
          });
          return lista;
        },
        borrarDeListaPorNombre:function(lista,objeto){
          angular.forEach(lista, function(value, key) {
            if(value.nombre.toLowerCase()== objeto.nombre.toLowerCase()){
              lista.splice(key, 1);
            }
          });
          return lista;
        }
    }

});
app.service('appServices',function(){
    this.obtenerUsuario = function(){
    $http.get('.php').success(function (data) {
      alert(data); 
      this.product = data;
      });

    }
    this.guardarUsuario = function(url){
      var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerCarrera = function(){
      
      
    }
    this.guardarCarrera = function(url){
       var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerCurso = function(){
        

    }
    this.guardarCurso = function(url){
      var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerGrupo = function(){
      

    }
    this.guardarGrupo = function(url){
       var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerEquipo = function(){
        

    }
    this.guardarEquipo = function(url){
      var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerPortafolio = function(){
      

    }
    this.guardarPortafolio = function(url){
       var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerRolEquipo = function(){
       

    }
    this.guardarRolEquipo = function(url){
       var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerArea = function(){
      

    }
    this.guardarArea = function(url){
        var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerCursoCarrera = function(){
       
    }
    this.guardarCursoCarrera = function(url){
       var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;


    }
    this.obtenerDesglose = function(){
       
    }
    this.guardarDesglose = function(url){
      var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;


    }
    this.obtenerRubro = function(){
      

    }
    this.guardarRubro = function(url){
        var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
    this.obtenerVotacion = function(){
        

    }
    this.guardarVotacion = function(url){
      var result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    }
     this.listarUsuarios = function(){

    }
     this.listarCarreras = function(){

    }
     this.listarCursos = function(){

    }
     this.listarGrupos = function(){

    }
     this.listarEquipos = function(){

    }
     this.listarGrupos = function(){

    }
     this.listarDesglose = function(){

    }
    this.listarAreas = function(){

    }
     this.listarCursoCarrera = function(){

    }
    this.listarNotas = function(){

    }
     this.listarHistorial = function(){

    }
    this.listarVotacion = function(){

    }
    // falta proyectos crear , listas

});

})();