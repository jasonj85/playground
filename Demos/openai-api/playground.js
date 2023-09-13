import readline from "readline";
import { generateChatCompletion } from "./controllers/chatCompletionController.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter the prompt to Send for GPT3.5 ChatCompletion Model: \n",
  (user_role_content) => {
    generateChatCompletion(user_role_content);
  }
);
