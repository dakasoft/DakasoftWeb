
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
        	return {id:"",Nombre:"",Apellido:"",Email:"",Password:"",IdRol:""};
        },
        carrera:function(){
          return {id:"",Nombre:"",Codigo:"",Cursos:[]};
        },
        curso:function(){
          return {id:"",Nombre:"",Codigo:"",Areas:[]};
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
              console.log("me encontre");
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
        },

        areaAcademica: function () {
          return {Nombre:"",Codigo:""}
        }
    }

});

app.service('appServices',function($http){

    this.obtenerUsuario = function(){
    $http.get('.php').success(function (data) {
      alert(data); 
      this.product = data;
      });
    };

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
    };

    this.obtenerCarrera = function(){
           
    };

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

    };

    this.obtenerCurso = function(){
        
    };

    this.guardarCurso = function(url){
      //$scope.result;
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         return data; 
       })
      .error(function(data, status) {
       $scope.result = data || "Request failed";
       });

       //return $scope.result;

    };

    this.obtenerGrupo = function(){
      

    };

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

    };

    this.obtenerEquipo = function(){
        

    };

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

    };

    this.obtenerPortafolio = function(){
      
    };

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

    };

    this.obtenerRolEquipo = function(){
       
    };

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
    };

    this.obtenerArea = function(){
      
    };

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

    };

    this.obtenerCursoCarrera = function(){
       
    };

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
    };

    this.obtenerDesglose = function(){
       
    };

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
    };

    this.obtenerRubro = function(){
      

    };

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

    };

    this.obtenerVotacion = function(){
        

    };

    this.guardarVotacion = function(url){
      var result = {};
      $http.post(url, { "data" : $scope.objeto})
      .success(function(data, status) {
         result = data; 
       })
      .error(function(data, status) {
       result = data || "Request failed";
       });
       return result;

    };

    this.listarUsuarios = function(){
      var result;
      $http.get('php/listarUsuarios.php')
        .success(function (data) {
          //console.log("success aqui");
          console.log(data);
          result = data;
        })
        .error(function(data,status){
          result = data || "jiji"
        });
      console.log(result);
      return result;
    };

     this.listarCarreras = function(){

    };

     this.listarCursos = function(){

    };

     this.listarGrupos = function(){

    };

     this.listarEquipos = function(){

    };

     this.listarGrupos = function(){

    };

     this.listarDesglose = function(){

    };

    this.listarAreas = function(){

    };

    this.listarCursoCarrera = function(){

    };

    this.listarNotas = function(){

    };

    this.listarHistorial = function(){

    };

    this.listarVotacion = function(){

    };
    // falta proyectos crear , listas

    this.nuevaAreaAcademica = function (pArea) {
      $http.post("php/crearAreasAcademicas.php", { "data" : pArea})
        .success(function (data) {
          pArea.IdArea = parseInt(data.Insert_Id);
          $scope.usuarios = funciones.agregarALista($scope.areasAcademicas, pArea);
          funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
          setTimeout(function(){$("#modalArea").modal('hide')},1000);
        })
        .error(function(data, status) {
          return false;
        });
    }

    // this.modificarAreaAcademica = function (pArea) {
    //   $http.post("php/modificarUsuario.php", { "data" : pArea})
    //     .success(function(data) {
    //       $scope.usuarios = funciones.editarDeLista($scope.areasAcademicas, pArea);
    //       funciones.alert("contentbody","success",'<strong>'+"Bien!.."+'</strong> guardado con exito',3500);
    //       setTimeout(function(){$("#modalArea").modal('hide')},1000);   
    //      })
    //     .error(function(data, status) {
    //        return false;
    //      });
    // }

  });
})();