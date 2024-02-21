// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import {Prom_Url, API_URL} from '../../config';
import Chart from 'chart.js/auto';
import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api } from '../../config';
import axios from 'axios';

Chart.register(CategoryScale);

const MetricsDashboard44 = ({ startDate, endDate}) => {

//   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  // console.log(location, " useLocation Hook");
  
  // console.log(startDate)
  // console.log(endDate)

  const [data, setData] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [currentValue, setCurrentValue] = useState();
  const [lab,setLab]=useState([]);
  const jobName=localStorage.getItem('jobName')
  const [modalOpen, setModalOpen] = useState(true);
  const memoizedData = useMemo(() => data, [data]);
  const memoizedMinVal = useMemo(() => minVal, [minVal]);
  const memoizedMaxVal = useMemo(() => maxVal, [maxVal]);
  const memoizedLab = useMemo(() => lab, [lab]);

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=process_files_open_files{job="${jobName}"}[5d]`);
      const result2 = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      // console.log(result)
      console.log(localStorage.getItem("token"));
      const data2 = await result.json();
      const thresholds = await result2.json();
      setLab(thresholds)
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
        const time = date.toLocaleString('en-US', { year:'numeric',month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        return { time, count };
      })
      .filter((dataPoint) => dataPoint !== null)
      .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
      // console.log(filteredData[0].time)
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

     for(let i=0; i<lab.length; i++){
      if(lab[i].graphName.includes("Process Open Files")){
         miniVal.push( lab[i].minVal)
         mxVal.push(lab[i].maxVal)
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)
    };
    fetchData();
  }, [memoizedData, jobName, memoizedMinVal, memoizedMaxVal, startDate, endDate]);

  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `Process Open Files`
  
    if (currentValue >= maxVal[0]) {
      console.log('--------Enter in MinValue-------------')
      const limitOf = "max value"
      const value =  `${maxVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
    
     const message = await response.text();
     console.log(message);
  
    }else if(currentValue >= minVal[0]){
      console.log('--------Enter in MaxValue-------------')
      const limitOf = "min value"
      const value =  `${minVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }


     
     })
     const message = await response.text();
     console.log(message);
  
    }
  }
  fetchNotification();


  // if ( currentValue >= maxVal[0]) {
  //   novu.trigger('dashboardkpi-notifications',
  //    { to:
  //      { subscriberId: "on-boarding-subscriber-id-123" }, 
  //     payload:{ 
  //       GraphName:"Process Open Files",
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
  //       GraphName:"Process Open Files",
  //       limit : "min value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}` },
  //      });
  //     } 
      
      


  const chartData = {
    labels: data.map(({ time }) => time),
    datasets: [
      {
        label: 'No. of Files Opened',
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
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl p-5 h-80 rounded-3xl border-solid border-2 border-green-600  scrollTable4 ">
      <div><h2 style={{fontWeight:'600', color:'black'}}>Process Open Files</h2></div>
      {jobName ? <Line data={chartData} options={chartOptions} height={350} /> : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>Choose a container Please!</strong></Alert>
      </Stack>     )}
      </div>}
         </div>     );
};
export default MetricsDashboard44;
