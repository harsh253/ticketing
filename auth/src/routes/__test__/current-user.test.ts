import request from "supertest";
import { app } from "../../app";
import { CURRENT_USER, SIGN_UP } from "../../modules/constants";

it("returns authenticated user", async () => {
  const signUpResponse = await request(app)
    .post(SIGN_UP)
    .send({
      email: "test@test.com",
      password: "passw",
    })
    .expect(201);

  const cookie = signUpResponse.get("Set-Cookie");

  const response = await request(app)
    .get(CURRENT_USER)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
