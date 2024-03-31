const express = require('express');

// controller
const { getAllLaunches } = require('./launches.controllers');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);

module.exports = launchesRouter;
