const EventEmitter = require("events");

const influencer = new EventEmitter();

// subscribe to influencer - lover
influencer.on("instagram", (result) => {
  if (result === "new") {
    console.log("Congratulations! You have created a new post");
  }
});

// subscribe to influencer - hater
influencer.on("instagram", (result) => {
  if (result === "new") {
    console.log("Stop your posts, you suck");
  } else if (result === "delete") {
    console.log(":D");
  }
});

process.on("exit", (code) => {
  console.log(`Process exited with code: ${code}`);
});

console.log(`\n=== Instagram new ===`);
influencer.emit("instagram", "new");

console.log(`\n=== Instagram delete ===`);
influencer.emit("instagram", "delete");
