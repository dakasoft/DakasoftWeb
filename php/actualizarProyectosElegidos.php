<?php

include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

 $query = "CALL actualizarProyectosElegidos('$data->id')";
 $result = mysqli_query($conexion,$query);


mysqli_close($conexion);

?>