import express from "express";
import { generateChatCompletion } from "./controllers/chatCompletionController.js";

// set up express app
const app = express();
app.listen(4000, () => console.log("Express app listing on port 4000."));

// set up middleware
app.use(express.json());
app.use(express.static("public"));

// set up routes
app.post("/openai/chatcompletion", generateChatCompletion);
