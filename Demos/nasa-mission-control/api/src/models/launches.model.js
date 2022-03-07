const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Adventure XYZ",
  rocket: "To the Moon",
  launchDate: new Date("December 27, 2025"),
  target: "Kepler-1652 b",
  customers: ["JJ", "NASA", "SPACE X"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function launchWithIdExists(launchId) {
  return launches.has(launchId);
}

function addNewLaunch(launch) {
  latestFlightNumber++;

  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["JJ", "NASA", "SPACE X"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  const abortedLaunch = launches.get(launchId);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = {
  getAllLaunches,
  launchWithIdExists,
  addNewLaunch,
  abortLaunchById,
};
