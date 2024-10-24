const { createCharacter, getCharacters, starWarsIntegration } = require('../handler');
const dynamoDB = require('../db/dynamoDb');
const axios = require('axios');

jest.mock('../db/dynamoDb');
jest.mock('axios');

describe('Lambda Handlers testing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCharacter', () => {
    it('deberia crear un personaje correctamente y retornar un status 201', async () => {

      dynamoDB.put.mockReturnValue({
        promise: jest.fn().mockResolvedValue({})
      });

      const event = {
        body: JSON.stringify({
          nombre: 'Luke Skywalker',
          altura: '172',
          genero: 'masculino',
        }),
      }

      const response = await createCharacter(event);

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.body).message).toBe('Personaje creado correctamente');
      expect(dynamoDB.put).toHaveBeenCalledTimes(1);

    });

    it('deberia manejar errores de DynamoDB correctamente', async () => {

      dynamoDB.put.mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('Error de DynamoDB'))
      });

      const event = {
        body: JSON.stringify({
          nombre: 'Luke Skywalker',
          altura: '172',
          genero: 'masculino'
        })
      }

      const response = await createCharacter(event)

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body).message).toBe('Error al crear personaje');

    })
  });

  describe('getCharacters', () => {
    it('deberia obtener personas correctamente y retornar status 200', async () => {

      dynamoDB.scan.mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Items: [{ nombre: 'Luke Skywalker' }],
        }),
      });

      const response = await getCharacters();

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({ Items: [{ nombre: 'Luke Skywalker' }] });
      expect(dynamoDB.scan).toHaveBeenCalledTimes(1);
    });

    it('deberia manejar errores de DynamoDb correctamente', async () => {
      dynamoDB.scan.mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('Error de DynamoDb'))
      });

      const response = await getCharacters();
      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body).message).toBe('Error al traer informacion');

    });

    describe('starWarsIntegration', () => {
      it('deberia obtener un personaje de SWAPI y traducir sus keys', async () => {

        axios.get.mockResolvedValue({
          data: {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'Tatooine'
          }
        });
        const event = { pathParameters: { id: '1' } };

        const response = await starWarsIntegration(event);

        const personajeEsperado = {
          nombre: 'Luke Skywalker',
          altura: '172',
          masa: '77',
          color_cabello: 'blond',
          color_piel: 'fair',
          color_ojos: 'blue',
          ano_nacimiento: '19BBY',
          genero: 'male',
          mundo_natal: 'Tatooine'
        }

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(personajeEsperado);
        expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1')
      })
    })
  })
})