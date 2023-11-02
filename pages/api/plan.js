import { openAiExtract } from '../../utils/OpenAIExtract.js';

export const config = {
  runtime: "edge",
};

export async function getPhotos(query) {
  const urls = []
  const response = await fetch(`https://api.unsplash.com/photos/random?count=3&query=${query}&orientation=squarish&client_id=${process.env.NEXT_UNSPLASH_ACCESS}`);

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  
  const data = await response.json();

  data.forEach(element => {
    urls.push(element.urls.regular)
  });
  return urls;
}

export default async function handler(req) {
  const body = await req.json()
  if (req.method === 'POST') {
    try {
      const requiredParams = ['destination', 'budget', 'startDate', 'endDate', 'sideNote'];
  
      // Check if all required parameters are present in body
      const missingParams = requiredParams.filter(param => !(param in body));
  
      if (missingParams.length > 0) {
        return new Response(JSON.stringify({ error: `Missing required parameters: ${missingParams.join(', ')}` }), { status: 400 });
      }

      const response = await openAiExtract.predict(
        `
        You are a specialized travel planner. Generate multiple plans for the user to choose from this includes an itinerary for the trip based on the provided details. Your response should be in JSON format as follows:

          [  
            {
              "Option": 1,
              "title": "Something describing the trip",
              "total: "estimated total cost for this trip as a whole number."
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
        - Amount of kids under 13yrs old: ${body.childCount}
        - In a budget between: ${body.budget[0]} and  ${body.budget[1]}
        - Pet count: ${body.petCount}
        - My allergies: ${body.interest}
        - Travel Dates: ${body.startDate} to ${body.endDate}
        - Note: ${body.sideNote}

        Each day should comprise at least two activities, last until 11pm, and include specific names, phone numbers, and reasons for visiting. If any information is missing, use the same format but include the error in the 'description' field.
      `);

      const data = JSON.parse(response);
      const final = await Promise.all(data.map(async (element) => ({ ...element, image: await getPhotos(element.title) })));
      console.log(data)
      return new Response(JSON.stringify({ data: final }), { status: 200 });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }
}