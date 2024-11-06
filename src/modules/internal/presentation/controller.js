const { getCharactersService, createCharacterService } = require('../application/service');

module.exports.createCharacter = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (!data.nombre || !data.altura || !data.genero) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Faltan campos requeridos: nombre, altura o genero' })
      }
    }

    const character = {
      nombre: data.nombre,
      altura: data.altura,
      masa: data.masa || null,
      color_cabello: data.color_cabello || null,
      color_piel: data.color_piel || null,
      color_ojos: data.color_ojos || null,
      ano_nacimiento: data.ano_nacimiento || null,
      genero: data.genero,
      mundo_nata: data.mundo_natal || null
    };

    const response = await createCharacterService(character);


    return {
      statusCode: 200,
      body: (response),
    };

  } catch (error) {
    return error;
  }
}

module.exports.getCharacters = async () => {
  try {
    return await getCharactersService();
  } catch (error) {
    return error;
  }
}