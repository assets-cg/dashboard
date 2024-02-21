// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';
import { API_URL, Bearer_Token } from '../../config';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { Alert, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

function DashboardCard03() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [story_key, setstory_key]= useState([]);
  const [noOfTasks,setnoOfTasks]=useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sStory=[];
   const sTasks=[];
//    const sPercentage=[];
   const getTasksPerStory= async()=>{
   const reqData= await fetch(`${API_URL}tasksperstory?project=${data2}&boardID=${data}`,{
    headers: {
     'Authorization':  `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.tasks.length;i++){
    sStory.push(resData.tasks[i].story_key);
    
    sTasks.push(resData.tasks[i].noOfTasks);
   }   
  
   

   setstory_key(sStory);
   setnoOfTasks(sTasks);

   }
  

   getTasksPerStory();
},[]);

console.log(story_key);
console.log(noOfTasks);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-black">No. of Tasks Per Story</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {noOfTasks ?
      <ReactApexChart

      series={[{
        name:"Tasks",
        data: noOfTasks
      }]}

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
          columnWidth: '25%',
          distributed: true,
        }
      },
      colors:['#1ad5c3', '#4d83ff', '#6201ed', '#fcce49'],
      
      title: {
        text: "Tasks",
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
        enabled: true
      },
      legend: {
        show: true,
        labels: { colors: ['black'] }
      },
      xaxis: {
        categories: story_key,
        title:{
          text: "Stories",
          offsetX: 0,
          offsetY: 190,
          style: {
            color: "black",
        },

                  },
        labels: {
          style: {
            colors:'black',
            fontSize: '12px'
          }
        }
      },
      yaxis:{
       
          labels: {
            style: {
              colors: ["black"], // replace with your desired colors
            },
        }
      }
    } }
    type='bar'  height={300} /> : <div className='absolute right-12 mt-0'>
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





export default DashboardCard03;
