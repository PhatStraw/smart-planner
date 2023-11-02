import { OpenAI } from 'langchain/llms/openai';

export const openAiExtract = new OpenAI({
  openAIApiKey: process.env.NEXT_OPENAI_API,
  tiktokenModelName: "gpt-3.5-turbo-16k",
  temperature: 0// defaults to process.env["OPENAI_API_KEY"]
});