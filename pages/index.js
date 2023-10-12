import Head from 'next/head'
import ky from 'ky';
import Loader from 'components/components/loader';
import Nav from 'components/components/nav';
import SideBar from 'components/components/sidebar';
import toast, { Toaster } from 'react-hot-toast';
import PlanCard from 'components/components/card';
import React, { useEffect, useState } from "react";

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
      {/* <!-- Sidebar starts -->
      <!-- Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] --> */}
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
      {/* <!-- Sidebar ends -->
      <!-- Remove class [ h-64 ] when adding a card block --> */}
      <div className="container mx-auto py-10 h-[100vh] md:w-4/5 w-11/12">
        {/* <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border --> */}
        <div className="w-full h-[100%] rounded border-dashed border-2 border-gray-300">
          {/* <!-- Place your content here --> */}
          <div className="container mx-auto py-10 h-full md:w-4/5 w-11/12 px-6 overflow-hidden overflow-y-auto">
            {!loading ? (
              <div className="w-full flex flex-col flex-grow  overflow-auto mb-2 text-white">
                {!plan ? (
                  <div className='flex flex-col justify-center h-full w-full text-white'>
                    <h1 className='text-center text-xl lg:text-2xl'>
                      Welcome To Smart Travel: The AI Travel Planner!
                    </h1>
                    <br></br>
                    <div className='text-center  text-xl lg:text-xl'>Select the options to your left...</div>
                  </div>
                ) : plan.map((i) => (
                  <PlanCard key={i.day} day={i.day} title={i.title} description={i.description} cost={i.cost} contact={i.contact} number={i.number} />
                ))}
              </div>) : (
              <div className='flex flex-col justify-center items-center max-w-[60%] h-[93%]'>
                <div className='w-[50%] h-[50%] flex flex-col justify-center items-center'>
                  <h2 className='text-4xl'>Loading</h2>
                  <Loader type="balls" color="black" />
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>



  );
}

export default Home;
