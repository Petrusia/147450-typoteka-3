'use strict';

const fs = require(`fs`).promises;
const {Router} = require(`express`);
const postsRouter = new Router();
const {FILE_NAME} = require(`../constants`);

postsRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    // Если файла нет, или он пуст — возвращается пустой массив
    res.json([]);
  }
});

module.exports = postsRouter;
