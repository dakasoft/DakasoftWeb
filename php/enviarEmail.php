<?php

$admin = "kmunozv@ucenfotec.ac.cr";
$mensaje = "Recuperacion de contraseña del correo ";
$mensaje = htmlspecialchars($mensaje);
$mensaje = stripcslashes($mensaje);

$to = $admin;
$subject = "Correo de recuperacionde contraseña";
$header = "ProjectPin";
$retval = mail($to,$subject,$mensaje,$header);

if ($retval == true) 
{
 echo true;
}
else 
{
 echo "mensaje no fue enviado";
}

?>