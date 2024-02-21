// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from 'react-d3-speedometer';
import { Alert, Stack } from '@mui/material';

import { API_URL, Bearer_Token } from '../../config';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import GaugeChart1 from '../../charts/GaugeChart1';
import ReactApexChart from 'react-apexcharts';

function DashboardCard07() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(true);
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [gauge, setGauge] = useState([]);
  const [meanAggregateTimeSpentPerTask, setmeanAggregateTimeSpentPerTask]= useState();
  const [mxTime, setMxTime] = useState([]);
  const [miTime, setMiTime] = useState([]);
  const [mintskKey, setMinTskKey] = useState([]);
  const [maxtskKey, setMaxTskKey] = useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sTime=[];
   const maxTime=[];
   const minTime=[];
   const mintaskKey=[];
   const maxtaskKey=[];
   const getMeanAggregateTime= async()=>{
   const reqData= await fetch(`${API_URL}meanaggregatetimespentpertask`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sTime.push(resData.meanAggregateTimeSpentPerTask);
   maxTime.push(resData.maxVal);
   minTime.push(resData.minVal);
   mintaskKey.push(resData.minSummary); 
   maxtaskKey.push(resData.maxSummary); 

  //  sTickets.push(resData.noOfTickets);

  setmeanAggregateTimeSpentPerTask(sTime[0]);

  setMxTime(maxTime/3600)
  setMiTime(minTime/3600)
  setMinTskKey(mintaskKey)
  setMaxTskKey(maxtaskKey)
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getMeanAggregateTime();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);



  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 h-80 border-solid border-2 border-green-600 mb-20 bg-custom2 shadow-2xl rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      
        </header>
        <h2 className="text-lg font-semibold text-black mb-2 ">Mean Aggregate Time Spent Per Task</h2><span style={{fontSize:'13px', fontWeight:'600', marginLeft:'1px', paddingTop:'60px', color:'black'}}>MaxTime : {mxTime}hrs for {maxtskKey} </span>
        <span style={{fontSize:'13px', fontWeight:'600', marginLeft:'60px', paddingTop:'80px', color:'black'}}>MinTime : {miTime}hrs for {mintskKey}</span>
      </div>
         <div style={{marginTop:"35px", marginLeft:'90px'}}>
          {meanAggregateTimeSpentPerTask ?
        <ReactSpeedometer
        maxValue={8}
        width={280}
        value={meanAggregateTimeSpentPerTask}
        currentValueText={meanAggregateTimeSpentPerTask + " Cal Days"}
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        /> : <div className='absolute  mt-5 ml-20'>
        {modalOpen && (
    <Stack sx={{ width: '100%'}} spacing={2}>
 
    <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
  </Stack>     )}
  </div>
  }</div>
        
    </div>
  );
}

export default DashboardCard07;