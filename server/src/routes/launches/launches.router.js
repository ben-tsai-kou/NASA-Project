const express = require('express');

// controller
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
} = require('./launches.controllers');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunch);
launchesRouter.delete('/launches/:flightNumber', httpDeleteLaunch);

module.exports = launchesRouter;
