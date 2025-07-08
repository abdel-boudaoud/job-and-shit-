const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

let file = `./files/non profit  - sites only.csv`;
let data = fs.readFileSync(file, "utf-8");

let cleanEmail = (email) => {
  let tlds = [".org", ".com", ".net", ".cpa", ".pro"];

  for (let i = 0; i < tlds.length; i++) {
    if (email.includes(tlds[i])) {
      return `${email.substring(0, email.indexOf(tlds[i]) + 4)}\n`;
    }
  }
};

const sites = data.split("\r\n");
async function getEmails(site) {
  try {
    const res = await axios.get(site, {
      timeout: 35000,
    });

    const $ = cheerio.load(res.data);

    const email = `${$('a[href^="mailto:"]')
      .text()
      .trim()
      .replace(/\s/g, "")}\n`;
    if (email.length > 2 && email.length < 40 && email.includes("@")) {
      fs.appendFile("emails", cleanEmail(email), (err) => {
        if (err) {
          return err;
        }
      });
    } else {
      return 0;
    }
  } catch (err) {
    return err;
  }
}
async function main() {
  for (const site of sites) {
    if (!site) continue;

    const success = await getEmails(site.trim());
    if (!success) {
      fs.appendFile("sitesWOemails", `${site}\n`, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }
}

main();
