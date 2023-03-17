import { NextApiHandler } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

const handler: NextApiHandler = async (request, response) => {
  switch (request.method) {
    case "GET": {
      const api_response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that is an expert in the PLR niche. You have sold over 10 million dollars with digital marketing and PLR niche.",
          },
          {
            role: "user",
            content:
              "What is the most lucrative niche to start in PLRs? Give me one answer and no explanations",
          },
        ],
        max_tokens: 512,
      });

      console.log(JSON.stringify(api_response.data));

      const { choices } = api_response.data;

      console.log(choices);

      return response.send({ choices });
    }
  }
};

export default handler;
