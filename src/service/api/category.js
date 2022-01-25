'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../cli/constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/category`, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();

    return res.status(HttpCode.OK).json(categories);
  });
};
