const baseUrl = "http://localhost:5000";

async function httpGetPlanets() {
  const result = await fetch(`${baseUrl}/planets`).catch((err) =>
    console.log(err)
  );

  return await result?.json().catch((err) => console.log(err));
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
