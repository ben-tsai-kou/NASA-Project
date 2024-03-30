const path = require('path');
// const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// routers
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, 'access.log'),
//   { flags: 'a' }
// );

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetsRouter);
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
