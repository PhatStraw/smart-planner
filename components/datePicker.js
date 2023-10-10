import React, { useState } from 'react'; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerComp = (props) => {
    return (
        <div className='flex flex-col'>
            <span>{props.title}</span>
            <DatePicker className='border max-w-[100%]' selected={props.date} onChange={(date) => props.dateSet(date)} placeholderText='Select date'/>
        </div>
    )
}

export default DatePickerComp