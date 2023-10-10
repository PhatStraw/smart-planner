require('dotenv').config()
import { OpenAI } from 'langchain/llms/openai';

const openai = new OpenAI({
  openAIApiKey: process.env.NEXT_OPENAI_API, // defaults to process.env["OPENAI_API_KEY"]
});

export default async function handler(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const response = await openai.predict(`Act as a professional travel planner. Ill give you details on my trip and respond with detailed plans in the form of an itinerary based around the dates and information I give you. Include names of stores, places and anything else you plan. Be specefic. make sure to include atleast 2 sentences worth of activities per day. Double check your responses to make sure its a valid json object. Your goal is to create the bext imaginable expierience with the data I give you. Provide your response in JSON format only. The format should be a JSON object like {"itinerary": [{"day": 1, "activity": "Take a Visit to the Golden Gate bridge and expience the wonder it has to offer."}]}. Provide no other commentary. Make sure there are no newline characters or spaces in the JSON object response. Plan my trip to ${req.body.destination}. My budget is ${req.body.budget}, and I prefer a ${req.body.activity} level experience with a focus on ${req.body.interest}. I will be traveling from ${req.body.startDate} to ${req.body.endDate}. Also take this into consideration: ${req.body.sideNote}.`);
    const data = response
    console.log("DATA=====",data)
    res.status(200).json({ data })
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
