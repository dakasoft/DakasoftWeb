<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$query = "CALL parametrosCrear('$data->FechaInicio','$data->FechaCierre','$data->FechaRecepcion','$data->Activo')";

$result = mysqli_query($conexion,$query);

if($result){
	$Insert_Id = $result->fetch_array(MYSQLI_ASSOC);
	echo json_encode($Insert_Id);
	mysqli_free_result($result);
}else{
	echo false;
}

mysqli_close($conexion);

?>