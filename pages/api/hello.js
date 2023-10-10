require('dotenv').config()
import { OpenAI } from 'langchain/llms/openai';

const openai = new OpenAI({
  openAIApiKey: process.env.NEXT_OPENAI_API, // defaults to process.env["OPENAI_API_KEY"]
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await openai.predict(
    `Act as a specialized travel planner. Utilize the provided trip details to craft a meticulously designed itinerary. 
     Your response should feature daily activities, ensuring a rich experience. 
     Include specific names of venues, establishments, and attractions. 
     Each day should comprise at least two distinct activities. 
     Ascertain the validity of your response as a JSON object with no extraneous whitespace or newline characters. 
     Adhere to the following format: {"itinerary": [{"day": 1, "activity": "planned activity"}]}. 
     Respond solely in JSON format, refraining from additional commentary.
    
     Here are the trip details: 
     Plan a journey to ${req.body.destination}, 
     within a budget of ${req.body.budget}. 
     Tailor the experience to a ${req.body.activity} level of activity, 
     emphasizing ${req.body.interest}. 
     The travel period spans from ${req.body.startDate} to ${req.body.endDate}. 
     Incorporate the following note: ${req.body.sideNote}.
    `);
    const data = response
    console.log(data)
    res.status(200).json({ data })
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
