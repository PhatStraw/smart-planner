import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerComp = (props) => {
    return (
        <div className='flex flex-col'>
            <span className='text-slate-100'>{props.title}</span>
            <DatePicker calendarClassName="calendar" className='border max-w-[100%] w-full rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' selected={props.date} onChange={(date) => props.dateSet(date)} placeholderText='Select date' />
        </div>
    )
}

export default DatePickerComp