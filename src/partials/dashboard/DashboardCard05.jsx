// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-03.svg';
import EditMenu from '../EditMenu';
import ReactApexChart from 'react-apexcharts';
import ReactSpeedometer from 'react-d3-speedometer';
import { API_URL, Bearer_Token } from '../../config';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { Alert, Stack } from '@mui/material';

function DashboardCard05() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;

  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [gauge, setGauge] = useState([]);
  const [serviceDeliveryTicketVolume_in30days, setserviceDeliveryTicketVolume_in30days]= useState();
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState(180);
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sTickets=[];
   const getTicketsinLast30days= async()=>{
    console.log(selectedOption)
   const reqData= await fetch(`${API_URL}servicedeliveryticketvolume?days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sTickets.push(resData.serviceDeliveryTicketVolume_in30days);    
  //  sTickets.push(resData.noOfTickets);

  setserviceDeliveryTicketVolume_in30days(sTickets[0]);
//  console.log(serviceDeliveryTicketVolume_in30days);
//  console.log(sTickets[0])
   }
getTicketsinLast30days();
},[selectedOption, localStorage.getItem("projectName"), localStorage.getItem("boardId")]);

function handleOptionChange(event) {
  const optionValue = event.target.value;
  setSelectedOption(optionValue);
}

console.log(selectedOption);


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 h-80 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start ">
        </header>
        <div className="flex items-center">
  <h2 className="text-lg font-semibold text-black mr-2">Service Delivery Ticket Volume</h2>
  <select
    className=" w-36 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="1">Today</option>
    <option value="2">Yesterday</option>
    <option value="30">Last Month</option>
    <option value="90">Quarterly</option>
    <option value="180">Half Yearly</option>
    <option value="365">Yearly</option>
  </select>
</div>
      </div>
      
        <div className='mt-16' style={{paddingLeft:"90px"}}>
        
        {serviceDeliveryTicketVolume_in30days? (
        <ReactSpeedometer
        maxValue={25}
        width={280}
        value={serviceDeliveryTicketVolume_in30days}
        currentValueText={serviceDeliveryTicketVolume_in30days + " Ticket(s)"}
        needleColor="black"
        startColor="green"
        segments={5}
        endColor="red"
        />): (
    
          <div style={{marginTop:'80px'}}className='center'>
      <Stack sx={{ width: '90%' }} spacing={2}>   
      <Alert severity="success"><strong>No Tickets in Last {selectedOption} Days</strong></Alert>  
              </Stack>
        </div>
            
            )}
            </div>
    </div>
  );
}
  

export default DashboardCard05;