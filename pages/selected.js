import ky from 'ky';
import Loader from 'components/components/loader';
import toast from 'react-hot-toast';
import PlanCard from 'components/components/PlanCard';
import React, { useEffect, useState } from "react";
import NavBar from 'components/components/navbar/newNav';
import { useRouter } from 'next/router'
import usePlans from 'components/hooks/usePlans';
import Link from 'next/link';

const welcome =  [
      {
        "day": 1, 
        "title": "Exploring the City",
        "description": ["Visit the National Museum of Natural History to learn about the history of the city and its culture","Take a walking tour of the city to explore the local architecture and landmarks"],
        "cost": "Admission to the museum is free, walking tour is $20 per person",
        "contact": [{"name": "National Museum of Natural History", "number": "123-456-7890"}],
        // "image": await getPhotos()
      },
      {
        "day": 2, 
        "title": "Beach Day",
        "description": ["Spend the day at the beach, swimming and sunbathing","Visit the local seafood restaurant for dinner"],
        "cost": "Beach admission is free, dinner is $30 per person",
        "contact": [{"name": "Seafood Restaurant", "number": "098-765-4321"}],
        // "image": await getPhotos()
      },
      {
        "day": 3, 
        "title": "Hiking and Shopping",
        "description": ["Go on a morning hike to explore the local nature","Visit the local market to shop for souvenirs"],
        "cost": "Hiking is free, shopping is variable",
        "contact": [{"name": "Local Market", "number": "111-222-3333"}],
        // "image": await getPhotos()
      },
      {
        "day": 4, 
        "title": "Cultural Day",
        "description": ["Visit the local art museum to learn about the city's culture","Attend a traditional dance performance in the evening"],
        "cost": "Admission to the museum is free, dance performance is $25 per person",
        "contact": [{"name": "Art Museum", "number": "444-555-6666"}, {"name": "Dance Performance", "number": "777-888-9999"}],
        // "image": await getPhotos()
      },
      {
        "day": 5, 
        "title": "Day Trip",
        "description": ["Take a day trip to a nearby city to explore its attractions","Visit a local winery for a wine tasting"],
        "cost": "Transportation to the city is $50 per person, wine tasting is $20 per person",
        "contact": [{"name": "Local Winery", "number": "000-111-2222"}],
        // "image": await getPhotos()
      },
      {
        "day": 6, 
        "title": "Relaxation Day",
        "description": ["Spend the day relaxing at the hotel spa","Visit a local restaurant for dinner"],
        "cost": "Spa treatments are $50 per person, dinner is $30 per person",
        "contact": [{"name": "Hotel Spa", "number": "333-444-5555"}, {"name": "Local Restaurant", "number": "666-777-8888"}],
        // "image": await getPhotos()
      },
      {
        "day": 7, 
        "title": "Farewell Day",
        "description": ["Visit the local park for a picnic lunch","Visit the airport for departure"],
        "cost": "Picnic lunch is free, airport transportation is $20 per person",
        "contact": [{"name": "Local Park", "number": "999-000-1111"}],
        // "image": await getPhotos()
      }
    ]

function Home() {
  const router = useRouter()
  const queryParams = router.query
  const [loading, setLoading] = useState(false)
  const plansState = usePlans()
console.log(plansState)
  return (

    <div className="w-[100vw]">
      <NavBar />
      <div className="pt-20 px-5 w-[100%] h-full overflow-hidden ">
            {plansState.selectedPlan.itinerary.length > 0 ? (
                plansState.selectedPlan.itinerary.map((plan)=>(
                    <div>{plan.title}</div>
                ))
            ) : (
                <div>No plan</div>
            )}
        </div>
    </div>
  );

}

export default Home;
