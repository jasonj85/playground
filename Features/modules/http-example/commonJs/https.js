const req = require("./request");
const res = require("./response");

function request(url, data) {
  req.send(url, data);
  return res.read();
}

const responseData = request("https://google.com", "yo bro!");
console.log(responseData);
