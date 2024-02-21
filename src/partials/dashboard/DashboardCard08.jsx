// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import GaugeChart1 from '../../charts/GaugeChart1';
import ReactApexChart from 'react-apexcharts';
import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

function DashboardCard08() {
  const location = useLocation();
  const data = location.state?.data;
  const data2 = location.state?.data2;
  const [modalOpen, setModalOpen] = useState(true);
  const [days, setdays]= useState([]);
  const [sprintName,setsprintName]=useState([]);
 useEffect( ()=>{
//    const sPercentage=[];
   const sTime=[];
   const sName=[];
   const getdaysLeft= async()=>{
   const reqData= await fetch(`${API_URL}daysleftinsprint?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}` ,{
    headers: {
     'Authorization':  `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();
   for(let i=0;i<resData.sprints.length;i++){  
   sTime.push(resData.sprints[i].daysLeft);
   sName.push(resData.sprints[i].sprintName);
    }  
  //  sTickets.push(resData.noOfTickets);
  setdays(sTime);
  setsprintName(sName);
   }
   getdaysLeft();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 h-50 bg-custom2 border-solid border-2 border-green-600  shadow-2xl rounded-3xl scrollTable5">
      <div className="px-5 pt-5 scrollTable5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Days Left In <br/><p className='text-yellow-600 font-bold'>({sprintName})</p> </h2>
        <h2 style={{textAlign:'center',fontWeight:'bold'}}></h2>
        <div style={{textAlign:'center',marginTop:'30px', width:'90%'}} >
          {days.length ?
            <h1 style={{padding:'5%',textAlign:'center',fontSize:'32px',color:'green', fontWeight:'600' }}>{days}</h1> : <div className='absolute mt-5 ml-3'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>
      }
        </div>
      </div>
    </div>
  );
}
export default DashboardCard08;