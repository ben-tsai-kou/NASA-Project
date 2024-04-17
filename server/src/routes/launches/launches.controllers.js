const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

const httpGetAllLaunches = (_, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddnewLaunch = (req, res) => {
  const nextMission = { ...req.body };

  if (
    !nextMission.mission ||
    !nextMission.rocket ||
    !nextMission.launchDate ||
    !nextMission.target
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  const launchDate = new Date(nextMission.launchDate);

  if (isNaN(launchDate)) {
    return res.status(400).json({ error: 'Invalid launch date' });
  }

  const launch = { ...nextMission, launchDate };

  const currentLaunch = addNewLaunch(launch);
  return res.status(201).json(currentLaunch); // status code 201 means created
};

module.exports = {
  httpGetAllLaunches,
  httpAddnewLaunch,
};
