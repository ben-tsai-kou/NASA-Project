const { getAllLaunches } = require('../../models/launches.model');

const httpGetAllLaunches = (_, res) => res.status(200).json(getAllLaunches());

module.exports = {
  httpGetAllLaunches,
};
