const sites = data.split("\r\n");
async function getEmails(site) {
  try {
    const res = await axios.get(site, {
      timeout: 60000,
    });

    const $ = cheerio.load(res.data);

    const email = `${$('a[href^="mailto:"]')
      .text()
      .trim()
      .replace(/\s/g, "")}\n`;
    if (email.length > 2 && email.includes("@")) {
      fs.appendFile("emails", email, (err) => {
        if (err) {
          return err;
        }
      });
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
  }
}
async function main() {
  for (const site of sites) {
    if (!site) continue;

    const success = await getEmails(site.trim());
  }
}

main();
