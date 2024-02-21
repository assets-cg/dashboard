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

function DashboardCard26() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;

  const [hoverText, setHoverText] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const [values, setValues] = useState([]);
  const [sprintVelocity, setsprintVelocity]= useState([]);
  const [percentCompleted, setpercentCompleted]= useState([]);
  const [sprints, setSprints] = useState([]);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState();


  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }

 useEffect( ()=>{
     const sHealth=[];
  //  const sName=[];
  //  const sPercent=[];
   const getSprintHealth= async()=>{
   const reqData= await fetch(`${API_URL}sprintvelocitybystatus?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
 const reqData2= await fetch(`${API_URL}sprints?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
  headers: {
   'Authorization':   `Bearer ${localStorage.getItem("token")}`,
}

});

   const resData= await reqData.json(); 
   const resData2= await reqData2.json();
   console.log(reqData)
   setSprints(resData2.sprints);
   setValues(resData.sprintVelocity)
   
   }
   getSprintHealth();
},[selectedOption, values, sprints]);

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
        <h2 className="font-semibold text-black">Sprint Velocity by Status for {sprintnm}</h2>
        {/* <select
    className=" w-44 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    {sprints.map((value, index) => (
          <option key={index} value={value.name}>
            {value.name}
        </option>
        ))}
  </select> */}
  </div>
       
      </div>
      {values ?
         <div style={{display:'flex', justifyContent:'center', overflow:'hidden', marginTop:'30px'}}>
          
          {values.map((value, index) => (
            <div key={index} title={value.status}>
              <ReactSpeedometer
                maxValue={100}
                width={220}
                value={value.percentage}
                currentValueText={value.status + ' : ' + value.percentage.toFixed(2) + '%'}
                valueTextFontSize="12"
                labelFontSize="11"
                needleColor="black"
                startColor="green"
                segments={4}
                endColor="red"
              />
            </div>
          ))}
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

export default DashboardCard26;