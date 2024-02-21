// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { API_URL, Bearer_Token} from '../../config';

function DashboardCard34() {


  const [epicId, setepicId]= useState([]);
  const [efforts,setefforts]=useState([]);
  const [meanEffortPerEpic, setmeanEffortPerEpic]= useState();
  const [epic, setEpic] = useState();
  const [selectedOption, setSelectedOption] = useState("To Do");
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sEpicId=[];
   const sEfforts=[];
   const sMean=[];
   const sEpics=[];
//    const sPercentage=[];
   const getEffortOfEpic= async()=>{
   const reqData= await fetch(`${API_URL}projectthroughput?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });

   const resData= await reqData.json();   
   for(var i=0;i<resData.details.length;i++){
    sEpicId.push(resData.details[i].week);
    
    sEfforts.push(resData.details[i].count);
   }   
  
   

   setepicId(sEpicId);
   setefforts(sEfforts);

   }
  

   getEffortOfEpic();
},[selectedOption]);

function handleOptionChange(event) {
  const optionValue = event.target.value;
  setSelectedOption(optionValue);
}


// console.log(story_key);
// console.log(noOfTasks);
  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <header className="px-5 py-5 ">
      <div className="flex items-center">
        <h2 className=" font-semibold text-black mr-2">Throughput Chart</h2>
  </div>
      </header>

      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      <ReactApexChart

      series={[{
        data: efforts,
        name:"Issues Done"
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
      plotOptions: {
        bar: {
          
          columnWidth: '90%',
          distributed: true,
          
        }
      },
      colors: ['#45FF33'],
      title: {
        text: "Issues Done",
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
        show: false,
        labels: { colors: ['black'] }
      },
      xaxis: {
        categories: epicId,
        title:{
          text: "Week(s)",
          style:{
            color:'black'

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
      yaxis:{
        labels: {
          style: {
            colors: ["blcak"], // replace with your desired colors
          },
        },
      }
    } }
    type='bar'  height={280} />
    </div>
    </div>
  );
}



export default DashboardCard34;
