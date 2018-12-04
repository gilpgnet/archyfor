<?php
mb_internal_encoding("UTF-8");
require_once "util.php";
require_once "conecta.php";
$respuesta = new stdClass();
try {
  $con->verifica();
  $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
  $cue = trim(filter_input(INPUT_POST, "cue"));
  $match = trim(filter_input(INPUT_POST, "match"));
  $nombre = trim(filter_input(INPUT_POST, "nombre"));
  $afi_id = trim(filter_input(INPUT_POST, "aficion"));
  $rol_ids = isset($_POST["roles"]) ? $_POST["roles"] : [];
  valida($cue, "Falta el cue.");
  valida(preg_match("/^\\w{5,16}$/", $cue),
    "El cue debe tener 5 a 16 letras o dígitos.");
  valida(preg_match("/^\\w{5,25}$/", $match),
    "El match debe tener 5 a 25 letras o dígitos.");
  valida($nombre, "Falta el nombre.");
  $con->execute("INSERT INTO USUARIO
      (USU_CUE, USU_NOMBRE, USU_MATCH, AFI_ID) VALUES (?,?,SHA1(?),?)",
    "sssi", $cue, $nombre, $match, $afi_id);
  $con->execute("DELETE FROM USUARIO_ROL WHERE USU_CUE = ?", "s", $cue);
  $con->prepare("INSERT INTO USUARIO_ROL (USU_CUE,ROL_ID) VALUES (?,?)");
  if ($rol_ids) {
    foreach ($rol_ids as $rol_id) {
      $con->bind_execute("ss", $cue, $rol_id);
    }
  }
  $con->commit();
} catch (Exception $e) {
  atrapa_error($respuesta, $e);
}
devuelve($respuesta);