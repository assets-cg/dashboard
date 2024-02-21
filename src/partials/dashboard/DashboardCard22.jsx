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
function DashboardCard22() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)
  const [sprintName, setSprintName]= useState([]);
  const [scopeChange,setscopeChange]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sSprintName=[];
   const sScopeChange=[];
//    const sPercentage=[];
   const getScopeChange= async()=>{
   const reqData= await fetch(`${API_URL}scopechange?project=${data2}&boardID=${data}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.sprints.length;i++){
    sSprintName.push(resData.sprints[i].sprintName);
    sScopeChange.push(resData.sprints[i].scopeChange);
   }   
   setSprintName(sSprintName);
   setscopeChange(sScopeChange);
   }
   getScopeChange();
},[]);
console.log(sprintName);
console.log(scopeChange);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-2xl rounded-3xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Scope Change For Active Sprint</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      <ReactApexChart
      series={[{
        data: scopeChange,
        name: "Scope Change"
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
        text: "ScopeChange(in %)",
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
        show: true
      },
      xaxis: {
        categories: sprintName,
        title:{
          text: "SprintName",
          offsetX: 0,
          offsetY: 80,
                  },
        labels: {
          style: {
            // colors: colors,
            fontSize: '12px'
          }
        }
      }
    } }
    type='bar'  height={300} />
    </div>
    </div>
  );
}
export default DashboardCard22;