const express = require("express");
const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // block the event loop
  }
}

app.get("/", (req, res) => {
  res.send("Performance example");
});

app.get("/timer", (req, res) => {
  // delay response
  delay(3000);
  res.send(`timer ended!!!! PID=${process.pid}`);
});

console.log("worker process started");
app.listen(3000);
