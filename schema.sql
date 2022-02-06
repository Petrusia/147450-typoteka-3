-- * Напишите SQL для создания новой базы данных; *
-- drop database if exists big_library;
-- CREATE DATABASE big_library
--   WITH
--   OWNER = petras
--   ENCODING = 'UTF8'
--   TEMPLATE = template0
--   LC_COLLATE = 'C'
--   LC_CTYPE = 'C'
--   CONNECTION LIMIT = -1;


-- Напишите SQL для создания всех необходимых таблиц.
-- Помните, в каждой таблице должен быть первичный ключ;
DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories
(
  id   integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) NOT NULL
);

-- Добавьте уникальные индексы полям, где должны быть только уникальные значения;
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
  id            integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name    varchar(255)        NOT NULL,
  last_name     varchar(255)        NOT NULL,
  email         varchar(255) UNIQUE NOT NULL,
  avatar        varchar(50)         NOT NULL,
  password_hash varchar(255)        NOT NULL
);

DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles
(
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title      varchar(255) NOT NULL,
  announce   varchar(255) NOT NULL,
  full_text  text         NOT NULL,
  picture    varchar(50)  NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  user_id    integer      NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments
(
  id         integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text       text    NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  user_id    integer NOT NULL,
  article_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS articles_categories CASCADE;
CREATE TABLE articles_categories
(
  article_id  integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Добавьте обычные индексы полям, по которым будет происходить поиск;
CREATE INDEX ON articles (title);


