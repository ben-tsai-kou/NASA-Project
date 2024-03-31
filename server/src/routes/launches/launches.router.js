const express = require('express');

// controller
const { httpGetAllLaunches } = require('./launches.controllers');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);

module.exports = launchesRouter;
