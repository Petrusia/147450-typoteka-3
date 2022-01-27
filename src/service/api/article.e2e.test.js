/* eslint-disable no-undef */
'use strict';

const express = require(`express`);
const request = require(`supertest`);
const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const {HttpCode, mockData} = require(`../../constants`);


const createAPI = () => {
  const app = express();
  app.use(express.json());

  const cloneData = JSON.parse(JSON.stringify(mockData));
  article(app, new ArticleService(cloneData), new CommentService());

  return app;
};

describe(`API returns a list of all articles`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 10 articles`, () => expect(response.body.length).toBe(10));
  test(`First article's id equals "e4S2LO"`, () => expect(response.body[0].id).toBe(`e4S2LO`));
});

describe(`API returns an article with given id`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app).get(`/articles/e4S2LO`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Борьба с прокрастинацией"`, () => {
    expect(response.body.title).toBe(`Борьба с прокрастинацией`);
  });
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `Валидный заголовок`,
    announce: `Валидный анонс`,
    createdDate: `2020-12-28T03:02:03.227Z`,
    category: `Железо`,
    fullText: `Полный текст`
  };

  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => {
    expect(response.body).toEqual(expect.objectContaining(newArticle));
  });
  test(`Articles count is changed`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(11));
  });
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `Валидный заголовок`,
    announce: `Валидный анонс`,
    createdDate: `2020-12-28T03:02:03.227Z`,
    category: `Железо`,
    fullText: `Полный текст`
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];

      await request(app).post(`/articles`).send(badArticle).expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    title: `Валидный заголовок`,
    announce: `Валидный анонс`,
    createdDate: `2020-12-28T03:02:03.227Z`,
    category: `Железо`,
    fullText: `Полный текст`
  };

  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app).put(`/articles/e4S2LO`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => {
    expect(response.body).toEqual(expect.objectContaining(newArticle));
  });
  test(`Article is really changed`, async () => {
    await request(app).get(`/articles/e4S2LO`)
      .expect((res) => expect(res.body.title).toBe(`Валидный заголовок`));
  });
});

test(`API returns status code 404 when trying to change non-existent article`, async () => {
  const newArticle = {
    title: `Валидный заголовок`,
    announce: `Валидный анонс`,
    createdDate: `2020-12-28T03:02:03.227Z`,
    category: `Железо`,
    fullText: `Полный текст`
  };

  const app = createAPI();

  await request(app).put(`/articles/noexists`).send(newArticle).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 404 when trying to change an article with invalid data`, async () => {
  const invalidArticle = {
    title: `Валидный заголовок`,
    announce: `Валидный анонс`,
    category: `Железо`,
    fullText: `Полный текст`
  };

  const app = createAPI();

  await request(app).put(`/articles/e4S2LO`).send(invalidArticle).expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app).delete(`/articles/e4S2LO`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`e4S2LO`));
  test(`Articles count is 9 now`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(9));
  });
});

test(`API returns to delete non-existent article`, async () => {
  const app = createAPI();
  await request(app).delete(`/articles/noexists`).expect(HttpCode.NOT_FOUND);
});

