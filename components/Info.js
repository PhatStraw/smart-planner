import 'rheostat/initialize';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'rheostat/lib/themes/DefaultTheme';
ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(DefaultTheme);

import Select from 'react-select';
import DatePickerComp from 'components/components/datePicker';
import Counter from './inputs/Counter';
import Rheostat from 'rheostat';
const activityOptions = [
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
  { value: "high", label: "high" }
];

const AllergyOptions = [
  { "value": "Cow's milk", "label": "Cow's Milk Allergy" },
  { "value": "Eggs", "label": "Egg Allergy" },
  { "value": "Fish", "label": "Fish Allergy" },
  { "value": "Shellfish", "label": "Shellfish Allergy" },
  { "value": "Wheat", "label": "Wheat Allergy" },
  { "value": "Peanuts", "label": "Peanut Allergy" },
  { "value": "Tree nuts", "label": "Tree Nut Allergy" },
  { "value": "Soy", "label": "Soy Allergy" },
  { "value": "Sesame", "label": "Sesame Allergy" },
  { "value": "Animal dander", "label": "Animal Dander Allergy" },
  { "value": "Pollen", "label": "Pollen Allergy" },
  { "value": "Dust", "label": "Dust Allergy" },
  { "value": "Insect bites", "label": "Insect Bite Allergy" },
  { "value": "Medications", "label": "Medication Allergy" },
  { "value": "Almonds", "label": "Almond Allergy" },
  { "value": "Cashews", "label": "Cashew Allergy" },
  { "value": "Pistachios", "label": "Pistachio Allergy" }
]

export default function Info(props) {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full rounded'>
        <h2 className='md:text-2xl text-slate-900 text-center mt-1 border-b border-b-4 mb-2 border-b-[#076AE0]'>Plan a trip</h2>
        <ul className="text-slate w-full space-y-4">
          <li>
            <Counter
              onChange={(value) => props.setGuestCount(value)}
              value={props.guestCount}
              title="Guests"
              subtitle="How many guests are coming?"
            />
          </li>
          <li>
            <Counter
              onChange={(value) => props.setPetCount(value)}
              value={props.petCount}
              title="Pets"
              subtitle="How many pets are coming?"
            />
          </li>
          <li>
            <Counter
              onChange={(value) => props.setChildCount(value)}
              value={props.childCount}
              title="Kids"
              subtitle="How many children under 13yrs?"
            />
          </li>
          <li className=''>
            <span className="text-slate-900 flex-1 slate-100space-nowrap">Allergies</span>
            <Select isMulti={true} options={AllergyOptions} onChange={(e) => {
              props.setAllergies([])
              e.map((i) => {
                if (props.allergies.length > 0) {
                  props.setAllergies([...props.allergies, i.value])
                } else {
                  props.setAllergies([i.value])
                }
              }
              )
            }} placeholder="options" />
          </li>
          <li className=''>
            <span className="text-slate-900 flex-1 slate-100space-nowrap">Budget</span>
            <div className='mt-2'>
              <Rheostat
                min={1}
                max={100}
                values={[1, 100]}
                onValuesUpdated={(e) => props.setBudget(e.values)}
              />
            </div>
          </li>
          <li className=''>
            <label for="message" class="block mb-2 text-md font-medium text-slate-900 dark:text-slate-100">Details</label>
            <textarea onChange={(e) => { props.setSideNote(e.target.value) }} id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-100 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your trip details here..."></textarea>
          </li>
        </ul>
      </div>
    </div>
  )
}
