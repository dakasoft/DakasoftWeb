<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$qry = "CALL usuarioSolicitar('$data')";
$result = mysqli_query($conexion,$qry);

if($result){
	$user = $result->fetch_array(MYSQLI_ASSOC);
	mysqli_free_result($result);
	echo json_encode($user);
}else{
	echo false;
}

mysqli_close($conexion);

?>