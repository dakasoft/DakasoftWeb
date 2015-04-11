<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$rolid = $data->rol->id;
$query = "CALL usuarioModificar('$data->id,$data->Nombre','$data->Apellido','$data->Email','$data->Password','$rolid')";

$result = mysqli_query($conexion,$query);

if($result){
	echo "Insertado";
}else{
	echo "no se pudo";
}

mysqli_close($conexion);

?>