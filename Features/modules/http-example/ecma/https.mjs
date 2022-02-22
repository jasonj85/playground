import { send } from "./request.mjs";
import { read } from "./response.mjs";

function request(url, data) {
  send(url, data);
  return read();
}

const responseData = request("https://google.com", "yo bro!");
console.log(responseData);
