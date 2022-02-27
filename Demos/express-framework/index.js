const express = require("express");
const path = require("path");

const carsRouter = require("./routes/cars.router");

const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

// middleware
app.use((req, res, next) => {
  const start = Date.now();
  next();

  const duration = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${duration}ms`);
});

app.use(express.static("public"));
app.use(express.json());

// routes

app.use("/cars", carsRouter);

// requests
app.get("/", (req, res) => {
  return res.render("index", {
    title: "This is my great website",
    caption: "Here is the caption for this page",
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
