<?php

include "conexion.php";

$data = file_get_contents("php://input");

$objData = json_decode($data);

$data = $objData->data;
$equipoid = $data; 

$query = "CALL guardarEquipo('$data->IdEquipo','$data->Equipo','$data->Mision','$data->Vision')";
$result = mysqli_query($conexion,$query);

mysqli_close($conexion);

?>