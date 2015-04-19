
<?php
include "conexion.php";
$data = file_get_contents("php://input");

$objData = json_decode($data);
$data = $objData->data;

var_dump($data);
$qry = "CALL rubricadeGrupo('$data->newid','$data->rubrica')";
// $result = mysqli_query($conexion,$qry);

// // rubricaporGrupo





// mysqli_free_result($result);
// mysqli_close($conexion);
// ?>