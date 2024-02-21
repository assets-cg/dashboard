// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';
import { API_URL, Bearer_Token } from '../../config';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

function StorySummaryCard01() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const epicId= location.state?.id;
  const sprintnm= location.state?.sprintname;

  const [storyId, setstoryId]= useState([]);
  const [efforts,setefforts]=useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sStoryId=[];
   const sEfforts=[];
//    const sPercentage=[];
   const getEffortOfStoryRelatedToEpic= async()=>{
   const reqData= await fetch(`${API_URL}effortofstories?project=DashboardProject&boardID=2&sprintName=${sprintnm}&epicId=${epicId}`,{
    headers: {
     'Authorization':  `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.stories.length;i++){
    sStoryId.push(resData.stories[i].storyId);
    
    sEfforts.push(resData.stories[i].effort);
   }   
  
   

   setstoryId(sStoryId);
   setefforts(sEfforts);

   }
  

   getEffortOfStoryRelatedToEpic();
},[]);

// console.log(story_key);
// console.log(noOfTasks);

  return (
    <div className="flex flex-col mb-11 col-span-full sm:col-span-6 bg-custom2 border-solid border-2 border-green-600 shadow-2xl rounded-3xl scrollTable1">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-black">Effort of Story Related to Epic </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {efforts >0 ?
      <ReactApexChart

      series={[{
        name:"Effort",
        data: efforts
      }]}

    options={{
      chart: {
        height: 300,
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
    //   colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '10%',
          distributed: true,
        }
      },

      title: {
        text: "Efforts",
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
        labels:{colors:'black'}
      },
      xaxis: {
        categories: storyId,
        title:{
          text: "Stories",
          offsetX: 0,
          offsetY: 80,
          style:{
            color:'black'
          }

                  },
        labels: {
          style: {
            colors: 'black',
            fontSize: '12px'
          }
        }
      },
      yaxis:{
        labels:{
          style:{
            colors:'black'
          }
        }
      }
    } }
    type='bar'  height={200} />: <div className='relative mt-10 mb-20 ml-40'>
    {modalOpen && (
<Stack sx={{ width: '70%'}} spacing={2}>

<Alert severity="error"> Alert — <strong>No data available</strong></Alert>
</Stack>     )}
</div>
}
    </div>
    </div>
  );
}
export default StorySummaryCard01;
