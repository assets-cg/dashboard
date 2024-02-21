// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
Chart.register(CategoryScale);

const MetricsDashboard47 = () => {
  const location = useLocation();
  // console.log(location, " useLocation Hook");
  // const jobName = location.state?.dat
  const [data, setData] = useState([]);
  const [startUp, setStartUp] = useState();
  // const [jobs, setJobs] = useState(jobName);
//   const [sum, setSum] = useState([]);
//   const [avg , setAvg] = useState([]);
  const [lab,setLab]=useState([]);
  const jobName=localStorage.getItem('jobName')
  const [modalOpen, setModalOpen] = useState(true);

  
  // console.log(jobName)

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=process_uptime_seconds{job="${jobName}"}[6h]`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=process_start_time_seconds{job="${jobName}"}[6h]`)
      const data2 = await result.json();
      const data3 = await result2.json();
    //   // console.log(data2)
      // console.log(data3)
    //   setLab(data2.data.result[0].values)
      const results = data2.data.result;
      const startTime = new Date( data3.data.result[0].values[0][1]*1000);
      const stTime = startTime.getHours();
      const currentTime =  Date.now();
      const currTime = new Date(currentTime);
      setStartUp(parseInt(currTime.getHours()) - parseInt(stTime));
      // console.log(startUp)
      // console.log(currTime.getHours());

    
      // Convert the timestamp data to readable time and filter by minutes and seconds being zero
      const filteredData = results[0].values
      .map(([timestamp, count]) => {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours();
        // If the current timestamp hour is not a multiple of 1, return null so that it is not displayed on the chart
        if (hour % 1 !== 0) {
          return null;
        }
        // for(let i=0;i<filteredData.length();i++){
        //   if()
        // }
        return { time: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), count };
      })
      .filter((dataPoint) => dataPoint !== null);
      // console.log(filteredData[0].time)
      let prevTime = '';
      
      for(let i=0;i<filteredData.length;i++){
        if(filteredData[i].time !== prevTime) {
          sCom.push(filteredData[i]);
          prevTime = filteredData[i].time;
        }
      } 
      
      sCom.push(filteredData[filteredData.length-1])
      // // console.log(data2)
     setData(sCom);
    //  for(let i=0;i<data.length;i++){
    //     setSum(sum+data[i].count)
    //     } 
    //     setAvg(sum/(data.length))

    //     // console.log(sum)
    //     // console.log(avg)
    };
    fetchData();
  }, [data, jobName]);
  // console.log(data)
  // console.log(startUp)
  const values = data.map(count => count.count)
  // console.log(values.length)
//   const sum = values.reduce((total, value) => total + value, 0);
  let sum = 0;
  for (let i = 0; i < values.length; i++) 
  {sum += parseFloat(values[i]);}
  // console.log(sum)
  const average = sum / values.length;
  // console.log(average)
  const min = average/3600;
  // console.log(min + "Hours")

  const handleCloseModal = () => {
    setModalOpen(false);
    // console.log("close");
  }

//   var sum = 0; 
//   var avg = 0;
//   // console.log(sum)
//   avg = sum/data.length;
//   // console.log(avg)

  return (
    <div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl ">
      <div className="px-5 pt-5 app-timing">
        <header className="flex justify-between items-start mb-1">
        </header>
        <h2 style={{textAlign:'center', fontSize:'20px', color:'black'}} className="text-lg font-semibold text-slate-800 mb-1">Container Up-Time</h2>
        <div style={{textAlign:'center',marginTop:'-5px', width:'100%'}} >
        {jobName ?<h1 className='mr-6' style={{padding:'4%',textAlign:'center',fontSize:'28px',color:'green', fontWeight:'800' }}>{min.toFixed(1) + " hours"}</h1> : <div>
            {modalOpen && (
        <Stack sx={{ width: '100%' }} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>Choose a container Please!</strong></Alert>
      </Stack>     )}
      </div>}
        </div>
        <h2 style={{textAlign:'center', fontSize:'20px', color:'black'}} className="text-lg font-semibold text-slate-800 mb-1">Container Start-Time</h2>
        <div style={{textAlign:'center',marginTop:'2px', width:'100%'}} >
        {jobName ?<h1 className='mr-6' style={{padding:'4%',textAlign:'center',fontSize:'28px',color:'green', fontWeight:'800' }}>{startUp + " hours ago"}</h1> : <div>
            {modalOpen && (
        <Stack sx={{ width: '100%' }} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>Choose a container Please!</strong></Alert>
      </Stack>     )}
      </div>}
        </div>
      </div>
    </div>    );
};
export default MetricsDashboard47;
