import { OpenAI } from 'langchain/llms/openai';

export const openAiExtract = new OpenAI({
  openAIApiKey: process.env.NEXT_OPENAI_API,
  maxTokens: 3097,
  tiktokenModelName: "gpt-4",
  temperature: 0// defaults to process.env["OPENAI_API_KEY"]
});