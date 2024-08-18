const {
  getAllLaunches,
  scheduleNewLaunch,
  deleteLaunch,
  isFlightNumberExist,
} = require('../../models/launches.model');

const httpGetAllLaunches = async (_, res) => {
  return res.status(200).json(await getAllLaunches());
};

const httpAddNewLaunch = async (req, res) => {
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

  const currentLaunch = await scheduleNewLaunch(launch);
  return res.status(201).json(currentLaunch); // status code 201 means created
};

const httpDeleteLaunch = async (req, res) => {
  const launchIdToBeDeleted = Number(req.params.flightNumber);
  const flightToBeDeleted = await isFlightNumberExist(launchIdToBeDeleted);

  if (!flightToBeDeleted) {
    return res.status(404).json({ error: 'flight number not found' });
  }

  const abortedLaunch = await deleteLaunch(launchIdToBeDeleted);

  if (!abortedLaunch) {
    return res.status(400).json({ error: 'Failed to abort launch' });
  }

  return res.status(200).json({
    ok: true,
  });
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
};
