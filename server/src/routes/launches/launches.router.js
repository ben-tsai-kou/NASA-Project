const express = require('express');

// controller
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
} = require('./launches.controllers');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:flightNumber', httpDeleteLaunch);

module.exports = launchesRouter;
