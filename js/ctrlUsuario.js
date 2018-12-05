import { query, execute, agregaOpciones, muestraError, muestraArchivoSeleccionado }
  from "./lib/util.js";
const parametros = new URLSearchParams(location.search);
const cue = parametros.get("cue");
const vista = document.vista;
vista.cue.value = cue;
vista.addEventListener("submit", guarda);
vista.elimina.addEventListener("click", elimina);
/* Cuando cambia el el archivo seleccionado por el usuario, se invoca la
 * función muestraArchivoSeleccionado. */
vista.avatar.addEventListener("change",
  muestraArchivoSeleccionado.bind(null, document.querySelector("img")));
carga();
async function carga() {
  try {
    const respuesta = await
      query("servicios/usuarios_busca.php?XDEBUG_SESSION_START=name&cue="
        + encodeURIComponent(cue));
    document.title = cue;
    vista.titulo.value = cue;
    document.querySelector("img").src = respuesta.modelo.avatar;
    vista.nombre.value = respuesta.modelo.nombre;
    vista.pasatiempo.value = respuesta.modelo.pas_id;
    agregaOpciones(vista.pasatiempo, respuesta.pasatiempos);
    agregaOpciones(vista["roles[]"], respuesta.roles);
  } catch (e) {
    muestraError(e);
  }
}
async function guarda(evt) {
  try {
    evt.preventDefault();
    await execute("servicios/usuarios_modifica.php?XDEBUG_SESSION_START=name", vista, "index.html");
  } catch (e) {
    muestraError(e);
  }
}
async function elimina(evt) {
  try {
    evt.preventDefault();
    if (confirm("Confirma la eliminación.\nPerderás los datos.")) {
      await execute("servicios/usuarios_elimina.php", vista, "index.html");
    }
  } catch (e) {
    muestraError(e);
  }
}