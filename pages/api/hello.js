import 'dotenv/config'
import Head from 'next/head'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API, // defaults to process.env["OPENAI_API_KEY"]
});

export default async function handler (req, res)  {
  const response = await openai.predict(`Plan my trip to ${req.body.destination}. My budget is ${req.body.budget}, and I prefer a ${req.body.activity} level experience with a focus on ${req.body.interest}. I will be traveling from ${req.body.startDate} to ${req.body.endDate}. Also take this into consideration: ${req.body.sideNote}`);
  const data = response.data.response
  res.status(200).send(data)
}
