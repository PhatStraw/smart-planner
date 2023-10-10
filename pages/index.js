import Head from 'next/head'
import { useState } from 'react';
import ky from 'ky';
import Loader from 'components/components/loader';
import Nav from 'components/components/nav';
import SideBar from 'components/components/sidebar';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [destination, setDestination] = useState("")
  const [activity, setActivity] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState(0)
  const [interest, setInterest] = useState([])
  const [sideNote, setSideNote] = useState(" ")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState()

  const makePlans = () => {
    // Wrapping the async operation in a promise
    const planPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const response = await ky.post("/api/hello", {
          timeout: 30000,
          json: {
            destination, activity, startDate, endDate,
            budget, interest, sideNote
          }
        }).json();
        
        setLoading(false);
        const data = JSON.parse(response.data).itinerary;
        setPlan(data);
        resolve();  // Resolving the promise if everything goes well
      } catch (error) {
        setLoading(false);
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
      <Nav />
      <Toaster />
        <div className='flex flex-row h-[92vh] w-[100vw]'>
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
          />
         <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
             {!loading ? (<div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {!plan ? <div>Select the options to your left and let us know any specefics we may need to know in the input below...</div> : plan.map((i) => (
                <div key={i.day}>
                  <span>Day:{i.day}</span>
                  <br />
                  <p>Activity:{i.activity}</p>
                  <br />
                  <p>Cost Breakdown:{i.cost}</p>
                  <br />
                  <br />
                </div>
              ))}
            </div>) : (
            <div className='flex flex-col justify-center items-center max-w-[60%] h-[95%]'>
              <div className='w-[50%] h-[50%] flex flex-col justify-center items-center'>
              <h2 className='text-4xl'>Loading</h2>
              <Loader type="balls" color="black"/>
              </div>
            </div>)}
            <div className="bg-gray-300 p-4">
              <input onChange={(e) => { setSideNote(e.target.value) }} className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type any specefics we may need to know before creating your plans..." />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
