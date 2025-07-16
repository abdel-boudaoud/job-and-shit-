const fs = require("fs");

const file = fs.readFileSync("./homesmart/agents.json", "utf-8", (err) => {
  if (err) {
    console.log(err);
  }
});

let list = JSON.parse(file);

for (agent of list.agents) {
  console.log(agent.fld_userDetails_Email);
}
