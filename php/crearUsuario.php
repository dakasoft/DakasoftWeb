<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$rolid = $data->rol->id;
$query = "CALL usuarioCrear('$data->Nombre','$data->Apellido','$data->Email','$data->Password','$rolid')";

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