import request from "supertest";
import { app } from "../../app";
import { SIGN_UP } from "../../modules/constants";

it("returns 201 on successful signup", () => {
  return request(app)
    .post(SIGN_UP)
    .send({
      email: "test@tes.com",
      password: "passw",
    })
    .expect(201);
});

it("returns 400 for invalid email or password", () => {
  return request(app)
    .post(SIGN_UP)
    .send({
      email: "tt",
      password: "",
    })
    .expect(400);
});

it("returns 400 for empty email or password", () => {
  return request(app).post(SIGN_UP).send({}).expect(400);
});

it("returns 400 for duplicate email sign up", async () => {
  await request(app)
    .post(SIGN_UP)
    .send({
      email: "test@tes.com",
      password: "passw",
    })
    .expect(201);

  await request(app)
    .post(SIGN_UP)
    .send({
      email: "test@tes.com",
      password: "passw",
    })
    .expect(400);
});

it("Sets cookie on successful sign up", async () => {
  const response = await request(app)
    .post(SIGN_UP)
    .send({
      email: "test@tes.com",
      password: "passw",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
