<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;
$encargadoid = $data; 

$query = "CALL encargadoObtener('$encargadoid')";

$result = mysqli_query($conexion,$query);
	
if($result){
	$Encargado = $result->fetch_array(MYSQLI_ASSOC);
	mysqli_free_result($result);
	echo json_encode($Encargado);
	
}else{
	echo false;
}

mysqli_close($conexion);

?>
