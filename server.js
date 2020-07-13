const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const service = client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/bulk', (req, res) => {
  res.header('Content-Type', 'application/json');
  const numbers = req.body.numbers;
  numbers = numbers.filter(String);
  //numbers.pop();
  //console.log(numbers);

  const bindings = numbers.map((number) => {
    return JSON.stringify({ binding_type: 'sms', address: number });
  });

  console.log(bindings);

  service.notifications
    .create({
      toBinding: bindings,
      body: req.body.body,
    })
    .then((notification) => {
      console.log(notification);
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.error(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post('/api/single', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_FROM,
      to: req.body.to,
      body: req.body.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(5000, () =>
  console.log('Express server is running on localhost:5000')
);
