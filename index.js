const axios = require("axios");

const fs = require("fs");

const cheerio = require("cheerio");

data = fs.readFileSync("./Alabama CPA - sites only.csv", "utf-8");

data.split("\r\n").forEach((site) => {
  axios
    .get(site)
    .then((res) => {
      return res;
    })
    .then((data) => {
      let rawHtml = data.data;
      const $ = cheerio.load(rawHtml);
      console.log(site);

      let email = `${$('a[href^="mailto:"]')
        .text()
        .trim()
        .replace(/\s/g, "")}\n`;
      if (email.length > 2) {
        fs.appendFile("emails", email, (err) => {
          if (err) {
            return err;
          }
        });
      }
    })
    .catch((err) => {
      return 0;
    });
});
