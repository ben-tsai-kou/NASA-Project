const { getAllPlanets } = require('../../models/planets.model');

const httpGetAllPlanets = async (_, res) =>
  await res.status(200).json(getAllPlanets());

module.exports = {
  httpGetAllPlanets,
};
