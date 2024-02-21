// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { API_URL, Bearer_Token } from '../../config';
import { useLocation } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';


function ProjectDashboard05() {
//   const location = useLocation();
//   console.log(location, " useLocation Hook");
//   const data = location.state?.data;
//   const data2 = location.state?.data2;
//   console.log(data)
//   console.log(data2)
  const [deployment, setDeployment] = useState([]);
  const [qa, setQa]= useState([]);
  const [prod, setProd] = useState([]);
  const [dev, setDev] = useState([]);
  const [days,setdays]=useState([]);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState(180);
 useEffect( ()=>{
   const sQA=[];
   const sProd=[];
   const sDev=[];
   const sDays=[];
//    const sPercentage=[];
   const getDeploymentFrequencyDaywiseAllEnvironment= async()=>{
   const reqData= await fetch(`${API_URL}deploymentfrequencydaywiseallenvironment?project=DashboardProject&boardID=2&days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.deployment.length;i++){
    sQA.push(resData.deployment[i].qa);
    sProd.push(resData.deployment[i].prod);
    sDev.push(resData.deployment[i].dev);
    
    sDays.push(resData.deployment[i].day);
   }   


  setDeployment(resData.deployment);
   

   setQa(sQA);
   setProd(sProd);
   setDev(sDev);

   setdays(sDays);

   }
  

   getDeploymentFrequencyDaywiseAllEnvironment();
},[selectedOption]);

function handleOptionChange(event) {
  const optionValue = event.target.value;
  setSelectedOption(optionValue);
}


// console.log(story_key);
// console.log(noOfTasks);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <header className="px-5 py-5 border-b border-slate-100">
        <h2 className="font-semibold text-black">Deployment Frequency Daywise All Env</h2>
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
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">

      {deployment ? (
      
      <ReactApexChart
      series={[{
        data: qa,
        name:"QA"
      },
      {
        name: 'PROD',
        data: prod
      },
      {
        name: 'DEV',
        data: dev
      }
    ]}

    options={{
      chart: {
        height: 350,
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
    //   colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '50%',
          distributed: false,
          
        }
      },

      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
      
      title: {
        text: "Deployments",
        offsetX: 0,
        offsetY: 5,
        style: {
            color: "black",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return val
      },
      },
      legend: {
        show: true,
        labels:{
          colors:'black'

        }
      },
      xaxis: {
        categories: days,
        title:{
          text: "Days",
          style: {
            color: "black",
        },
          offsetX: 0,
          offsetY: 75,

                  },
        labels: {
          style: {
            colors:'black',
            fontSize: '12px'
          }
        }
      },
      yaxis:{
        show: true,
        labels: {
          style: {
            colors: ["black"], // replace with your desired colors
          },
        },
      }
    } }
    type='bar'  height={280} />): (
    
      <div style={{paddingLeft:'40px', marginTop:'80px'}}className='center'>
      <Stack sx={{ width: '90%' }} spacing={2}>   
           <Alert severity="info"><strong>No Deployments in Last {selectedOption} Days!</strong></Alert>   
              </Stack>
        </div>
      
      )}
    </div>
    </div>
  );
}
export default ProjectDashboard05;
