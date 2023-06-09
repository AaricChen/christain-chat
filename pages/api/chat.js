import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default async function (req, res) {
  const messages = req.body.messages;
  if (messages) {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a helpful assistant." }, ...messages],
    });
    if (completion.data.choices) {
      res.status(200).json({ result: completion.data.choices[0].message.content });
    } else {
      res.status(200).json({ result: "" });
    }
  } else {
    res.status(200).json({ result: "" });
  }
}
