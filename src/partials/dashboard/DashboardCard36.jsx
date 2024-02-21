// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';
import { API_URL, Bearer_Token} from '../../config';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

function DashboardCard36() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [days, setdays]= useState([]);
  const [qa,setqa]=useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [prod,setprod]=useState([]);
  const [dev,setdev]=useState([]);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState(180);
  
  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }

 useEffect( ()=>{
   const sDays=[];
   const sQa=[];
   const sProd=[];
   const sDev=[];
//    const sPercentage=[];
   const getSprintVelocity= async()=>{
   const reqData= await fetch(`${API_URL}faileddeploymentfrequencydaywiseallenvironment?projectName=DashboardProject&BoardId=2&days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.deployment.length;i++){
    sDays.push(resData.deployment[i].day);
    
    sQa.push(resData.deployment[i].qa);

    sProd.push(resData.deployment[i].prod);

    sDev.push(resData.deployment[i].dev);
   }   
  
   

   setdays(sDays);
   setqa(sQa);
   setprod(sProd);
   setdev(sDev);

   }
  

   getSprintVelocity();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId"), selectedOption]);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl">
    <header className="px-5 py-5 border-b border-slate-100">
        <h2 className="font-semibold text-black">Failed Deployment Frequency Daywise All Env</h2>
        <select
    className=" w-32 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {qa && prod ?
      <ReactApexChart

series={ [{
    name: 'QA',
    data: qa
  }, {
    name: 'PROD',
    data: prod
  }, {
    name: 'DEV',
    data: dev
  }
  ]}

    options={{
    // colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '35%',
          distributed: false,
        }
      },
      
      title: {
        style: {
            color: "black",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },
    // colors:{

    // },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: true,
        labels:{colors:'black'}
      },
      xaxis: {
        categories: days,
        title:{
          text: "Days",
          style: {
            color: "black",
        },
          offsetX: 0,
          offsetY: 160,

                  },
        labels: {
          style: {
            colors: 'black',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Deployments',
          style:{
            color:'black'
          }
          
        },
        labels: {
          style: {
            colors: ["black"], // replace with your desired colors
          },
        }

      }
    } }
    type='bar'  height={280} />
    : <div className='absolute mt-6 ml-10'>
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


export default DashboardCard36;
