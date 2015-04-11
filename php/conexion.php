<?php

$conexion = mysqli_connect("localhost","root","","dakasoft");
mysqli_set_charset($conexion, "utf8");

if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

?>