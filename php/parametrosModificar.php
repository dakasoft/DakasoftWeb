<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
var_dump($data);
$query = "CALL parametrosModificar('$data->FechaCierre','$data->FechaRecepcion','$data->Activo','$data->id')";
$result = mysqli_query($conexion,$query);

if($result){
	echo true;
}else{
	echo false;
}

mysqli_close($conexion);

?>