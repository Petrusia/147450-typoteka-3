'use strict';

const path = require(`path`);

const DEFAULT_COUNT = 1;
const DEFAULT_PORT = 3000;
const MAX_COUNT = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ANNOUNCE_LENGTH = 5;
const MONTH_RANGE = 3;
const FILE_NAME = `mocks.json`;
const ExitCode = {
  success: 0,
  error: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};


const FILE_PATH = path.join(__dirname, `../../../${FILE_NAME}`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

module.exports = {
  DEFAULT_COUNT,
  DEFAULT_PORT,
  MAX_COUNT,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  ANNOUNCE_LENGTH,
  MONTH_RANGE,
  FILE_NAME,
  FILE_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
};

