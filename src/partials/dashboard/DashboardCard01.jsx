// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from "react-d3-speedometer"
import {Alert, Stack} from '@mui/material';


// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import GaugeChart1 from '../../charts/GaugeChart1';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';


function DashboardCard01() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [gauge, setGauge] = useState([]);
  const [noOfTickets, setnoOfTickets]= useState();
  const [modalOpen, setModalOpen] = useState(true);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState(180);

  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }
  
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sTickets=[];
   const getTicketsinLast7days= async()=>{
   const reqData= await fetch(`${API_URL}ticketsinlast7days?project=${data2}&boardID=${data}&days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sTickets.push(resData.noOfTickets);    
  //  sTickets.push(resData.noOfTickets);

 setnoOfTickets(sTickets[0]);
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
getTicketsinLast7days();
},[selectedOption]);



  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl scrollTable1" >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start">
        <div className="flex items-center">
        <h2 className="font-semibold text-black">Critical Errors (Last {selectedOption} Days)</h2>
        <select
    className=" w-36 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="7">Last Week</option>
    <option value="30">Last month</option>
    <option value="90">Quarterly</option>
    <option value="180">Half Yearly</option>
    <option value="365">Yearly</option>
  </select>
  </div>
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        
      </div>
     
        <div style={{paddingLeft:"60px", marginTop:'40px', display:'inline-block'}}>
        {noOfTickets ? (
        <ReactSpeedometer
        
        maxValue={12}
        width={280}
        value={noOfTickets}
        currentValueText={noOfTickets + " Ticket(s)"}
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        />): (
          <div style={{marginTop:'80px'}}className='center'>
            <Stack sx={{ width: '90%' }} spacing={2}>   
                 <Alert severity="success"> No Errors !!<br></br> <strong>Congratulations!! You did a Fantastic Job!</strong></Alert>   
                    </Stack>
              </div>
            
            )}
        
        </div>
    </div> 
  );
}

export default DashboardCard01;
