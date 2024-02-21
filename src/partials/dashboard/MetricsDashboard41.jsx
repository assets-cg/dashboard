// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {API_URL, Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import MetricsDashboard42 from './MetricsDashboard42';
import MetricsDashboard43 from './MetricsDashboard43';
import Alert from '@mui/material/Alert';
import axios from 'axios';
// import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api } from '../../config';

Chart.register(CategoryScale);

const MetricsDashboard41 = ({startDate, endDate, interval}) => {

  //   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const api = location.state?.api;
  //  const jobName = location.state?.data2;

  
  console.log(startDate);
  console.log(endDate);
 
  // console.log(apiName)
  console.log(api)
  // console.log(apiName)
  

  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'));
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [currentValue, setCurrentValue] = useState();
  const [limit, setLimit] =useState([]);

  // const [apiName,setApiName]=useState(api);
  const [lab,setLab]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      console.log(jobName)
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=http_server_requests_seconds_count{uri="/dashboardKPI/V1/${api}", job="${jobName}"}[5d]`);
      // console.log(result)
      const result2 = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      const data2 = await result.json();
      const thresholds = await result2.json();
      setLimit(thresholds)
      // console.log(data2.data.result)
      setLab(data2.data.result[0].values)
      const results = data2.data.result;
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
        const time = date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
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
      if(limit[i].graphName.includes("HTTP Request Count")){
         miniVal.push( limit[i].minVal)
         mxVal.push(limit[i].maxVal)
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)
    //  setJobs(jobName)
    //  setApiName(api)
    };
    fetchData();
  }, [data, jobName, startDate, endDate,api, interval, limit, minVal, maxVal, currentValue]);

  console.log(currentValue)

  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `HTTP Request Count`
  
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

  // if ( currentValue >= maxVal[0]) {
  //   novu.trigger('dashboardkpi-notifications',
  //    { to:
  //      { subscriberId: "on-boarding-subscriber-id-123" }, 
  //     payload:{ 
  //       GraphName:"HTTP Request Count",
  //       limit : "max value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value:`${maxVal[0]}` },
  //      });
  //   }
  // else if ( currentValue >= minVal[0]) {
  //   novu.trigger('dashboardkpi-notifications',
  //    { to:
  //      { subscriberId: "on-boarding-subscriber-id-123" }, 
  //     payload:{ 
  //       GraphName:"HTTP Request Count",
  //       limit : "min value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}` },
  //      });
  //     } 
      
  const chartData = {
    labels: data.map(({ time }) => time),
    datasets: [
      {
        label: 'Http Request Counts',
        data: data.map(({ count }) => count),
        fill: true,
        borderColor:
        currentValue > maxVal[0]
     ? '#c90f08'
     : currentValue > minVal[0]
     ? '#f27311'
     : '#0fa63a',
        lineTension: 0.3,
        pointRadius: 0
      }
    ]
  };

  const getStepSize = () => {
    switch (interval) {
      case "5":
        return 5 // 5 in milliseconds
      case "15":
        return 15 // 15 in milliseconds
      case "30":
        return 30 // 30 in milliseconds
      case "60":
        return 60 // 1 hour in milliseconds
      default:
        return 15 // default step size is 15 minutes
    }
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
    <div className="col-span-full xl:col-span-7 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600  scrollTable9 ">
    <div className="col-span-full xl:col-span-7 bg-custom2  p-5 h-80 scrollTable4 ">
      <div><h2 style={{fontWeight:'600' , color:'black'}}>HTTP Request Count for {api}</h2></div>
      {api ?<Line data={chartData} options={chartOptions} height={350} />  : <div className='absolute right-40 mt-20'>
            {modalOpen && (
        <Stack sx={{ width: '100%' }} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>Choose an API Please!</strong></Alert>
      </Stack>     )}
      </div>}
         </div>  
         <div>
         <MetricsDashboard42 startDate={startDate} endDate={endDate} interval={interval} />
            </div> 
            <div>
         <MetricsDashboard43 startDate={startDate} endDate={endDate} interval={interval}/>
            </div>
            </div>  );
};
export default MetricsDashboard41;

