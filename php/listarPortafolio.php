<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

$query = "CALL portafolioListar()";
$result = mysqli_query($conexion,$query);

$rows = array();

while($r = mysqli_fetch_assoc($result)){
	$rows[] = $r;
}

	
mysqli_free_result($result);
mysqli_close($conexion);

echo json_encode($rows);

?>