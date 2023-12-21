const express = require('express');

// controller
const { getAllPlanets } = require('./planets.controllers');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;
