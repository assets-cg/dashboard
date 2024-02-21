// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from 'react-d3-speedometer';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

function AssigneeIssuesDashboard05() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;

  const [hoverText, setHoverText] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const [values, setValues] = useState([]);
  const [sprintVelocity, setsprintVelocity]= useState([]);
  const [percentCompleted, setpercentCompleted]= useState([]);
  const [sprints, setSprints] = useState([]);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [names,setNames]=useState([]);
  const [percentage,setPercentage]=useState([]);


  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }

 useEffect( ()=>{
     const sHealth=[];
  const sName=[];
  const sPercentage=[];
   const getSprintHealth= async()=>{
   const reqData= await fetch(`${API_URL}assigneeloaddetails?projectName=DashboardProject&BoardId=2`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
//  console.log()
//  const reqData2= await fetch(`${API_URL}sprints?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
//   headers: {
//    'Authorization':   `Bearer ${localStorage.getItem("token")}`,
// }

// });

   const resData= await reqData.json(); 
//    const resData2= await reqData2.json();
   console.log(resData)
//    setSprints(resData2.sprints);
for(var i=0;i<resData.assigneeDetails.length;i++){
    sName.push(resData.assigneeDetails[i].assigneeName);
    
    sPercentage.push(resData.assigneeDetails[i].loadPercentage.toFixed(1));
   }  
   setNames(sName);
   setPercentage(sPercentage);
   
   }
   getSprintHealth();
},[selectedOption, names,percentage]);

console.log(names);
console.log(percentage);

return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl ">
      <header className="px-5 py-5 ">
      <div className="flex items-center">
        <h2 className=" font-semibold text-black mr-2">Assignee Loads (in Percentage)</h2>
        {/* <select
    className=" w-32 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select> */}
  </div>
      </header>
      

      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      <ReactApexChart

      series={[{
        data: percentage,
        name:"Percentage"
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
          
          columnWidth: '35%',
          distributed: true,
          
        }
      },
    //   colors:['#1ad5c3', '#4d83ff', '#6201ed'],
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
        text: "Percentage",
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
          return val+"%"
      },
      },
      legend: {
        show: true,
        labels: { colors: ['black'] }
      },
      xaxis: {
        categories: names,
        title:{
          text: "AssigneeNames",
          style:{
            color:'black'

          },
          offsetX: 0 ,
          offsetY: 200,

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
            colors: ["black"], // replace with your desired colors
          },
        },
      }
    } }
    type='bar'  height={280} />
    </div>
    </div>
  );
}

export default AssigneeIssuesDashboard05;