const dynamoDB = require('../../../db/dynamoDb');
const { v4: uuidv4 } = require('uuid');

module.exports.getCharactersProvider = async () => {

  console.log("asdasdsa")
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

module.exports.createCharacterProvider = async (request) => {

  const character = {
    id: uuidv4(),
    ...request,
  };

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: character,
  };

  try {
    await dynamoDB.put(params).promise();
    return JSON.stringify({
      message: 'Personaje creado correctamente',
      personaje: character,
    })
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al crear personaje', error }),
    };
  }
}