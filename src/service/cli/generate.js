'use strict';

const fs = require(`fs`);
const path = require(`path`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  MAX_COUNT,
  ExitCode,
  TITLES,
  SENTENCES,
  ANNOUNCE_LENGTH,
  CATEGORIES,
  MONTH_RANGE,
  FILE_NAME
} = require(`./constants`);


const FILE_PATH = path.join(__dirname, `../../../${FILE_NAME}`);

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

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const title = TITLES[getRandomInt(0, TITLES.length - 1)];
    const announce = shuffle(SENTENCES).slice(1, ANNOUNCE_LENGTH).join(` `);
    const fullText = shuffle(SENTENCES).slice(1, getRandomInt(1, SENTENCES.length - 1)).join(` `);
    const category = shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1));

    const todayDate = new Date();
    const startDate = new Date(new Date().setMonth(todayDate.getMonth() - MONTH_RANGE));
    const createdDate = formatDate(getRandomDate(startDate, todayDate));

    return ({title, announce, fullText, createdDate, category});
  })
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;


    if (countOffer < 0) {
      console.error(`Введите положительное число.`);
      process.exit(ExitCode.error);
    }

    if (countOffer > MAX_COUNT) {
      console.error(`Не больше 1000 публикаций.`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer), null, 4);

    fs.writeFile(FILE_PATH, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }
      console.info(`Operation success. File created.`);
      process.exit(ExitCode.success);
    });
  }
};
