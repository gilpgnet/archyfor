import {query} from "./lib/util.js";
const lista = document.querySelector("lista-basica");
lista.cargando();
consulta("servicios/usuarios_consulta.php",
    respuesta => lista.muesta("usuario.html?cue=", respuesta.lista));