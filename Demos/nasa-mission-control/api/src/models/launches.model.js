const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Adventure XYZ",
  rocket: "To the Moon",
  launchDate: new Date("December 27, 2025"),
  destination: "Kepler-1652 b ",
  customers: ["JJ", "NASA", "SPACE X"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
