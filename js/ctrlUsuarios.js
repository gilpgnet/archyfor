import { query, muestraError } from "./lib/util.js";
const lista = document.querySelector("lista-basica");
lista.cargando();
carga();
async function carga() {
  try {
    const respuesta = await query("servicios/usuarios_lista.php");
    lista.muestra("usuario.html?cue=", respuesta.lista);
  } catch (e) {
    muestraError(e);
  }
}