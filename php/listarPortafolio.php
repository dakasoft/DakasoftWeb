<?php

include "conexion.php";



$query = "CALL portafolioListar()";
$result = mysqli_query($conexion,$query);


$rows = array();

while($r = mysqli_fetch_assoc($result)){
	$rows[] = $r;
}
	
mysqli_free_result($result);


// $query = "CALL proyectoEquipo('7')";
// $result = mysqli_query($conexion,$query);

// $rnuevo = array();

// while($rs = mysqli_fetch_assoc($result)){
// 	$rnuevo[] = $rs;
// }

// var_dump($rnuevo);

// $rows[] = $rnuevo;

mysqli_close($conexion);

echo json_encode($rows);

?>