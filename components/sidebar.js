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
          <span className="flex-1 whitespace-nowrap">Activity</span>
          <Select options={activityOptions} onChange={(e) => { props.setActivity(e.value) }} className='w-full rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder="option" />
        </li>
        <li>
          <span className="flex-1 whitespace-nowrap">Budget</span>
          <input type="text" onChange={(e) => { props.setBudget(e.target.value) }} name="price" id="price" className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
        </li>
        <li>
          <span className="flex-1 whitespace-nowrap">Destination</span>
          <input type="text" onChange={(e) => { props.setDestination(e.target.value) }} name="price" id="price" className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="where are you going" />
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
          }} placeholder="options" />
        </li>
        <li>
          <DatePickerComp title="Start Date" date={props.startDate} dateSet={props.setStartDate} />
        </li>
        <li>
          <DatePickerComp title="End Date" date={props.endDate} dateSet={props.setEndDate} />
        </li>
        <li>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
          <textarea onChange={(e) => { props.setSideNote(e.target.value) }} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your trip details here..."></textarea>
        </li>
      </ul>
      <button onClick={props.makePlans} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold p-6">
        Start Plan
      </button>
    </div>
  )
}