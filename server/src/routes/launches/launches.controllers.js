const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

const httpGetAllLaunches = (_, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddnewLaunch = (req, res) => {
  const launch = { ...req.body, launchDate: new Date(req.body.launchDate) };
  const currentLaunch = addNewLaunch(launch);
  return res.status(201).json(currentLaunch); // status code 201 means created
};

module.exports = {
  httpGetAllLaunches,
  httpAddnewLaunch,
};
