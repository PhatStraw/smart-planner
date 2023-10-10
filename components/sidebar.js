import DatePickerComp from 'components/components/datePicker';
import Select from 'react-select';

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
export default function SideBar(props) {
  return (
    <div className='flex flex-col justify-between h-[100%] max-w-[40%]'>
    <ul className="space-y-4 m-2">
      <li>
        <a href="#"
          className="flex items-center p-2 text-base font-normal text-black rounded-lg  hover:bg-gray-100 ">
          <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black"
            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span className="ml-3">Create a plan</span>
        </a>
      </li>
      <li>
        <span className="flex-1 whitespace-nowrap">Activity</span>
        <Select options={activityOptions} onChange={(e) => { props.setActivity(e.value) }} className='w-full rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder="Select option" />
      </li>
      <li>
        <span className="flex-1 whitespace-nowrap">Budget</span>
        <input type="text" onChange={(e) => { props.setBudget(e.target.value) }} name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
      </li>
      <li>
        <span className="flex-1 whitespace-nowrap">Destination</span>
        <input type="text" onChange={(e) => { props.setDestination(e.target.value) }} name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="where are you going" />
      </li>
      <li>
        <span className="flex-1 whitespace-nowrap">Interest</span>
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
        }} placeholder="Select options" />
      </li>
      <li>
        <DatePickerComp title="Start Date" date={props.startDate} dateSet={props.setStartDate} />
      </li>
      <li>
        <DatePickerComp title="End Date" date={props.endDate} dateSet={props.setEndDate} />
      </li>
    </ul>
    <button onClick={props.makePlans} class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-6">
      Start Plan
    </button>
  </div>
  )
}