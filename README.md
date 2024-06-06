# Basic Blog REST API [Express.js + Typescript]

This repos contains a RESTful API endpoint using Express.js and TypeScript.
The API allows users to create and retrieve blog posts. 

## Tech stack
- Node.js [https://nodejs.org/]
- Express.js [https://expressjs.com/]
- Typescript [https://www.typescriptlang.org/]
- Sequelize ORM [https://sequelize.org/] 
- Jest.js [https://jestjs.io/] for unit tests
- Joi.js [https://joi.dev/] for input validation
- SQLite [https://sqlite.org/] for datastorage

## Endpoints
- `POST /v1/users/login`: Does the user login and return JWT token
- `GET /v1/posts`: List all posts
- `GET /v1/posts/:id`: Get one post details
- `POST /v1/posts`: Create a new post
- `PUT /v1/posts/:id`: Update a existing post
- `DELETE /v1/posts/:id`: Delete a  post

## Getting Started

### Prerequisites
Please install the most recently Node.js version if you don't have it. Recommended v20.14.0 or later:

```
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.14.0`

# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
```

### Setup

Open your terminal and clone this repo:

```
git clone https://github.com/lucasmendonca/express-typescript-api.git
```

Go to the project directory:

```
cd express-typescript-api
```
Install node dependencies:

```
npm i
```

For the matter of simplicity this repo uses a local SQLite database. There is one database-init script which creates required tables and sample data. Please run the following:

```
npm run init
```


### Running Locally
Start the server in development mode (not receomend for production):
```
npm run dev
```

### Running Tests
To run tests, run the following command:
```
npm run test
```

To verify test coverage run the command below and then open the generated file `coverage/lcov-report/index.html` for coverge details:

```
npm run coverage
```

### Build
To build the project, run the following command (recomended for any non-dev environemt):

```
npm run build
```
Then, start the server in production mode:

```
npm run start
```

### Environment Variables
Default values are provided but in order to overwrite default configurations you will need to add the following environment variables to your `.env` file. Plese clone and rename the `.env.sample` file.

```
PORT=3000
jwtSecret="defaultSecret"
```