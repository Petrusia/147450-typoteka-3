'use strict';

const express = require(`express`);
const path = require(`path`);

const {HttpCode, PUBLIC_DIR, UPLOAD_DIR, DEFAULT_FRONT_PORT} = require(`../constants`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);


app.use((req, res) => res.status(HttpCode.NOT_FOUND).render(`errors/404`));
app.use((err, req, res, _next) => {
  console.log(err.message);
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.listen(DEFAULT_FRONT_PORT, () => console.log(`Сервер работает на ${DEFAULT_FRONT_PORT}`));
