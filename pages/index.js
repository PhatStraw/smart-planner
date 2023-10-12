import Head from 'next/head'
import { useState } from 'react';
import ky from 'ky';
import Loader from 'components/components/loader';
import Nav from 'components/components/nav';
import SideBar from 'components/components/sidebar';
import toast, { Toaster } from 'react-hot-toast';
import PlanCard from 'components/components/card';

export default function Home() {
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
    <>
      <Head>
        <title>Insta Plan</title>
        <meta name="description" content="Insta Plan the instant travel palnner!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className="border border-[#e63462]">
        <Nav />
        <Toaster />
        <div className='flex flex-row h-[93vh] w-[100vw]'>
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
          <div className="flex flex-col items-center w-full bg-[#e63462] shadow-xl overflow-hidden">
            {!loading ? (
            <div className="w-full flex flex-col flex-grow h-0 overflow-auto bg-[#1e2019] mb-2 text-white">
              {!plan ? (
                <div className='flex flex-col justify-center h-full w-full bg-[#1e2019] text-white'>
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
      </main>
    </>
  )
}
