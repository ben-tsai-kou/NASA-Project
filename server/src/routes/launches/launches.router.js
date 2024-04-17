const express = require('express');

// controller
const {
  httpGetAllLaunches,
  httpAddnewLaunch,
} = require('./launches.controllers');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpAddnewLaunch);

module.exports = launchesRouter;
