const express = require('express');

// controller
const {
  httpGetAllLaunches,
  httpAddnewLaunch,
  httpDeleteLaunch,
} = require('./launches.controllers');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddnewLaunch);
launchesRouter.delete('/launches/:flightNumber', httpDeleteLaunch);

module.exports = launchesRouter;
