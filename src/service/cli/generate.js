'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  MAX_COUNT,
  ExitCode,
  ANNOUNCE_LENGTH,
  MONTH_RANGE,
  FILE_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
} = require(`./constants`);


const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date?rq=1
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, `0`);
  const day = `${date.getDate()}`.padStart(2, `0`);
  const hours = `${date.getHours()}`.padStart(2, `0`);
  const minutes = `${date.getMinutes()}`.padStart(2, `0`);
  const seconds = `${date.getSeconds()}`.padStart(2, `0`);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const generateOffers = (count, titles, sentences, categories) => (
  Array(count).fill({}).map(() => {
    const title = titles[getRandomInt(0, titles.length - 1)];
    const announce = shuffle(sentences).slice(1, ANNOUNCE_LENGTH).join(` `);
    const fullText = shuffle(sentences).slice(1, getRandomInt(1, sentences.length - 1)).join(` `);
    const category = shuffle(categories).slice(0, getRandomInt(1, categories.length - 1));

    const todayDate = new Date();
    const startDate = new Date(new Date().setMonth(todayDate.getMonth() - MONTH_RANGE));
    const createdDate = formatDate(getRandomDate(startDate, todayDate));

    return ({title, announce, fullText, createdDate, category});
  })
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);


    if (countOffer < 0) {
      console.error(chalk.red(`Введите положительное число.`));
      process.exit(ExitCode.error);
    }

    if (countOffer > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} публикаций.`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, sentences, categories), null, 4);

    try {
      await fs.writeFile(FILE_PATH, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};

