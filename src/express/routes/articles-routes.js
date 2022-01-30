'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();
const path = require(`path`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const api = require(`../api`).getAPI();
const {HttpCode} = require(`../../constants`);

const UPLOAD_IMG_DIR = `../upload/img`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_IMG_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});


articlesRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`articles/add-post`, {article: {}, categories});
});

articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const newArticleData = {
    title: body.title,
    createdDate: body.date,
    announce: body.announcement,
    fullText: body[`full-text`],
    category: Object.keys(body.category),
    picture: file ? file.filename : ``
  };

  try {
    await api.createArticle(newArticleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  try {
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories(),
    ]);
    return res.render(`articles/add-post`, {article, categories});
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND).render(`errors/404`);
  }

});
articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`articles/post-detail`, {article});
});

module.exports = articlesRouter;
