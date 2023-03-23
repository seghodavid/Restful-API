const assert = require("assert");
const app = require("../app");
const request = require("supertest")(app);
const { User } = require("../src/models/user");
const passport = require("passport");

describe("It should test the API entry point", function () {

  it("It should return status code 200", function (done) {
    request
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("It should return Welcome to Restful-API", function (done) {
    request
      .get("/")
      .expect("<h1>Welcome to my Restful-API</h1>")
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("It should return status code 404 for invalid routes", async () => {
    await request.get("/invalid-route").expect(404);
  });

  it("It should return status code 401 for GET /api/v1/quote without authentication", async () => {
    await request.get("/api/v1/quote").expect(401);
  });

  let token;

  before(async () => {
    const user = { username: 'Gigi Doe', password: 'Elluup' };
    const response = await request
      .post('/api/v1/auth/login')
      .send(user);

    token = response.body.token;
  });

  it('It should return status code 200 for GET /api/v1/quote with authentication', async () => {
    const response = await request
      .get('/api/v1/quote')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(response.status, 200);
  });
});
