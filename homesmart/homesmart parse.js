const fs = require("fs");

const file = fs.readFileSync("./homesmart/colorado.json", "utf-8", (err) => {
  if (err) {
    console.log(err);
  }
});

let list = JSON.parse(file);

for (agent of list.agents) {

  fs.appendFile(
    "./homesmart/colorado.csv",
    `${agent.fld_userDetails_FirstName} ${agent.fld_userDetails_LastName} , ${agent.fld_userDetails_Email}\n`,
    (err) => {
      if (err) {
        return 0;
      }
    }
  );
}
