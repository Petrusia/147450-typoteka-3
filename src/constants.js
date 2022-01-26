'use strict';

const API_PREFIX = `/api`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 3000;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  error: 1,
  success: 0,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const path = require(`path`);
const ANNOUNCE_LENGTH = 5;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_PATH = path.join(__dirname, `../../../${FILE_NAME}`);
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 4;
const MAX_COMMENTS_SENTENCES = 4;
const MAX_ID_LENGTH = 6;
const MONTH_RANGE = 3;


module.exports = {
  ExitCode,
  HttpCode,
  ANNOUNCE_LENGTH,
  API_PREFIX,
  DEFAULT_COMMAND,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  FILE_NAME,
  FILE_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  MAX_COUNT,
  MAX_COMMENTS,
  MAX_COMMENTS_SENTENCES,
  MAX_ID_LENGTH,
  MONTH_RANGE,
  USER_ARGV_INDEX,
};

