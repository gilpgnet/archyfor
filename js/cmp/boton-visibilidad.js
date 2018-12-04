customElements.define("boton-visibilidad", class extends HTMLElement {
  constructor() {
    this.cliqueado = this.cliqueado.bind(this);
  }
  connectedCallback() {
    this.addEventListener("click", this.cliqueado);
    this.muestraTexto();
  }
  muestraTexto() {
    this.textContent = this.previousElementSibling.type === "password" ? "Muestra" : "Oculta";
  }
  cliqueado() {
    const previo = this.previousElementSibling;
    previo.type = previo.type === "password" ? "text" : "password";
    this.muestraTexto();
  }
});