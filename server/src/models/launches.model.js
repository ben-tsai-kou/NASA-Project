const axios = require('axios');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100, // flight_number
  mission: 'Kepler Exploration X', // name
  rocket: 'Explorer IS1', // rocket.name
  launchDate: new Date('December 27, 2030'), // date_local
  target: 'Kepler-442 b', // not applicable
  customers: ['ZTM', 'NASA'], // payloads.customers for each payload
  upcoming: true, // upcoming
  success: true, // success
};

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

const getAllLaunches = async () =>
  await launchesDatabase.find({}, { _id: 0, __v: 0 });

const deleteLaunch = async (flightNumber) => {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
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

// return null if no launch with that number
const isFlightNumberExist = async (flightNumber) =>
  await launchesDatabase.findOne({ flightNumber });

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const loadLaunchData = async () => {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];

    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);
  }
};

module.exports = {
  getAllLaunches,
  deleteLaunch,
  scheduleNewLaunch,
  isFlightNumberExist,
  loadLaunchData,
};
