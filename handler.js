const axios = require('axios');
const dynamoDB = require('./db/dynamoDb');
const { v4: uuidv4 } = require('uuid');

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};

module.exports.getCharacters = async () => {

  const params = {
    TableName: process.env.TABLE_NAME,
  };

  try {
    const characters = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(characters),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al traer informacion', error }),
    };
  }

};

module.exports.createCharacter = async (event) => {
  const data = JSON.parse(event.body);

  console.log(data)

  if (!data.nombre || !data.altura || !data.genero) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Faltan campos requeridos: nombre, altura o genero' })
    }
  }

  const character = {
    id: uuidv4(),
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

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: character,
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Personaje creado correctamente',
        personaje: character,
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al crear personaje', error }),
    };
  }
}

module.exports.starWarsIntegration = async (event) => {
  const { id } = event.pathParameters;

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

    return {
      statusCode: 200,
      body: JSON.stringify(personaje),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al integrar con SWAPI' }),
    };
  }
};