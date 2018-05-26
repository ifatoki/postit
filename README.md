# PostIt
[![Build Status](https://travis-ci.org/andela-ifatoki/postit.svg?branch=development)](https://travis-ci.org/andela-ifatoki/postit)
[![Coverage Status](https://coveralls.io/repos/github/andela-ifatoki/postit/badge.svg?branch=development)](https://coveralls.io/github/andela-ifatoki/postit?branch=development)

## Dependencies
### Development Dependencies
The following depencies are required by the app during developmment
- Babel-register - This framework helps to compile from es6 to es5
- eslint - This is a javascript syntax highlighter used to highligh syntax error during the development of this app
- nyc - Used with mocha for test coverage report
- sinon - Used with mocha and enzyme for mocking React components during test
### Dependencies
- babel-cli - It enables the app scripts to be tested with babel from the command line
- babel-core - It compiles es6 used in the app to es5
- babel-loader - Used with Webpack to transpile javascript codes
- chai - Asscertion library used for the backend testing
- coveralls - Display test coverage
- express - Used as the web server for this application
- json-loader - Enables the app to inport json files.
- lodash - Used to perform filter on objects
- pg, pg-hstore, sequelize - Used to create database models and for performing database operations
- validator - Used to validate user input during server request

## Installation and setup

Before you install the app locally, ensures you have [NodeJS](https://nodejs.org/en/#) and [PostgreSQL](https://www.postgresql.org/) installed on your computer.

- Navigate to a directory of choice on `terminal`

- Clone this repository on that directory.

- Using SSH, 

  `git clone git@github.com:andela-ifatoki/postit.git` 

  and https, 

  `git clone https://github.com/andela-ifatoki/postit.git`

- Navigate into project directory by running `cd postit`

- Run `npm install` to install project dependencies

- Start the app by running `npm run dev`

## Tests

- The server side test are witten with mocha and chai backed with supertest 
- They are run using the **coverage** tool in order to generate test coverage reports.
- To run the tests, navigate to the project's root folder
- Run the following commands.
- `npm test`

## Contributing

Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

- Fork this repository to your own account.
- Download/Clone a forked copy of tthe repository to your local machine.
- Create a new branch: `git checkout -b new-branch-name`.
- Install the dependencies using `npm install`.
- Run `npm install` to install project dependencies
- To run application unit tests: `npm test`.
- Work on a new feature and push to your remote branch: `git push origin your-branch-name`
- Raise a pull request to the staging branch of this repo.
- This project uses javascript ES6 and follows the airbnb style-guide: <https://github.com/airbnb/javascript>
