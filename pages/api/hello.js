require('dotenv').config()
import { OpenAI } from 'langchain/llms/openai';

const openai = new OpenAI({
  openAIApiKey: process.env.NEXT_OPENAI_API,
  maxTokens: 3097,
  tiktokenModelName: "gpt-4"// defaults to process.env["OPENAI_API_KEY"]
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await openai.predict(
    `Act as a specialized travel planner. Utilize the provided trip details to craft a meticulously designed itinerary. 
     Your response should feature daily activities, ensuring a rich experience. 
     Include specific names of venues, establishments, and attractions. 
     Each day should comprise at least two distinct activities if applicable with reccomendations to specefic places with phone number and any other information needed to make a reservation and explain why these places are worth visiting. 
     Ascertain the validity of your response as a JSON object with no extraneous whitespace or newline characters. 
     Adhere to the following format: {"itinerary": [{"day": 1, "activity": "planned activity"}]}. 
     Respond solely in JSON format, refraining from additional commentary.
    
     Here are the trip details: 
     1. Plan a journey to ${req.body.destination} 
     2. within a budget of ${req.body.budget} 
     3. Tailor the experience to a ${req.body.activity} level of activity 
     4. emphasizing ${req.body.interest} 
     5. The travel period spans from ${req.body.startDate} to ${req.body.endDate} 
     6. Incorporate the following note: ${req.body.sideNote}

     if any of the steps above is missing information send a repsonse in the same format but add the error to the activity value.
    `);
    const data = response
    console.log(data)
    res.status(200).json({ data })
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
