"use strict";

const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode, mockData} = require(`../../constants`);


const app = express();
app.use(express.json());
search(app, new DataService(mockData));

// eslint-disable-next-line no-undef
describe(`API returns offer based on search query`, () => {
  let response;

  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `Что такое золотое сечение`
    });
  });

  // eslint-disable-next-line no-undef
  test(`Status code is 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  // eslint-disable-next-line no-undef
  test(`1 article found`, () => expect(response.body.length).toBe(1));

  // eslint-disable-next-line no-undef
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`l8tmwH`));
});

// eslint-disable-next-line no-undef
test(`API returns code 404 if nothing is found`,
    () => request(app).get(`/search`).query({
      query: `lorem ipsum`
    }).expect(HttpCode.NOT_FOUND)
);

// eslint-disable-next-line no-undef
test(`API returns 400 when query string is absent`,
    () => request(app).get(`/search`).expect(HttpCode.BAD_REQUEST)
);
