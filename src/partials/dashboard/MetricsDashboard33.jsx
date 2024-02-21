// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api, API_URL } from '../../config';
Chart.register(CategoryScale);


const MetricsDashboard33 = ({startDate, endDate}) => {

  //   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  // const jobName = location.state?.data;
  const min = location.state?.min1;
  const max = location.state?.max1;

  const [data, setData] = useState([]);
  const [currentValue, setCurrentValue] = useState();
  const [currentValue2, setCurrentValue2] = useState();
  const [threshold, setThreshold] = useState();
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
  const [data1, setData1] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [lab,setLab]=useState([]);
  const [limit, setLimit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const sCom2=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_classes_loaded_classes{job="${jobName}"}[5d]`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_classes_unloaded_classes_total{job="${jobName}"}[5d]`);
      // console.log(result)
      const allThresholds = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      const data2 = await result.json();
      const data3 = await result2.json();
      const thresholds = await allThresholds.json();
      setLimit(thresholds)
    
      // console.log(data2.data.result)

      const results = data2.data.result;
      const results2 = data3.data.result;
console.log(results + "and" + results2)
      // Convert the timestamp data to readable time and filter by minutes and seconds being zero
      const filteredData = results.flatMap(item => item.values)
      .map(([timestamp, count]) => {
        let date, hour;
    
        if(parseFloat(timestamp) >= parseFloat(startDate) && parseFloat(timestamp) <= parseFloat(endDate)){
          date = new Date(timestamp * 1000);
          hour = date.getHours();
    
         
    
        }
    
        // If the current timestamp hour is not a multiple of 1, return null so that it is not displayed on the chart
        if (hour % 1 !== 0) {
          return null;
        }
    
        // Move the common code outside of the if/else blocks
        const time = date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        return { time, count };
      })
      .filter((dataPoint) => dataPoint !== null)
      .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
      console.log(filteredData[0].time)
      // let prevTime = '';
      
      // for(let i=0;i<filteredData.length;i++){
      //   if(filteredData[i].time !== prevTime) {
      //     sCom.push(filteredData[i]);
      //     prevTime = filteredData[i].time;
      //   }
      // } 
      // sCom.push(filteredData[filteredData.length-1])
      // console.log(data2)
     setData(filteredData);

     const counts = filteredData.map(({ count }) => count); 
     setCurrentValue(counts[counts.length - 1]);

     const miniVal = [];
     const mxVal = [];

     for(let i=0; i<limit.length; i++){
      if("Classes Loaded/Unloaded" === limit[i].graphName){
         miniVal.push( limit[i].minVal)
         mxVal.push(limit[i].maxVal)
      
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)


     const filteredData2 = results2.flatMap(item => item.values)
     .map(([timestamp, count]) => {
       let date, hour;
   
       if(parseFloat(timestamp) >= parseFloat(startDate) && parseFloat(timestamp) <= parseFloat(endDate)){
         date = new Date(timestamp * 1000);
         hour = date.getHours();
   
       
   
       }
   
       // If the current timestamp hour is not a multiple of 1, return null so that it is not displayed on the chart
       if (hour % 1 !== 0) {
         return null;
       }
   
       // Move the common code outside of the if/else blocks
       const time = date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
       return { time, count };
     })
     .filter((dataPoint) => dataPoint !== null)
     .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
     console.log(filteredData2[0].time)
     // let prevTime = '';
     
     // for(let i=0;i<filteredData.length;i++){
     //   if(filteredData[i].time !== prevTime) {
     //     sCom.push(filteredData[i]);
     //     prevTime = filteredData[i].time;
     //   }
     // } 
     // sCom.push(filteredData[filteredData.length-1])
     // console.log(data2)
    setData1(filteredData2);
    const counts2 = filteredData2.map(({ count }) => count); 
    setCurrentValue2(counts2[counts2.length - 1]);

    
    };
    fetchData();
  }, [data, data1, minVal, maxVal, startDate, endDate, jobName, currentValue, currentValue2, limit]);
  console.log(currentValue + "and " + currentValue2 + "and " + maxVal + "& " + minVal)


  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `Classes Loaded`
  
    if (currentValue >= maxVal[0]) {
      const limitOf = "max value"
      const value =  `${maxVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
  
    }else if(currentValue >= minVal[0]){
      const limitOf = "min value"
      const value =  `${minVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
  
    }
  }
  fetchNotification();


  async function fetchNotification2() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `Classes Unloaded`
  
    if (currentValue2 >= maxVal[0]) {
      const limitOf = "max value"
      const value =  `${maxVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
  
    }else if(currentValue2 >= minVal[0]){
      const limitOf = "min value"
      const value =  `${minVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
  
    }
  }
  fetchNotification2();

  // if ( currentValue >= maxVal[0]) {
  //   novu.trigger('dashboardkpi-notifications',
  //    { to:
  //      { subscriberId: "on-boarding-subscriber-id-123" }, 
  //     payload:{ 
  //       GraphName:"Classes Loaded",
  //       limit : "max value",
  //       value:`${maxVal[0]}` },
  //      });
  //   }
  // else if ( currentValue >= minVal[0]) {
  //   novu.trigger('dashboardkpi-notifications',
  //    { to:
  //      { subscriberId: "on-boarding-subscriber-id-123" }, 
  //     payload:{ 
  //       GraphName:"Classes Loaded",
  //       limit : "min value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}` },
  //      });
  //     } 


      // if ( currentValue2 >= maxVal[0]) {
      //   novu.trigger('dashboardkpi-notifications',
      //    { to:
      //      { subscriberId: "on-boarding-subscriber-id-123" }, 
      //     payload:{ 
      //       GraphName:"Classes Unloaded",
      //       limit : "max value",
      //       containerName: `${localStorage.getItem("conatinerName")}`,
      //       value:`${maxVal[0]}` },
      //      });
      //   }
      // else if ( currentValue2 >= minVal[0]) {
      //   novu.trigger('dashboardkpi-notifications',
      //    { to:
      //      { subscriberId: "on-boarding-subscriber-id-123" }, 
      //     payload:{ 
      //       GraphName:"Classes Unloaded",
      //       limit : "min value",
      //       value: `${minVal[0]}` },
      //      });
      //     } 

  const chartData = {
    labels: data.map(({ time }) => time),


    datasets: [
      {
        label: 'Loaded Classes Count',
        data: data.map(({ count }) => count),
        fill: true,
        borderColor: currentValue > maxVal[0]
        ? '#fc6a68'
        : currentValue > minVal[0]
        ? '#f59c58'
        : '#8af2a1',
        lineTension: 0.3,
        pointRadius: 0
      },
      {
        label: 'Unloaded Classes Count',
        data: data1.map(({ count }) => count),
        fill: true,
        borderColor: currentValue2 > maxVal[0]
        ? '#c90f08'
        : currentValue2 > minVal[0]
        ? '#f27311'
        : '#0fa63a',
        lineTension: 0.3,
        pointRadius: 0
      }
    ]
  };
  // console.log(data)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10 // set the font size for x-axis labels
          }
        },
        // Set the interval to 1 hour
        type: 'time',

        time :{

          unit: 'minute',
          stepSize: localStorage.getItem("intervals"),

          displayFormats: {
            minute: 'MMM D, h:mm A' // specify the format for minute interval labels
          }

        },
        // time: {
      
        // },
        grid: {
          display: false // remove x-axis gridlines
        }
      },
      y: {
        ticks: {
          beginAtZero: false,
        },
        grid: {
          display: true // remove y-axis gridlines
        }
      }
    }
  };
  return (
    <div className="col-span-full xl:col-span-5 bg-custom2 shadow-2xlborder-solid border-2 border-green-600  p-6 h-80 rounded-3xl">
      <div><h2 style={{fontWeight:'600', color:'black'}}>Classes Loaded/Unloaded</h2></div>
       <Line data={chartData} options={chartOptions} height={350} />  
         </div>     );
};
export default MetricsDashboard33;