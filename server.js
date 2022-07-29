const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// add this code

// end
app.use(cors());


// Serve only the static files form the dist directory
app.use(express.static('./dist/fileuploader-frontend'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/fileuploader-frontend/'}),
);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
