import { test, expect } from "@playwright/test";
import { MainPage } from "../component/global-fuction";
import data from "./database.json";

const data_auth = {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
};

const component = new MainPage();

test("Register", async ({ request }) => {
  const response = await request.post(`/api/register`, {
    data: data_auth,
  });
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody, ["id", "token"]);
});

test("login", async ({ request }) => {
  const response = await request.post(`/api/login`, {
    data: data_auth,
  });
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody, ["token"]);
});


test(`logout`, async ({ request }) => {
  const response = await request.post(`/api/logout`);
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
});

test("Get all user", async ({ request }) => {
  const response = await request.get(`/api/users`);
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody.data[0], [
    "id",
    "email",
    "first_name",
    "last_name",
    "avatar",
  ]);
});

data.data_user.forEach(async (value, index) => {
  test(`Create user: ${index} `, async ({ request }) => {
    const response = await request.post(`/api/users`, {
      data: value,
    });
    await expect(response.status()).toBe(201);
    const responseBody = await response.json();
    await expect(responseBody).toBeTruthy();
    await component.checkKeyOfJson(responseBody, [
      "name",
      "job",
      "id",
      "createdAt",
    ]);
  });
});

test("Get user by id", async ({ request }) => {
  const response = await request.get(`/api/users/1`);
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  await expect(responseBody).toBeTruthy();
  await component.checkKeyOfJson(responseBody.data, [
    "id",
    "email",
    "first_name",
    "last_name",
    "avatar",
  ]);
});

  test(`Update user (PUT)`, async ({ request }) => {
    const response = await request.put(`/api/users/1`);
    await expect(response.status()).toBe(200);
    const responseBody = await response.json();
    await expect(responseBody).toBeTruthy();
    await component.checkKeyOfJson(responseBody, ["updatedAt"]);
  });

  test(`Update user (PATCH)`, async ({ request }) => {
    const response = await request.patch(`/api/users/1`);
    await expect(response.status()).toBe(200);
    const responseBody = await response.json();
    await expect(responseBody).toBeTruthy();
    await component.checkKeyOfJson(responseBody, ["updatedAt"]);
  });

  test(`Delete user`, async ({ request }) => {
    const response = await request.delete(`/api/users/1`);
    await expect(response.status()).toBe(204);
  });
