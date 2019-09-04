# Matthew - September 4th, 2019

## Installation

```
$ npm install
```
Then start the application (runs both server and client):
```
$ npm start
```

## Security

## Improvements

## Libraries
- [Tailwindcss](https://tailwindcss.com/): Tailwindcss provides a solid baseline of css classes to quickly prototype components and an approachable language to compose the modular css classes into larger classes or into css declarations of other css selectors. Having a clean framework, like Tailwindcss, allows apps to have a more uniform design and provides a language with which developers can communicate with designers and other developers about what styles to use. The backend of tailwind is built using JavaScript (through PostCSS) so the language is very extendible. Plus the utility css classes cover most of the major css declarations so developers don't need to worry about styles to specific classes overriding other classes.
- [Enzyme](https://airbnb.io/enzyme/): Enzyme is a React testing tool that makes it easier to test React components by providing a simple API to work with. Enzyme offers an API to mount components, find elements in the mounted components, and verify that certain attributes or elements exist (even to simulate events off components). It provides all the necessary pieces to testing React components.
- [Sinon](https://sinonjs.org/): Sinonjs is a JavaScript testing library for testing functions. In React, developers want to test that callback functions are being called when events get simulated. Sinon provides a simple API for spying on functions and verifying that those functions have been called and with what arguments they've been called with.

### Backend libraries
- [Express](https://expressjs.com/): Express is a very minimal web framework for Node, batteries not included. Given the scope of this project and the time constraint, Express is a very good option with additional libraries to apply all the necessary functionality.
- [CORS](https://github.com/expressjs/cors): CORS is an express library for enabling CORS with various options for an API. This allows us to only enable our front end app to have access to the backend and greatly reduce the security risk.
- [Helmet](https://helmetjs.github.io/): Helmet is an express library that helps secure the app by setting various HTTP headers. It doesn't cover all possible security needs but provides a bare minimum set of security headers for the app.
- [Multer](https://github.com/expressjs/multer): Multer is another express library for handling 'multipart/form-data'. Form data can be tricky, especially multipart form data, but those problems have been solved plenty of times before. Instead of trying to re-invent the wheel and run into potential hickups, I utilized multer to handle multipart uploading.

## API

### GET /documents
Get all documents and query on the filename
- Accepts query parameter `filename={filename}` and returns documents with matching file name
    - If no filename parameter, returns all documents
- Returns array of documents in schema: `[{ id: string, name: string, size: number }]`

### POST /documents
Create / save a document on record
- Accepts multipart upload of an array of files
- Returns array of documents with schema: `[{ id: string, name: string, size: number }]`

### DELETE /documents
Delete a document on record
- Returns a message indication if deletion failed or was successful