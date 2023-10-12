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
    <div className='flex flex-col bg-[#e63462] justify-between h-[100%] max-w-[40%] border-[#e63462]'>
      <div className='mx-1 md:mx-2 bg-[#1e2019] h-full rounded'>
        <ul className="text-slate space-y-4 m-4">
          <li>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Activity</span>
            <Select options={activityOptions} onChange={(e) => { props.setActivity(e.value) }} className='w-full rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' placeholder="option" />
          </li>
          <li>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Budget</span>
            <input type="text" onChange={(e) => { props.setBudget(e.target.value) }} name="price" id="price" className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
          </li>
          <li>
            <span className="text-slate-100 flex-1 slate-100space-nowrap">Destination</span>
            <input type="text" onChange={(e) => { props.setDestination(e.target.value) }} name="price" id="price" className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="where are you going" />
          </li>
          <li>
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
          <li>
            <DatePickerComp title="Start Date" date={props.startDate} dateSet={props.setStartDate} />
          </li>
          <li>
            <DatePickerComp title="End Date" date={props.endDate} dateSet={props.setEndDate} />
          </li>
          <li>
            <label for="message" class="block mb-2 text-md font-medium text-slate-100 dark:text-slate-100">Details</label>
            <textarea onChange={(e) => { props.setSideNote(e.target.value) }} id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your trip details here..."></textarea>
          </li>
        </ul>
      </div>
      <button onClick={props.makePlans} className="bg-[#1e2019] rounded hover:bg-[#fcf7f8] hover:text-[#1e2019] text-slate-100 font-bold m-1 md:m-2 p-4">
        Start Plan
      </button>
    </div>
  )
}