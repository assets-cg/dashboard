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

function DashboardCard32() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [storyKey, setstoryKey]= useState([]);
  const [bugs,setbugs]=useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [tasks,settasks]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sName=[];
   const sCommit=[];
   const sDeliver=[];
//    const sPercentage=[];
   const getSprintVelocity= async()=>{
   const reqData= await fetch(`${API_URL}storybugsandtasks?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.details.length;i++){
    sName.push(resData.details[i].storyKey);
    
    sCommit.push(resData.details[i].noOfBugs);

    sDeliver.push(resData.details[i].noOfTasks);
   }   
  
   

   setstoryKey(sName);
   setbugs(sCommit);
   settasks(sDeliver);

   }
  

   getSprintVelocity();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl">
      <header className="px-5 py-3 ">
        <h2 className="font-semibold text-black"> Story wise Bugs & Tasks count</h2>
        
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {bugs && tasks ?
      <ReactApexChart

series={ [{
    name: 'Bugs',
    data: bugs
  }, {
    name: 'Tasks',
    data: tasks
  }
  ]}

    options={{
    // colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '60%',
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
        categories: storyKey,
        title:{
          text: "Stories",
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
          text: 'Counts',
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


export default DashboardCard32;
