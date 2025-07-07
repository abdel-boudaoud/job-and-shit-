const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");


let cleanEmail = (email) => {
  let tlds = [".org", ".com", ".net", ".cpa", ".pro"];

  for (let i = 0; i < tlds.length; i++) {
    if (email.includes(tlds[i])) {
      return `${email.substring(0, email.indexOf(tlds[i]) + 4)}\n`;
    }
  }
};


let file = `./files/non profit  - sites only.csv`;
let data = fs.readFileSync(file, "utf-8");



data.split("\r\n").forEach((site) => {
  axios
    .get(site, {
      timeout: 60000,
    })
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
      if (email.length > 2 && email.length < 40 && email.includes("@")) {
        fs.appendFile("emailsAl", cleanEmail(email), (err) => {
          if (err) {
            return err;
          }
        });
      } else {
        return 0;
      }
    })
    .catch((err) => {
      return 0;
    });
});

