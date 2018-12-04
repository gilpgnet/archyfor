customElements.define("campos-usuario", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      `<p>
        <label accesskey="A">
          Avatar
          <input type="file" name="avatar" accept=".png,.jpg,.jpeg,.gif">
          <img alt="Falta seleccionar imagen.">
        </label>
      </p>
      <p>
        <label accesskey="M">
          Match (5 a 25 caracteres)
          <span class="match">
            <input name="match" type="password">
            <boton-visibilidad></boton-visibilidad>
          </span>
        </label>
      </p>
      <p>
        <label accesskey="N">
          Nombre
          <input name="nombre" type="text">
        </label>
      </p>
      <p>
        <label accesskey="P">
          Pasatiempo
          <select name="pasatiempo"></select>
        </label>
      </p>
      <p>
        <label accesskey="R">
          Roles
          <select name="roles[]" multiple></select>
        </label>
      </p>`;
  }
});