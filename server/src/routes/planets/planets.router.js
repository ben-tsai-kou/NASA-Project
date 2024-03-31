const express = require('express');

// controller
const { httpGetAllPlanets } = require('./planets.controllers');

const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetAllPlanets);

module.exports = planetsRouter;
