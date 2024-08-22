const express = require('express');

// controller
const { httpGetAllPlanets } = require('./planets.controllers');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;
