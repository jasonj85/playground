const http = require("http");

dogs = [
  {
    id: 1,
    breed: "Terrier",
  },
  {
    id: 2,
    breed: "Doberman",
  },
];

const server = http.createServer((req, res) => {
  const items = req.url.split("/");

  // GET
  if (req.method === "GET") {
    if (items[1] === "test") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("test here");
    } else if (items[1] === "dogs") {
      res.writeHead(200, { "Content-Type": "application/json" });
      if (items.length === 3) {
        const id = Number(items[2]);
        res.write(JSON.stringify(dogs[id - 1]));
      } else res.write(JSON.stringify(dogs));
    }
  }
  // POST
  else if (req.method === "POST") {
    if (items[1] === "dogs") {
      req.on("data", (data) => {
        const dog = data.toString();
        console.log("Request:", dog);
        dogs.push(JSON.parse(dog));
      });

      req.pipe(res);
    }
  }

  // res.end();
});

server.listen(3000, () => console.log("listening on port 3000!"));
