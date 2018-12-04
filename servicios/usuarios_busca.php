<?php
mb_internal_encoding("UTF-8");
require_once "util.php";
require_once "conecta.php";
$respuesta = new stdClass();
try {
  $con->verifica();
  $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
  $cue = trim(filter_input(INPUT_GET, "cue"));
  $afi_id = null;
  $roles = [];
  if ($cue) {
    // Recupera objeto.
    $con->query(
      "SELECT USU_NOMBRE AS nombre, AFI_ID AS afi_id
        FROM USUARIO
        WHERE USU_CUE = ?",
      "s", $cue);
    if ($obj = $con->fetch_object()) {
      $respuesta->modelo = $obj;
      $afi_id = $obj->afi_id;
    } else {
      throw new Exception("Registro no encontrado.");
    }
    // Recupera roles del objeto. (Relación muchos a muchos.)
    $con->query(
      "SELECT ROL_ID FROM USUARIO_ROL WHERE USU_CUE = ?",
      "s", $cue);
    while ($obj = $con->fetch_object()) {
      $roles[$obj->ROL_ID] = true;
    }
  }
  // Recupera aficiones para el select. (Relación a uno.)
  $con->query(
    "SELECT AFI_ID, AFI_NOMBRE
      FROM AFICION
      ORDER BY UPPER(AFI_NOMBRE)");
  $respuesta->aficiones = [];
  while ($obj = $con->fetch_object()) {
    $respuesta->aficiones[] = (object) [
      "value" => $obj->AFI_ID,
      "selected" => $obj->AFI_ID == $afi_id,
      "text" => $obj->AFI_NOMBRE,
    ];
  }
  // Recupera roles para el select
  $con->query(
    "SELECT ROL_ID, ROL_DESCRIPCION
      FROM ROL
      ORDER BY UPPER(ROL_ID)");
  $respuesta->roles = [];
  while ($obj = $con->fetch_object()) {
    $respuesta->roles[] = (object) [
      "value" => $obj->ROL_ID,
      "selected" => isset($roles[$obj->ROL_ID]),
      "text" => "{$obj->ROL_ID}: {$obj->ROL_DESCRIPCION}",
    ];
  }
  $con->commit();
} catch (Exception $e) {
  atrapa_error($respuesta, $e);
}
devuelve($respuesta);