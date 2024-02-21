// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sgMail from '@sendgrid/mail';
// Configure the SendGrid API key
sgMail.setApiKey('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');
// Define the threshold and the email recipients
// const threshold = 100;
// const recipients = ['vedant-pravin.yerpude@capgemini.com', 'vivek-sunil.pawar@capgemini.com'];
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import {Prom_Url, API_URL} from '../../config';
// import CheckThresholdAndSendEmail from '../../pages/CheckThresholdAndSendEmail';
import Chart from 'chart.js/auto';
import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api } from '../../config';
import axios from 'axios';

Chart.register(CategoryScale);


const MetricsDashboard45 = ({ startDate, endDate}) => {

//   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

 const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  // console.log(location, " useLocation Hook");
  // const jobName = location.state?.data;
  const [currentValue, setCurrentValue] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const [threshold, setThreshold] = useState();

  // console.log(startDate)
  // console.log(endDate)



  // let thresholdReached = false;
  // if (currentValue > threshold && !thresholdReached) {
  //   toast.error(`Threshold reached in CPU Usage`, {
  //    autoClose: 2000, // The toast will disappear after 5 seconds
  //  });
  //   thresholdReached = true;
  // }
  const api = location.state?.data;


  const [data, setData] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [lab,setLab]=useState([]);
  const jobName=localStorage.getItem('jobName')
  const [modalOpen, setModalOpen] = useState(true);

  const cachedData = useMemo(() => {
    const cacheKey = `${jobName}-${startDate}-${endDate}`;
    const cachedResult = localStorage.getItem(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
    return null;
  }, [jobName, startDate, endDate]);

  
  //    {{GraphName}} threshold exceeded {{limit}} of {{value}}

  useEffect(() => {

    const cacheKey = `${jobName}-${startDate}-${endDate}`;
    const cachedResult = localStorage.getItem(cacheKey);
  
    if (cachedResult) {
      const cachedData = JSON.parse(cachedResult);
  
      // Check if the cached data is still valid based on the time range
      const isCacheValid =
        cachedData.startDate === startDate &&
        cachedData.endDate === endDate &&
        cachedData.jobName === jobName;
  
      if (isCacheValid) {
        setData(cachedData.filteredData);
        setCurrentValue(cachedData.currentValue);
        setMinVal(cachedData.minVal);
        setMaxVal(cachedData.maxVal);
        return;
      } else {
        // Clear the cache if the time range or job name has changed
        localStorage.removeItem(cacheKey);
      }
    }

    // console.log(jobName)
    const fetchData = async () => {
      const sCom=[];
      // console.log("The job name is " + jobName)
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=system_cpu_usage{job="${jobName}"}[5d]`);
  
      const result2 = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
  
      const data2 = await result.json();
      // console.log(data2)
      const thresholds = await result2.json();
      setLab(thresholds)
      const results = data2.data.result;
      // console.log(results);
      // const valMap = results.map(i=>i)
      // console.log(valMap);
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
    const time = date.toLocaleString('en-US', { year:'numeric' ,month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    return { time, count };
  })
  .filter((dataPoint) => dataPoint !== null)
  .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
      // console.log(filteredData)

     setData(filteredData);

     const counts = filteredData.map(({ count }) => count); 
     setCurrentValue(counts[counts.length - 1]);


     const miniVal = [];
     const mxVal = [];

     for(let i=0; i<lab.length; i++){
      if(`CPU Usage` === lab[i].graphName){
         miniVal.push( lab[i].minVal)
         mxVal.push(lab[i].maxVal)
      
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)

      const dataToCache = {
        filteredData,
        currentValue: counts[counts.length - 1],
        minVal,
        maxVal,
        startDate,
        endDate,
        jobName,
      };
      localStorage.setItem(cacheKey, JSON.stringify(dataToCache));


    };
    fetchData();
  }, [data, jobName, minVal, maxVal, startDate, endDate, currentValue]);

  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = "CPU Usage"

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

  // if ( currentValue >= minVal[0]) {
  //   novu.trigger('dashboardkpi-notifications',
  //    { to:
  //      { subscriberId: "on-boarding-subscriber-id-123" }, 
  //     payload:{ 
  //       GraphName:"CPU Usage",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       limit : "min value",
  //       value: `${minVal[0]}` },
  //      });
  //     }

  //     if ( currentValue >= maxVal[0]) {
  //       novu.trigger('dashboardkpi-notifications',
  //        { to:
  //          { subscriberId: "on-boarding-subscriber-id-123" }, 
  //         payload:{ 
  //           GraphName:"CPU Usage",
  //           limit : "max value",
  //           containerName: `${localStorage.getItem("conatinerName")}`,
  //           value:`${maxVal[0]}` },
  //          });
  //       }

  const chartData = {
    labels: data.map(({ time }) => time),
    datasets: [
      {
        label: 'CPU Usage %',
        data: data.map(({ count }) => count),
        fill: true,
        borderColor:
        currentValue > maxVal[0]
        ? '#c90f08'
        : currentValue > minVal[0]
            ? '#f27311'
            : '#0fa63a',
        lineTension: 0.1,
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
    <>
    
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl p-5 h-80 rounded-3xl border-solid border-2 border-green-600  scrollTable4 ">
    {/* <ToastContainer/> */}
      <div><h2 style={{fontWeight:'600', color:'black'}}>CPU Usage</h2></div>
      {jobName ? <Line data={chartData} options={chartOptions} height={350} /> : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%' }} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>Choose a container Please!</strong></Alert>
      </Stack>     )}
      </div>}
      
         </div>
         
    </> );
};
export default MetricsDashboard45;
