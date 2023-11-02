import ky from "ky";
import Loader from "components/components/loader";
import toast from "react-hot-toast";
import PlanCard from "components/components/PlanCard";
import React, { useEffect, useState } from "react";
import NavBar from "components/components/navbar/newNav";
import { useRouter } from "next/router";
import usePlans from "components/hooks/usePlans";
import Link from "next/link";
import costa from "../public/costa.jpg";
import getStart from "../public/getstart.png";
import Image from "next/image";
const welcome = [
  {
    day: 1,
    title: "Exploring the City",
    description: [
      "Visit the National Museum of Natural History to learn about the history of the city and its culture",
      "Take a walking tour of the city to explore the local architecture and landmarks",
    ],
    cost: "Admission to the museum is free, walking tour is $20 per person",
    contact: [
      { name: "National Museum of Natural History", number: "123-456-7890" },
    ],
    image: [costa.src, costa.src, costa.src],
  },
  {
    day: 2,
    title: "Beach Day",
    description: [
      "Spend the day at the beach, swimming and sunbathing",
      "Visit the local seafood restaurant for dinner",
    ],
    cost: "Beach admission is free, dinner is $30 per person",
    contact: [{ name: "Seafood Restaurant", number: "098-765-4321" }],
    image: [costa.src, costa.src, costa.src],
  },
  {
    day: 3,
    title: "Hiking and Shopping",
    description: [
      "Go on a morning hike to explore the local nature",
      "Visit the local market to shop for souvenirs",
    ],
    cost: "Hiking is free, shopping is variable",
    contact: [{ name: "Local Market", number: "111-222-3333" }],
    image: [costa.src, costa.src, costa.src],
  },
  {
    day: 4,
    title: "Cultural Day",
    description: [
      "Visit the local art museum to learn about the city's culture",
      "Attend a traditional dance performance in the evening",
    ],
    cost: "Admission to the museum is free, dance performance is $25 per person",
    contact: [
      { name: "Art Museum", number: "444-555-6666" },
      { name: "Dance Performance", number: "777-888-9999" },
    ],
    image: [costa.src, costa.src, costa.src],
  },
  {
    day: 5,
    title: "Day Trip",
    description: [
      "Take a day trip to a nearby city to explore its attractions",
      "Visit a local winery for a wine tasting",
    ],
    cost: "Transportation to the city is $50 per person, wine tasting is $20 per person",
    contact: [{ name: "Local Winery", number: "000-111-2222" }],
    image: [costa.src, costa.src, costa.src],
  },
  {
    day: 6,
    title: "Relaxation Day",
    description: [
      "Spend the day relaxing at the hotel spa",
      "Visit a local restaurant for dinner",
    ],
    cost: "Spa treatments are $50 per person, dinner is $30 per person",
    contact: [
      { name: "Hotel Spa", number: "333-444-5555" },
      { name: "Local Restaurant", number: "666-777-8888" },
    ],
    image: [costa.src, costa.src, costa.src],
  },
  {
    day: 7,
    title: "Farewell Day",
    description: [
      "Visit the local park for a picnic lunch",
      "Visit the airport for departure",
    ],
    cost: "Picnic lunch is free, airport transportation is $20 per person",
    contact: [{ name: "Local Park", number: "999-000-1111" }],
    image: [costa.src, costa.src, costa.src],
  },
];

function Home() {
  const router = useRouter();
  const queryParams = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  const plansState = usePlans();

  useEffect(() => {
    const makePlans = (params) => {
      // Wrapping the async operation in a promise
      const planPromise = new Promise(async (resolve, reject) => {
        try {
          const {
            // userId,
            // roomCount,
            // guestCount,
            // bathroomCount,
            // category,
            locationValue,
            startDate,
            endDate,
            activity,
            budget,
            interest,
            sideNote,
          } = params;
          setLoading(true);
          const response = await ky
            .post("/api/plan", {
              timeout: 60000,
              json: {
                destination: locationValue,
                activity,
                startDate,
                endDate,
                budget,
                interest,
                sideNote,
              },
            })
            .json();

          setLoading(false);
          plansState.onNewPlans(response.data);
          resolve();
        } catch (error) {
          setLoading(false);
          setError(error.message); // Set the error state
          reject(error);
        }
      });

      toast.promise(planPromise, {
        loading: "Planning...",
        success: <b>Plans saved!</b>,
        error: <b>Could not plan.</b>,
      });
    };

    if (queryParams.locationValue) {
      setLoading(true);
      setError(null); // Reset the error state
      makePlans(queryParams);
    }
  }, [queryParams]);

  const navToPlan = (plan) => {
    plansState.onNewSelectedPlan(plan);
    router.push("/selected");
  };
  return (
    <div className="w-[100vw]">
      <NavBar />
      <div className="pt-20 px-5 w-[100%] max-w-[2360px] mx-auto h-full overflow-hidden ">
        {!loading ? (
          !plansState.plans.length > 0 ? (
            <Image
              src={getStart}
              alt=""
              className="rounded-lg mt-10 shadow-lg mx-auto w-full md:w-1/2 max-h-[100vh]"
            />
          ) : (
            <div className="w-[100%] pt-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-1 md:gap-2 lg:gap-4 xl:gap-6">
              {plansState.plans.map((i) => (
                <button key={i.itinerary[0].day} onClick={() => navToPlan(i)}>
                  <PlanCard
                    key={i.itinerary[0].day}
                    image={i.image}
                    day={i.itinerary[0].day}
                    title={i.title}
                    description={i.itinerary[0].description}
                    cost={i.total}
                    contact={i.itinerary[0].contact}
                    number={i.itinerary[0].number}
                  />
                </button>
              ))}
            </div>
          )
        ) : (
          <Loader type="balls" color="black" />
        )}
        {error && <p>Error: {error}</p>} {/* Display the error message */}
      </div>
    </div>
  );
}

export default Home;
