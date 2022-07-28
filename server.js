const express = require('express');
const path = require('path');

const app = express();

// add this code
const whitelist = ['http://localhost:3000', 'https://file-uploader-spring-app.herokuapp.com']; // list of allow domain

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}
app.use(cors(corsOptions));

// Serve only the static files form the dist directory
app.use(express.static('./dist/fileuploader-frontend'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/fileuploader-frontend/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
