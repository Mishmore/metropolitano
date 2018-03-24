const express = require('express');
let app = express();
app.use(express.static(__dirname + '/dist'));
const districtJson = require('./json/districts.json');
const stationJson = require('./json/stations.json');
const expressServicesJson = require('./json/express_services.json');
const mainExpressJson = require('./json/main_express.json');


app.get('/', function (req, res) {
  res.send('Hello World!');
});


const districts = districtJson.districts;
const stations = stationJson.stations;
const expressServices = expressServicesJson.express_services;
const mainExpress = mainExpressJson.main_express;

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

app.get('/main-express', function (req, res) {
  res.json(mainExpress);
});

app.get('/main-express/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const result = mainExpress.filter(r => r.id === id)[0];

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});

//Stations

app.get('/stations', function (req, res) {
  res.json(stations);
});

app.get('/stations/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const result = stations.filter(r => r.id === id)[0];

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});


app.get('/express', function (req, res) {
  res.json(expressServices);
});

app.get('/express/:id', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const result = expressServices.filter(r => r.id === id)[0];

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});

app.get('/express/:id/stations', function (req, res) {
  const id = parseInt(req.params.id, 10);
  const resultFilter = expressServices.filter(r => r.id === id)[0];
  const results = [];
  resultFilter.stations.forEach(function (express) {
    results.push(stations.filter((station) => station.id === express.id)[0]);
    return results;
  });
  const result = results;

  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result);
  }
});


const server = app.listen(process.env.PORT || 3000, function () {
  let host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  const port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});

