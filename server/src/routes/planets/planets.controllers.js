const { getAllPlanets } = require('../../models/planets.model');

const httpGetAllPlanets = (_, res) => res.status(200).json(getAllPlanets());

module.exports = {
  httpGetAllPlanets,
};
