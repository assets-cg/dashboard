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
function ProjectDashboard03() {
//   const location = useLocation();
//   console.log(location, " useLocation Hook");
//   const data = location.state?.data;
//   const data2 = location.state?.data2;
//   console.log(data)
//   console.log(data2)

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
   const reqData= await fetch(`${API_URL}effortsofeachepic?projectName=DashboardProject&BoardId=2&epicStatus=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });

 const reqData2= await fetch(`${API_URL}effortperepic?projectName=DashboardProject&BoardId=2`,{
  headers: {
   'Authorization':   `Bearer ${localStorage.getItem("token")}`,
}

});
const resData2= await reqData2.json();  
   sMean.push(resData2.meanEffortPerEpic); 
   sEpics.push(resData2.noOfEpics)   
  //  sTickets.push(resData.noOfTickets);

  setmeanEffortPerEpic(sMean[0]);
  setEpic(sEpics[0])



   const resData= await reqData.json();   
   for(var i=0;i<resData.epicsInfo.length;i++){
    sEpicId.push(resData.epicsInfo[i].epicId);
    
    sEfforts.push(resData.epicsInfo[i].effort);
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
    <div className="flex flex-col col-span-full sm:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <header className="px-5 py-5 ">
      <div className="flex items-center">
        <h2 className=" font-semibold text-black mr-2">Epic wise Effort View</h2>
        <select
    className=" w-32 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>
  </div>
      </header>
      <span style={{fontSize:'13px', fontWeight:'600', marginLeft:'15px', paddingBottom:'15px', color:'black'}}> Mean Effort per Epic : {meanEffortPerEpic} cal Days & Total Epics : {epic}</span>

      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      <ReactApexChart

      series={[{
        data: efforts,
        name:"Days"
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
          
          columnWidth: '30%',
          distributed: true,
          
        }
      },
      colors:['#1ad5c3', '#4d83ff', '#6201ed'],
      // fill: {
        
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'light',
      //     shadeIntensity: 0.4,
      //     inverseColors: false,
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 50, 53, 91]
      //   },
      // },
      title: {
        text: "Days",
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
        labels: { colors: ['black'] }
      },
      xaxis: {
        categories: epicId,
        title:{
          text: "Epics",
          style:{
            color:'black'

          },
          offsetX: 0,
          offsetY: 80,

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





export default ProjectDashboard03;
