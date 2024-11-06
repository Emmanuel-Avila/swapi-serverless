class Character {
  constructor(data) {
    this.nombre = data.nombre;
    this.altura = data.altura;
    this.masa = data.masa || null;
    this.color_cabello = data.color_cabello || null;
    this.color_piel = data.color_piel || null;
    this.color_ojos = data.color_ojos || null;
    this.ano_nacimiento = data.ano_nacimiento || null;
    this.genero = data.genero;
    this.mundo_natal = data.mundo_natal || null;
  }
}