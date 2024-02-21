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
import { Alert, Stack} from '@mui/material';

function FeatureStatusDashboard03() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid?.boardId;//for boaardid
  const data2 = location.state?.projectname?.projectName;//for projectname
  const data1 = location.state?.sprintname;//for sprintname 
  const featureKey=location.state?.featureKey;//for featureKey
  const [modalOpen, setModalOpen] = useState(true);

  console.log(data1+"tgis")
  const [epicId, setepicId]= useState([]);
  const [noOfTickets, setnoOfTickets]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sId=[];
   const sTickets=[];
//    const sPercentage=[];
   const getNoOfTicketsPerEpicAssociatedToFeature= async()=>{
   const reqData= await fetch(`${API_URL}featurestatusepictickets?featureKey=${featureKey}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.epicDetails.length;i++){
    sId.push(resData.epicDetails[i].epicId);
    
    sTickets.push(resData.epicDetails[i].noOfTickets);
   }   
  
   

   setepicId(sId);
   setnoOfTickets(sTickets);

   }
  

   getNoOfTicketsPerEpicAssociatedToFeature();
},[data1,featureKey]);

// console.log(story_key);
// console.log(noOfTasks);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-black">No of Tickets per Epic Associated to Feature</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {noOfTickets.length ? 
      <ReactApexChart

      series={[{
        data: noOfTickets,
        name: "Tickets"
      }]}

    options={{
      chart: {
        height: 350,
        events: {
          click: function(chart, w, e) {
            console.log(chart, w, e)
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
        text: "Tickets",
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
        categories: epicId,
        title:{
          text: "Epic Id",
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
    type='bar'  height={250} />: <div className='absolute mt-20 ml-24'>
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
export default FeatureStatusDashboard03;
