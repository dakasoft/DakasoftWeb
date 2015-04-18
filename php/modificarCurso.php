<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$query = "CALL cursoModificar('$data->id','$data->Nombre','$data->Codigo')";
$result = mysqli_query($conexion,$query);
$Areas= $data->Areas;

$query = "CALL areascursoEliminar('$data->id')"; // aqui los borro
$result = mysqli_query($conexion,$query);
var_dump($result);

if($result){
	foreach ($data->Areas as &$areas) { 
    	$idAreas = $areas->id;// $idAreas = $areas->id;
        $qry = "CALL areascursoCrear('$idAreas','$data->id')"; //
	    mysqli_query($conexion,$qry);
      }
	mysqli_free_result($result);
 	echo json_encode($data->id);
   }else{
 	echo false;
   }

mysqli_close($conexion);

?>