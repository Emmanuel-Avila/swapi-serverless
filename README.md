
# Star Wars API Integration with Serverless Framework

  

This project is a **Serverless API** built with **Node.js**, using the **Serverless Framework** for deployment to AWS. The API integrates with the **Star Wars API (SWAPI)** and includes endpoints to fetch and store data in **DynamoDB**.

  

## Features

-  **GET /starwars/{id}**: Fetch data from the Star Wars API for a given character ID.
-  **POST /characters**: Create a new character and stores it in DynamoDB.
-  **GET /characters**: Gets all the characters stored in DynamoDB

- Integrated with **SWAPI**.

- Uses **DynamoDB** for storage.

- Unit tests with **Jest**.

- Can be run locally with **serverless-offline**.

  

## Prerequisites

  

Make sure you have the following installed:

-  **Node.js**: [Download here](https://nodejs.org/)

-  **AWS CLI**: [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

-  **Serverless Framework**: Install globally using npm:

```bash

npm install -g serverless
```

## AWS Credentials
Make sure that you have configured your aws credentials with:

```bash
aws configure 
``` 

## Run Locally
Run the project locally with

```
serverless offline start 
```

## Unit Test
Ive used Jest for my unit tests, you can run them with
``` 
npm test 
```

## Endpoints

 -   **GET /starwars/{id}**: Fetch a character from SWAPI.
		-   Example: `GET /starwars/12` retrieves data for Wilhuff Tarkin
-  **GET characters**: Fetch all characters saved in DynamoDB
 -   **POST characters**: Creates a new character in DynamoDB.
    -   Required Body Parameters:
        -   `nombre`: Name of the character
        -   `altura`: Height of the character
        -   `genero`: Gender of the character
	 - Optional Body Parameters:
		 - `masa`: weigth
		 - `color_cabello`: hair color
		 - `color_piel`: skin complexion
		 - `color_ojos`: eye corlor
		 - `ano_nacimiento`: year of birth
		 - `mundo_natal`: Birth Planet

## API Documentation
The documentation OpenAPI 3.0 complaint is in the api-documentation.yml file on the root directory

## Request testing
Can be checked on the request.rest file on the root directory, it uses the REST client of VisualStudio Code