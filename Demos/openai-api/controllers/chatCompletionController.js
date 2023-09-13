import { openai } from "../config/openaiConfig.js";

export const generateChatCompletion = async (user_role_content) => {
  const system_role_content =
    'You will reply as concisely as you can. If you are not sure about an answer, you will respond with "Sorry I\'m not sure"';

  const messages = [
    { "role": "system", "content": system_role_content },
    { "role": "user", "content": user_role_content },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.5,
    max_tokens: 512,
  });

  console.log(response.choices[0].message.content);
};
