const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
  isFlightNumberExist,
} = require('../../models/launches.model');

const httpGetAllLaunches = async (_, res) => {
  return res.status(200).json(await getAllLaunches());
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

const httpDeleteLaunch = (req, res) => {
  const launchIdToBeDeleted = Number(req.params.flightNumber);

  if (!isFlightNumberExist(launchIdToBeDeleted)) {
    return res.status(404).json({ error: 'flight number not found' });
  }

  const abortedLauncht = deleteLaunch(launchIdToBeDeleted);

  return res.status(200).json(abortedLauncht);
};

module.exports = {
  httpGetAllLaunches,
  httpAddnewLaunch,
  httpDeleteLaunch,
};
