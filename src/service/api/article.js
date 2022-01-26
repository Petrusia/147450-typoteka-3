'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const articleExists = require(`../middlewares/article-exists`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);


module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  // GET

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found article with id ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    return res.status(HttpCode.OK).json(comments);
  });

  // POST

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res
      .status(HttpCode.CREATED)
      .json(article);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const newComment = commentService.create(article, req.body);

    return res.status(HttpCode.CREATED).json(newComment);
  });

  // PUT

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const existsArticle = articleService.findOne(articleId);

    if (!existsArticle) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found article with id ${articleId}`);
    }

    const updatedArticle = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK).json(updatedArticle);
  });

  // DELETE

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleService.drop(articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id ${articleId}`);
    }

    return res.status(HttpCode.OK).json(deletedArticle);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });
};
