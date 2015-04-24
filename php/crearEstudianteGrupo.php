<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);

$IdGrupo = $objData->IdGrupo;
$IdEstudiante = $objData->IdEstudiante;
$FechaIngreso = $objData->FechaIngreso;

$query = "CALL estudiantePorGrupoCrear('$IdGrupo','$IdEstudiante', '$FechaIngreso')";

$result = mysqli_query($conexion,$query);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>