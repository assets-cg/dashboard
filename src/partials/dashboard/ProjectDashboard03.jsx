// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation} from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import ReactApexChart from 'react-apexcharts';
import EditMenu from '../EditMenu';
import { API_URL, Bearer_Token } from '../../config';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import HorizontalBarChart from '../../charts/HorizontalBarChart';

function ProjectDashboard03() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)


  const [featureperEpic, setfeatureperEpic]= useState([]);
  const [sprintName,setsprintName]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sFeatures=[];
   const sSprints=[];
//    const sPercentage=[];
   const getWorkItemPerSprint= async()=>{
   const reqData= await fetch(`${API_URL}sprintfeaturedetails?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.sprints.length;i++){
    sSprints.push(resData.sprints[i].sprintName);
    
    sFeatures.push(resData.sprints[i].feature);
   }   
   
 setsprintName(sSprints);
 setfeatureperEpic(sFeatures);
   }
   
   getWorkItemPerSprint();
},[localStorage.getItem("projectName"),localStorage.getItem("boardId")]);

console.log(featureperEpic);
console.log(sprintName);
  
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 02" /> */}
          
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Feature per Sprint</h2>
        
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        
        <ReactApexChart
      series={[{
        data: featureperEpic,
        name: "features"
        
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
          borderRadius: 4,
          horizontal: true,
          barHeight:'65%'
        },
        
      },
      title: {
        text: "Sprints",
        offsetX: 10,
        offsetY: 15,
        style: {
            color: "black",
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return val + " Feature(s)"
        },
        style: {
            fontSize: '12px',
            fontWeight: 'bold',
        }
      },
      legend: {
        show: true,
        labels:{
          colors:'black'
        }
           },
      xaxis: {
        
        
        categories: sprintName,
       
        title:{
           text: "No of Features",
           offsetY: -16,
           style:{
            color:'black'
          }
        },
        
        labels: {
          show: false,
          style: {
            fontSize: "12px",
          },
        }
      },
      yaxis: { 
        show: true,
        labels:{
          style:{
            colors:'black'
          }
        }

      
      } // disable y-axis },
    } }
    type='bar' height={240} />
      </div>
    </div>
  );
}

export default ProjectDashboard03;
