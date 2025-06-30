const axios = require("axios");

const fs = require("fs");

const cheerio = require('cheerio')


data = fs.readFileSync("./sites.csv", "utf-8");


console.log(data.split("\r\n")[50]);
axios
  .get(data.split("\r\n")[65])
  .then((res) => {
    return res;
  })
  .then((data) => {
    let rawHtml = data.data;
    const $ = cheerio.load(rawHtml)
    console.log($('a[href^="mailto:"]').text())


    
  });
