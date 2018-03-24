const express = require('express');
const json = require('./json/districts.json');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


const districts = json.districts;

app.get('/districts', function (req, res) {
  res.json(districts);
});

app.get('/districts/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const result = districts.filter(r => r.id === id)[0];

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});


const server = app.listen(3000, function () {
  let host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  const port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});
