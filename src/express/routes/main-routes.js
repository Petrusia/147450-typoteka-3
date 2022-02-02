
'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  const categories = await api.getCategories();
  res.render(`main`, {articles, categories});
});

mainRouter.get(`/register`, (req, res) => res.render(`auth/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`auth/login`));
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;
    const results = await api.search(query);

    res.render(`search`, {
      results
    });
  } catch (error) {
    res.render(`search`, {
      results: []
    });
  }
});

mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));
module.exports = mainRouter;
