const assert = require("assert");
const supertest = require("supertest");
const app = require("../app");
const { User } = require("../src/models/user");
const passport = require("passport");

describe("It should test the API entry point", function () {

  it("It should return status code 200", function (done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("It should return Welcome to Restful-API", function (done) {
    supertest(app)
      .get("/")
      .expect("<h1>Welcome to my Restful-API</h1>")
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it(" it should return status code 404 for invalid routes", async () => {
    await supertest(app).get("/invalid-route").expect(404);
  });

  it("it should return status code 401 for GET /api/v1/quote without authentication", async () => {
    await supertest(app).get("/api/v1/quote").expect(401);
  });

});
