const { getAllPlanets } = require('../../models/planets.model');

const httpGetAllPlanets = async (_, res) =>
  res.status(200).json(await getAllPlanets());

module.exports = {
  httpGetAllPlanets,
};
