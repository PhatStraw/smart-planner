import { openAiExtract } from '../../utils/OpenAIExtract.js';
export const config = {
  runtime: "edge",
};

export async function getPhotos(query) {
  const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.NEXT_UNSPLASH_ACCESS}`);

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  
  const data = await response.json();
  return data.urls.regular;
}

export default async function handler(req) {
  const body = await req.json()
  if (req.method === 'POST') {
    try {
      const requiredParams = ['destination', 'budget', 'activity', 'interest', 'startDate', 'endDate', 'sideNote'];
  
      // Check if all required parameters are present in body
      const missingParams = requiredParams.filter(param => !(param in body));
  
      if (missingParams.length > 0) {
        return Response.json({ error: `Missing required parameters: ${missingParams.join(', ')}` });
      }
      
      const response = await openAiExtract.predict(
        `
        You are a specialized travel planner. Generate multiple plans for the user to choose from this includes an itinerary for the trip based on the provided details. Your response should be in JSON format as follows:

          [  
            {
              "Option": 1,
              "title": "Something describing the trip",
              "total: "estimated total cost for this trip"
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
          ]

        Now, here are the trip details:

        - Destination: ${body.destination}
        - Budget: ${body.budget}
        - Activity Level: ${body.activity}
        - Emphasis on: ${body.interest}
        - Travel Dates: ${body.startDate} to ${body.endDate}
        - Note: ${body.sideNote}

        Each day should comprise at least two activities, last until 11pm, and include specific names, phone numbers, and reasons for visiting. If any information is missing, use the same format but include the error in the 'description' field.
      `);
console.log('62')
      const data = JSON.parse(response);
      const final = await Promise.all(data.map(async (element) => ({ ...element, image: await getPhotos(element.title) })));

      return Response.json({ data: final });

    } catch (error) {
      return Response.error({ error });
    }
  } else {
    return Response.error({ error: 'Method not allowed' });
  }
}
