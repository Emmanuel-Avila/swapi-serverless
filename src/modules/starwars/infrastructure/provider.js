const axios = require('axios');

module.exports.starWarsIntegration = async (id) => {

  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);

    const personaje = {
      nombre: response.data.name,
      altura: response.data.height,
      masa: response.data.mass,
      color_cabello: response.data.hair_color,
      color_piel: response.data.skin_color,
      color_ojos: response.data.eye_color,
      ano_nacimiento: response.data.birth_year,
      genero: response.data.gender,
      mundo_natal: response.data.homeworld,
    };

    return personaje;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al integrar con SWAPI' }),
      code: JSON.stringify(error)
    };
  }
};