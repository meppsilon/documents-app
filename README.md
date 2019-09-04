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

### Frontend
On the frontend, we address a decent number of security issues:
- input validation: We validate the search input to not allow the user to enter something malicious into the input and grab something unexpected from our server.
- file size validation: We validate the file size of files being uploaded so the files don't crash our system by being too large.
- file name validation: We validate the file name of files being uploaded so a malicious user can't overwrite files or cause damage to our system.
- file type validation: We allow files of certain mimetype to be uploaded and block all other files types through the browser upload widget.

### Backend
On the backend, we addressed a number of security issues as well:
- cors: Because we don't want any malicious parties uploading files to our directory, we limit who can send files by allowing only `http://localhost:3000` origin.
- helmet headers: We place HTTP response headers to secure the application more (like "Content-Security-Policy", "X-XSS-Protection", "X-Frame-Options", and more).

### Not addressed
- authentication
- rate limiting
- body or query validation, especially for file name
- file type validation

## Improvements
- File thumbnails: The files are all images and can be displayed in a user friendly way. The app would be a lot more intuitive if the user can see a small thumbnail of the file.
- Upload UI: The upload UI is very basic. We use the generic browser file uploader. The user has no way to view the files or edit the metadata of files before they upload them. Also, the user has no way of dragging and dropping files to be uploaded.
- Cleaner App file: The App file is starting to carry a lot of logic. Ideally, we would move the logic outside of the `App.js` file to keep the logic limited to display and less around data and state management. I'd look into using redux or mobx and move the state logic and asynchronous API requests out of the `App.js` file and into a separate file / folder structure.
- Prettier error messages: The error messages, though somewhat descriptive, are limited in position and design. I'd look into using toast messages to make the messages more intuitive and "in your face" and in a better position on the app. The toast messages can also be more universal and encompass more than messages for this page.

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
    - If no filename parameter, endpoint returns all documents
- Returns array of documents in schema: `[{ id: string, name: string, size: number }]`

### POST /documents
Create / save a document on record
- Accepts multipart upload of an array of files in post body
- Returns array of documents with schema: `[{ id: string, name: string, size: number }]`

### DELETE /documents
Delete a document on record
- Returns a message indicating if deletion failed or was successful