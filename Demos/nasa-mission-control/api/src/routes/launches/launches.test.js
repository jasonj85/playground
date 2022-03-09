const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const fullLaunchData = {
    mission: "Explore alien planets",
    rocket: "NUX 0198",
    target: "Kepler 10249",
    launchDate: "January 21, 2039",
  };

  const partialLaunchData = {
    mission: "Explore alien planets",
    rocket: "NUX 0198",
    target: "Kepler 10249",
  };

  const dataWithInvalidDate = {
    mission: "Explore alien planets",
    rocket: "NUX 0198",
    target: "Kepler 10249",
    launchDate: "bad date",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(fullLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(fullLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(partialLaunchData);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(partialLaunchData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Required launch data missing",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(dataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
