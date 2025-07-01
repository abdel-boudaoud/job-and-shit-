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

let data = fs.readFileSync("./Alabama CPA - sites only.csv", "utf-8");

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
      if (email.length > 2 && email.includes("@")) {
        fs.appendFile("emails", cleanEmail(email), (err) => {
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
// const sites = data.split("\r\n");
// async function getEmails(site) {
//   try {
//     const res = await axios.get(site, {
//       timeout: 60000,
//     });

//     const $ = cheerio.load(res.data);

//     const email = `${$('a[href^="mailto:"]')
//       .text()
//       .trim()
//       .replace(/\s/g, "")}\n`;
//     if (email.length > 2 && email.includes("@")) {
//       fs.appendFile("emails", email, (err) => {
//         if (err) {
//           return err;
//         }
//       });
//     } else {
//       return 0;
//     }
//   } catch (err) {
//     console.log(err);

//   }
// }
// async function main (){
// for (const site of sites) {
//         if (!site) continue; // Skip any empty lines if filter wasn't perfect

//         // This is the crucial change: await the getEmails function call
//         // This makes the loop sequential, waiting for each site to finish or timeout
//         const success = await getEmails(site.trim()); // trim site just in case

//         // You might want a small delay *between* sites even if they succeed/fail quickly
//         // to be polite to servers. Uncomment and adjust if needed:
//         // await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
//     }

// }

// main()
