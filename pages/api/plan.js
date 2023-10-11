require('dotenv').config()
import { OpenAI } from 'langchain/llms/openai';

const openai = new OpenAI({
  openAIApiKey: process.env.NEXT_OPENAI_API,
  maxTokens: 3097,
  tiktokenModelName: "gpt-4",
  temperature: 0// defaults to process.env["OPENAI_API_KEY"]
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const requiredParams = ['destination', 'budget', 'activity', 'interest', 'startDate', 'endDate', 'sideNote'];

    // Check if all required parameters are present in req.body
    const missingParams = requiredParams.filter(param => !(param in req.body));

    if (missingParams.length > 0) {
      res.status(400).json({ error: `Missing required parameters: ${missingParams.join(', ')}` });
      return;
    }

    const response = await openai.predict(
    `
      You are a specialized travel planner. Generate an itinerary for a trip based on the provided details. Your response should be in JSON format as follows:

      {
        "itinerary": [
          {
            "day": 1, 
            "title": "title representing the activities for the day",
            "description": ["first activity description","second activity description"],
            "cost": "description of the cost breakdown for the day, at least an estimate.",
            "contact": [{"name": "name of place", "number": "phone number"}]
          }
        ]
      }

      Now, here are the trip details:

      - Destination: ${req.body.destination}
      - Budget: ${req.body.budget}
      - Activity Level: ${req.body.activity}
      - Emphasis on: ${req.body.interest}
      - Travel Dates: ${req.body.startDate} to ${req.body.endDate}
      - Note: ${req.body.sideNote}

      Each day should comprise at least two activities, last until 11pm, and include specific names, phone numbers, and reasons for visiting. If any information is missing, use the same format but include the error in the 'description' field.
    `);
    const data = response
    console.log(data)
    res.status(200).json({ data })
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
