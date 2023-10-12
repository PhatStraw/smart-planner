import { openAiExtract } from '../../utils/OpenAIExtract.js';
export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method === 'GET') {
    try {
      const response = await openAiExtract.predict(
        `
        You are a specialized travel planner. Generate an itinerary for a random 7 day trip to wherever in the world. Your response should be in JSON format as follows:

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

        Each day should comprise at least two activities, last until 11pm, and include specific names, phone numbers, and reasons for visiting. If any information is missing, use the same format but include the error in the 'description' field.
      `);
      const data = response
      console.log(data)
      return Response.json({ data })

    } catch (error) {
      return Response.json({ error });
    }
  } else {
    return Response.json({ error: 'Method not allowed' });
  }
}
