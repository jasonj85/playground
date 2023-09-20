import readline from "readline";
import { generateChatCompletion } from "./controllers/chatCompletionController.js";
import { generateImage } from "./controllers/imageController.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// START: image generation example
rl.question("Image description: \n", (prompt) => {
  generateImage(prompt);
});

// END: image generation example

// START: chat completion example
// rl.question(
//   "Enter the prompt to Send for GPT3.5 ChatCompletion Model: \n",
//   (user_role_content) => {
//     generateChatCompletion(user_role_content);
//   }
// );
// END: chat completion example
