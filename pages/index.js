import Head from 'next/head'
import ky from 'ky';
import Loader from 'components/components/loader';
import Nav from 'components/components/nav';
import SideBar from 'components/components/sidebar';
import toast, { Toaster } from 'react-hot-toast';
import PlanCard from 'components/components/card';
import React, { useEffect, useMemo, useState } from "react";

const welcome =  [
      {
        "day": 1, 
        "title": "Exploring the City",
        "description": ["Visit the National Museum of Natural History to learn about the history of the city and its culture","Take a walking tour of the city to explore the local architecture and landmarks"],
        "cost": "Admission to the museum is free, walking tour is $20 per person",
        "contact": [{"name": "National Museum of Natural History", "number": "123-456-7890"}]
      },
      {
        "day": 2, 
        "title": "Beach Day",
        "description": ["Spend the day at the beach, swimming and sunbathing","Visit the local seafood restaurant for dinner"],
        "cost": "Beach admission is free, dinner is $30 per person",
        "contact": [{"name": "Seafood Restaurant", "number": "098-765-4321"}]
      },
      {
        "day": 3, 
        "title": "Hiking and Shopping",
        "description": ["Go on a morning hike to explore the local nature","Visit the local market to shop for souvenirs"],
        "cost": "Hiking is free, shopping is variable",
        "contact": [{"name": "Local Market", "number": "111-222-3333"}]
      },
      {
        "day": 4, 
        "title": "Cultural Day",
        "description": ["Visit the local art museum to learn about the city's culture","Attend a traditional dance performance in the evening"],
        "cost": "Admission to the museum is free, dance performance is $25 per person",
        "contact": [{"name": "Art Museum", "number": "444-555-6666"}, {"name": "Dance Performance", "number": "777-888-9999"}]
      },
      {
        "day": 5, 
        "title": "Day Trip",
        "description": ["Take a day trip to a nearby city to explore its attractions","Visit a local winery for a wine tasting"],
        "cost": "Transportation to the city is $50 per person, wine tasting is $20 per person",
        "contact": [{"name": "Local Winery", "number": "000-111-2222"}]
      },
      {
        "day": 6, 
        "title": "Relaxation Day",
        "description": ["Spend the day relaxing at the hotel spa","Visit a local restaurant for dinner"],
        "cost": "Spa treatments are $50 per person, dinner is $30 per person",
        "contact": [{"name": "Hotel Spa", "number": "333-444-5555"}, {"name": "Local Restaurant", "number": "666-777-8888"}]
      },
      {
        "day": 7, 
        "title": "Farewell Day",
        "description": ["Visit the local park for a picnic lunch","Visit the airport for departure"],
        "cost": "Picnic lunch is free, airport transportation is $20 per person",
        "contact": [{"name": "Local Park", "number": "999-000-1111"}]
      }
    ]

function Home() {
  const [destination, setDestination] = useState()
  const [activity, setActivity] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState()
  const [interest, setInterest] = useState([])
  const [sideNote, setSideNote] = useState(" ")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState()


  const makePlans = () => {
    // Wrapping the async operation in a promise
    const planPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const response = await ky.post("/api/plan", {
          timeout: 60000,
          json: {
            destination, activity, startDate, endDate,
            budget, interest, sideNote
          }
        }).json();
        console.log(response)
        setLoading(false);
        const data = JSON.parse(response.data).itinerary;
        setPlan(data);
        resolve();  // Resolving the promise if everything goes well
      } catch (error) {
        setLoading(false);
        console.log(error)
        reject(error);  // Rejecting the promise if there's an error
      }
    });

    // Passing the promise to toast.promise
    toast.promise(
      planPromise,
      {
        loading: 'Planning...',
        success: <b>Plans saved!</b>,
        error: <b>Could not plan.</b>,
      }
    );
  };

  return (

    <div className="flex flex-no-wrap">
      {/* <!-- Sidebar starts -->*/}
      <SideBar
        makePlans={makePlans}
        setActivity={setActivity}
        setDestination={setDestination}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        setBudget={setBudget}
        setInterest={setInterest}
        interest={interest}
        setSideNote={setSideNote}
      />
      {/* <!-- Sidebar ends -->*/}
      <div className="container mx-auto py-10 h-[100vh] md:w-4/5 w-11/12 overflow-hidden">
        <div className="w-full h-[100%] rounded">
        <h3 className='w-full text-center text-5xl md:hidden'>Smart Travel</h3>
          <div className="container mx-auto py-10 h-full md:w-4/5 w-11/12 px-6 overflow-hidden overflow-y-auto">
            {!loading ? (
              <div className="w-full flex flex-col flex-grow  overflow-auto mb-2 text-white">
                {!plan ? (
                  <>
                    {!welcome ? (<div className='flex flex-col justify-center h-full w-full text-white'>
                      <h1 className='text-center text-xl lg:text-2xl'>
                        Welcome To Smart Travel: The AI Travel Planner!
                      </h1>
                      <br></br>
                      <div className='text-center  text-xl lg:text-xl'>Select the options to your left...</div>
                    </div>) : (
                      welcome.map((i) => (
                        <PlanCard key={i.day} day={i.day} title={i.title} description={i.description} cost={i.cost} contact={i.contact} number={i.number} />
                      ))
                    )}
                  </>
                ) : plan.map((i) => (
                  <PlanCard key={i.day} day={i.day} title={i.title} description={i.description} cost={i.cost} contact={i.contact} number={i.number} />
                ))}
              </div>) : (
              <Loader type="balls" color="white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
