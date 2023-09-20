import { openai } from "../config/openaiConfig.js";
import fs from "fs";
import axios from "axios";

export const generateImage = async (prompt) => {
  const image = await openai.images.generate({
    prompt,
    size: "1024x1024",
    n: 1,
    response_format: "url",
  });

  console.log(image);
  console.log(image.data.url);

  const imageUrl = image.data[0].url;
  const outputPath = "./images/testimage.png";

  if (imageUrl) {
    saveImageToPng(imageUrl, outputPath);
  }

  async function saveImageToPng(imageUrl, outputPath) {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(outputPath, Buffer.from(response.data, "binary"));
      console.log("Image saved!");
    } catch (error) {
      console.error("Error saving image: " + error);
    }
  }
};
