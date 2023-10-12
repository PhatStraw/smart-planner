import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import Select from 'react-select';
import DatePickerComp from 'components/components/datePicker';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Logo from '../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

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
export default function Nav(props) {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full rounded'>
        <h2 className='md:text-2xl text-slate-100 text-center mt-1 border-b border-b-4 mb-2 border-b-[#3b60e4]'>Plan a trip</h2>
        <ul className="text-slate w-full space-y-4">
          <li className=''>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Activity</span>
            <Select options={activityOptions} onChange={(e) => { props.setActivity(e.value) }} className='w-full rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder="option" />
          </li>
          <li className=''>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Budget</span>
            <input type="text" onChange={(e) => { props.setBudget(e.target.value) }} name="price" id="price" className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
          </li>
          <li className=''>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Destination</span>
            <input type="text" onChange={(e) => { props.setDestination(e.target.value) }} name="price" id="price" className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="where are you going" />
          </li>
          <li className=''>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Interest</span>
            <Select isMulti={true} options={InterestOptions} onChange={(e) => {
              props.setInterest([])
              e.map((i) => {
                if (props.interest.length > 0) {
                  props.setInterest([...props.interest, i.value])
                } else {
                  props.setInterest([i.value])
                }
                console.log(props.interest)
              }
              )
            }} placeholder="options" />
          </li>
          <li className=''>
            <DatePickerComp title="Start Date" date={props.startDate} dateSet={props.setStartDate} />
          </li>
          <li className=''>
            <DatePickerComp title="End Date" date={props.endDate} dateSet={props.setEndDate} />
          </li>
          <li className=''>
            <label for="message" class="block mb-2 text-md font-medium text-slate-100 dark:text-slate-100">Details</label>
            <textarea onChange={(e) => { props.setSideNote(e.target.value) }} id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your trip details here..."></textarea>
          </li>
        </ul>
      </div>
      <button onClick={props.makePlans} className="bg-[#3b60e4] rounded hover:bg-[#fcf7f8] hover:text-[#1e2019] text-slate-100 font-bold m-1 md:m-3 p-4 text-md md:text-2xl">
        Start
      </button>
    </div>
  )
}
