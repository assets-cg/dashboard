// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from 'react-d3-speedometer';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

function DashboardCard16() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;

  const [hoverText, setHoverText] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const [values, setValues] = useState([]);
  const [sprintHealth, setsprintHealth]= useState([]);
  const [percentCompleted, setpercentCompleted]= useState([]);
  const [activeSprints, setActiveSprints] = useState([]);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState("kpi_projSprint1");


  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }

 useEffect( ()=>{
     const sHealth=[];
  //  const sName=[];
  //  const sPercent=[];
   const getSprintHealth= async()=>{
   const reqData= await fetch(`${API_URL}sprinthealth?sprintName=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
 const reqData2= await fetch(`${API_URL}activesprints`,{
  headers: {
   'Authorization':   `Bearer ${localStorage.getItem("token")}`,
}

});

   const resData= await reqData.json(); 
   const resData2= await reqData2.json();

   setActiveSprints(resData2);

   setValues(resData.sprintHealth[0]) 
   sHealth.push(resData.sprintHealth.timeElapsed);
   sHealth.push(resData.sprintHealth.workDone);
   sHealth.push(resData.sprintHealth.scopeChange);
   sHealth.push(resData.sprintHealth.blockers);

   setsprintHealth(sHealth);
   
   }
   getSprintHealth();
},[selectedOption]);

console.log(values)

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 border-solid border-2 border-green-600  xl:col-span-12 h-50 bg-custom2 shadow-2xl rounded-3xl scrollTable5">
      <div>
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start ">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <div className="flex items-center">
        <h2 className="font-semibold text-black">Active Sprint Health for</h2>
        <select
    className=" w-44 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    {activeSprints.map((value, index) => (
          <option key={index} value={value}>
            {value}
        </option>
        ))}
  </select>
  </div>
       
      </div>
      {values ?
         <div style={{display:'flex', justifyContent:'center', overflow:'hidden', marginTop:'30px'}}>
          
          <div title= "Time Elapsed: Time remaining to complete the sprint">
        <ReactSpeedometer
        maxValue={100}
        width={220}
        value={values.timeElapsed}
        currentValueText={values.timeElapsed + " % Time Elapsed"}
        valueTextFontSize="12"
        labelFontSize="11"
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        /></div>
        <div title= "Work Done: Total work done in %age">
        <ReactSpeedometer
        onMouseOver={() => setHoverText('This is Gauge Chart 2')} onMouseOut={() => setHoverText('')}
        maxValue={100}
        width={220}
        value={values.workDone}
        currentValueText={values.workDone + " % Work Done"}
        valueTextFontSize="12"
        labelFontSize="11"
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        /></div>

        <div title= "Scope Change: No. of stories updated/added vs Total No of Stories planned at the Sprint Planning Session">
        <ReactSpeedometer
        onMouseOver={() => setHoverText('This is Gauge Chart 3')} onMouseOut={() => setHoverText('')}
        maxValue={100}
        width={220}
        value={values.scopeChange}
        currentValueText={(values.scopeChange) + " % Scope Change"}
        valueTextFontSize="12"
        labelFontSize="11"
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        /></div>
        <div title= "Blockers: No. of stories blocked vs total no. of stories planned">
        <ReactSpeedometer
        onMouseOver={() => setHoverText('This is Gauge Chart 4')} onMouseOut={() => setHoverText('')}
        maxValue={100}
        width={220}
        value={values.blockers}
        currentValueText={values.blockers + " % Blockers"}
        valueTextFontSize="12"
        labelFontSize="11"
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        /></div>
        </div>
        : <div className='absolute right-12 mt-0'>
        {modalOpen && (
    <Stack sx={{ width: '100%'}} spacing={2}>
 
    <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
  </Stack>     )}
  </div>
  }
        
        </div>
    </div>
  );
}

export default DashboardCard16;