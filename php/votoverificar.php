<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$query = "CALL votoVerificar('$data')";
$result = mysqli_query($conexion,$query);

if($result){
	 $equipo = $result->fetch_array(MYSQLI_ASSOC);
	echo json_encode($equipo);
 mysqli_free_result($result);

}else{
	echo false;
}

mysqli_close($conexion);

?>