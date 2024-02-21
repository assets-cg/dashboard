// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

function FeatureDashboard04() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  const data3=location.state?.sprintname
  const featureKey=location.state?.featureKey;
  console.log(data)
  console.log(data2)

  const [epicId, setepicId]= useState([]);
  const [effortInDays,seteffortInDays]=useState([]);
  const [value, setValue] = useState();
  const [modalOpen, setModalOpen] = useState(true);

 useEffect( ()=>{
   const sEpicId=[];
   const sEffortInDays=[];
//    const sPercentage=[];
   const getEffortOfEpicAssociatedWithDash= async()=>{
   const reqData= await fetch(`${API_URL}epiceffort?project=DashboardProject&boardID=2&sprintName=${data3}&featureKey=${featureKey}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.epicDetails.length;i++){
    sEpicId.push(resData.epicDetails[i].epicId);
    
    sEffortInDays.push(resData.epicDetails[i].effort_inDays);
   }   
  
   

   setepicId(sEpicId);
   seteffortInDays(sEffortInDays);

   }
  

   getEffortOfEpicAssociatedWithDash();
},[]);

// console.log(story_key);
// console.log(noOfTasks);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 border-solid border-2 h-80 border-green-600 bg-custom2 shadow-2xl rounded-3xl ">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-black">Effort of Epic Associated with {epicId} </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {effortInDays > 0 ?
      <ReactApexChart

      series={[{
        data: effortInDays,
        name: "Efforts"
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
        labels:{
          colors:'black'
        }
      },
      xaxis: {
        categories: epicId,
        title:{
          text: "Epics",
          offsetX: 0,
          offsetY: 85,
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
    type='bar'  height={250} />: <div className='relative mt-20 ml-40'>
    {modalOpen && (
<Stack sx={{ width: '60%'}} spacing={2}>

<Alert severity="error"> Alert — <strong>No data available</strong></Alert>
</Stack>     )}
</div>
}
    </div>
    </div>
  );
}
export default FeatureDashboard04;
