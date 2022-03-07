const baseUrl = "http://localhost:5000";

async function httpGetPlanets() {
  const result = await fetch(`${baseUrl}/planets`).catch((err) =>
    console.log(err)
  );

  return await result?.json().catch((err) => console.log(err));
}

async function httpGetLaunches() {
  const result = await fetch(`${baseUrl}/launches`).catch((err) =>
    console.log(err)
  );

  const launches = await result?.json().catch((err) => console.log(err));

  // sort by flight number
  return launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  return await fetch(`${baseUrl}/launches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  }).catch((err) => {
    console.log(err);
    return {
      ok: false,
    };
  });
}

async function httpAbortLaunch(id) {
  return await fetch(`${baseUrl}/launches/${id}`, {
    method: "delete",
  }).catch((err) => {
    console.log(err);
    return {
      ok: false,
    };
  });
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
