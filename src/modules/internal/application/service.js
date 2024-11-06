const { getCharactersProvider, createCharacterProvider } = require('../infrastructure/provider');

module.exports.getCharactersService = async () => {
  try {
    const response = await getCharactersProvider();
    return response;
  } catch (error) {
    return error;
  }
}

module.exports.createCharacterService = async (request) => {
  try {
    const response = await createCharacterProvider(request);
    return response;
  } catch (error) {
    return error;
  }
}