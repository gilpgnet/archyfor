import { query, execute, agregaOpciones, muestraError, muestraArchivoSeleccionado }
  from "./lib/util.js";
const vista = document.vista;
vista.addEventListener("submit", guarda);
/* Cuando cambia el el archivo seleccionado por el usuario, se invoca la
 * función muestraArchivoSeleccionado. */
vista.avatar.addEventListener("change",
  muestraArchivoSeleccionado.bind(null, document.querySelector("img")));
carga();
async function carga() {
  try {
    const respuesta = await query("servicios/usuarios_busca.php");
    agregaOpciones(vista.pasatiempo, respuesta.pasatiempos);
    agregaOpciones(vista["roles[]"], respuesta.roles);
  } catch (e) {
    muestraError(e);
  }
}
async function guarda(evt) {
  try {
    evt.preventDefault();
    await execute("servicios/usuarios_agrega.php?XDEBUG_SESSION_START=name",
      vista, "index.html");
  } catch (e) {
    muestraError(e);
  }
}