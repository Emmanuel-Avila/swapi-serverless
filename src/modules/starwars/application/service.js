const { starWarsIntegration } = require('../infrastructure/provider');

module.exports.starWarsService = async (id) => {
  try {
    const response = await starWarsIntegration(id);
    return response;
  } catch (error) {
    return error;
  }
}