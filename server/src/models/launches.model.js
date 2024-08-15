const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet was found');
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    { ...launch },
    {
      upsert: true,
    }
  );
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase
    .findOne()
    .sort({ flightNumber: -1 });
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
};

const scheduleNewLaunch = async (launch) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

const getAllLaunches = async () =>
  await launchesDatabase.find({}, { _id: 0, __v: 0 });

const isFlightNumberExist = (flightNumber) => launches.has(flightNumber);

const deleteLaunch = (flightNumber) => {
  const aborted = launches.get(flightNumber);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

saveLaunch(launch);

module.exports = {
  getAllLaunches,
  deleteLaunch,
  scheduleNewLaunch,
  isFlightNumberExist,
};
