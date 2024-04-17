const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => Array.from(launches.values());

const isFlightNumberExist = (flightNumber) => launches.has(flightNumber);

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  const currentLaunch = {
    ...launch,
    flightNumber: latestFlightNumber,
    customer: ['Zero to Master', 'NASA'],
    upcoming: true,
    success: true,
  };
  launches.set(latestFlightNumber++, currentLaunch);
  return currentLaunch;
};

const deleteLaunch = (flightNumber) => {
  const aborted = launches.get(flightNumber);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
  isFlightNumberExist,
};
