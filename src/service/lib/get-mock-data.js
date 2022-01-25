'use strict';

const fs = require(`fs`).promises;
const {FILE_PATH} = require(`../cli/constants`);
let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_PATH);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
  }

  return data;
};

module.exports = getMockData;
