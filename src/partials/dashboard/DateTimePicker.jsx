// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import '../../css/additional-styles/datepicker.css'

function DateTimePicker() {
    const location = useLocation();

    return (
      // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
        <div className='meridian-daterangepicker'>
<DateRangePicker 
                  
                  format="yyyy-MM-dd hh:mm aa"
                  showMeridian
                  placeholder = "select date"
                  defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
             />
      </div>
    );
  }
  export default DateTimePicker;