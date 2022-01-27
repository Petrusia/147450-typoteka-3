/* eslint-disable no-undef */
'use strict';

const express = require(`express`);
const request = require(`supertest`);
const category = require(`./category`);
const CategoryService = require(`../data-service/category`);
const {HttpCode, mockData} = require(`../../constants`);

const app = express();
app.use(express.json());
category(app, new CategoryService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 9 categories`, () => expect(response.body.length).toBe(9));
  test(`Category names are "Программирование", "Музыка", "IT", "За жизнь", "Деревья", "Кино", "Без рамки", "Железо", "Разное",`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([
            `Программирование`,
            `Музыка`,
            `IT`,
            `За жизнь`,
            `Деревья`,
            `Кино`,
            `Без рамки`,
            `Железо`,
            `Разное`,
          ]),
      )
  );
});


