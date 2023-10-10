import DatePickerComp from 'components/components/datePicker';
import Head from 'next/head'
import axios from 'axios';
import { useState } from 'react';
import Select from 'react-select'

const activityOptions = [
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
  { value: "high", label: "high" }
];

const InterestOptions = [
  { value: "local culture", label: "local culture" },
  { value: "trying new food", label: "trying new food" },
  { value: "Adventure and Outdoor Activities", label: "Adventure and Outdoor Activities" },
  { value: "Visiting Historical or Significant Sites", label: "Visiting Historical or Significant Sites" },
  { value: "Relaxation and Wellness", label: "Relaxation and Wellness" },
  { value: "Capturing Photographs", label: "Capturing Photographs" },
  { value: "Attending Events or Festivals", label: "Attending Events or Festivals" },
  { value: "Shopping", label: "Shopping" },
  { value: "Meeting New People", label: "Meeting New People" },
  { value: "Nature and Wildlife", label: "Nature and Wildlife" },
  { value: "Sports", label: "Sports" },
  { value: "Art and Music", label: "Art and Music" },
];

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

  const makePlans = async () => {
    setLoading(true)
    const response = await axios.post("/api/hello", { destination, activity, startDate, endDate, budget, interest, sideNote }) // body data type must match "Content-Type" header; // parses JSON response into native JavaScript objects
    setLoading(false)
    const data = JSON.parse(response.data.data).itinerary
    setPlan(data)
  }

  return (
    <>
      <Head>
        <title>Insta Plan</title>
        <meta name="description" content="Insta Plan the instant travel palnner!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {!loading ? (<div className='flex flex-row h-[100vh] w-[100vw]'>
          <div className='flex flex-col justify-between h-[100vh] max-w-[40%]'>
            <ul className="space-y-2">
              <li>
                <a href="#"
                  className="flex items-center p-2 text-base font-normal text-black rounded-lg  hover:bg-gray-100 ">
                  <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black"
                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <span className="flex-1 whitespace-nowrap">Activity</span>
                <Select options={activityOptions} onChange={(e) => { setActivity(e.value) }} placeholder="Select option" />
              </li>
              <li>
                <span className="flex-1 whitespace-nowrap">Budget</span>
                <input type="text" onChange={(e) => { setBudget(e.target.value) }} name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
              </li>
              <li>
                <span className="flex-1 whitespace-nowrap">Destination</span>
                <input type="text" onChange={(e) => { setDestination(e.target.value) }} name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="where are you going" />
              </li>
              <li>
                <span className="flex-1 whitespace-nowrap">Interest</span>
                <Select isMulti={true} options={InterestOptions} onChange={(e) => {
                  setInterest([])
                  e.map((i) => {
                    if (interest.length > 0) {
                      setInterest([...interest, i.value])
                    } else {
                      setInterest([i.value])
                    }
                    console.log(interest)
                  }
                  )
                }} placeholder="Select options" />
              </li>
              <li>
                <DatePickerComp title="Start Date" date={startDate} dateSet={setStartDate} />
              </li>
              <li>
                <DatePickerComp title="End Date" date={endDate} dateSet={setEndDate} />
              </li>
            </ul>
            <button onClick={makePlans} class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-6">
              Start Plan
            </button>
          </div>
          <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {!plan ? <div>"Select the options to your left and let us know any specefics we may need to know in the input below..."</div> : plan.map((i) => (
                <div>
                  <span>Day:{i.day}</span>
                  <br />
                  <br />
                  <p>Activity:{i.activity}</p>
                  <br />
                  <br />
                  <br />
                </div>
              ))}
            </div>
            <div className="bg-gray-300 p-4">
              <input onChange={(e) => { setSideNote(e.target.value) }} className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type any specefics we may need to know before creating your plans..." />
            </div>
          </div>
        </div>) : <div>Loading</div>}
      </main>
    </>
  )
}
