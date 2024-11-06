const { starWarsService } = require('../application/service');

module.exports.starWarsController = async (event) => {

  try {
    const { id } = event.pathParameters;
    const response = await starWarsService(id);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };

  } catch (error) {
    return error;
  }
}