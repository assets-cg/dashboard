// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer';
import axios from 'axios';
import {Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
Chart.register(CategoryScale);

const MetricsDashboard49 = () => {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  // const jobName = location.state?.data;

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [startUp, setStartUp] = useState([]);
  const [heap, setHeap] = useState();
  const jobName=localStorage.getItem('jobName')
  const [modalOpen, setModalOpen] = useState(true);
//   const [sum, setSum] = useState([]);
//   const [avg , setAvg] = useState([]);
  const [lab,setLab]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_memory_used_bytes{job="${jobName}", area="nonheap"}[6h]`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_memory_max_bytes{job="${jobName}", area="nonheap"}[6h]`)
      const data2 = await result.json();
      const data3 = await result2.json();
    //   console.log(data2)
      console.log(data3)
    //   setLab(data2.data.result[0].values)
      const results = data2.data.result;
      const results2 = data3.data.result;
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

      const filteredData2 = results2[0].values
      .map(([timestamp, count]) => {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours();
        // If the current timestamp hour is not a multiple of 1, return null so that it is not displayed on the chart
        if (hour % 1 !== 0) {
          return null;
        }
        // for(let i=0;i<filteredData2.length();i++){
        //   if()
        // }
        return { time: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), count };
      })
      .filter((dataPoint) => dataPoint !== null);
      console.log(filteredData2[0].time)
     setData(filteredData);
     setData1(filteredData2);

     const values = data.map(count => count.count)
  console.log(values.length)
//   const sum = values.reduce((total, value) => total + value, 0);
  let sum = 0;
  for (let i = 0; i < values.length; i++) 
  {sum += parseFloat(values[i]);}
  console.log(sum)

  const values2 = data1.map(count => count.count)
  console.log(values2.length)
//   const sum = values.reduce((total, value) => total + value, 0);
  let sum2 = 0;
  for (let i = 0; i < values2.length; i++) 
  {sum2 += parseFloat(values2[i]);}
  console.log(sum2);

  setHeap((sum*100/sum2).toFixed(1));
    };
    fetchData();
  }, [data, heap, jobName]);
  console.log(heap)
  

//   var sum = 0; 
//   var avg = 0;
//   console.log(sum)
//   avg = sum/data.length;
//   console.log(avg)

  return (
    <div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 ">
      <div title='% of Non-Heap used by the Container: API(s)' className="px-5 pt-5 app-timing">
        <header className="flex justify-between items-start mb-1">
        </header>
        <h2 style={{textAlign:'center', fontSize:'15px'}} className="text-lg font-semibold text-slate-800 mb-1">Container: API(s) Non-Heap Used</h2>
        <div style={{marginTop:"15px", marginLeft:'10px'}}>
          {jobName ?
        <ReactSpeedometer
        maxValue={100}
        width={250}
        value={heap}
        currentValueText={heap  + "% (Non-Heap Used)"}
        needleColor="black"
        startColor="green"
        segments={10}
        endColor="red"
        valueTextStyling={{ fill: 'white' }}
        currentValueTextStyling={{ fill: 'white' }}
        />: <div>
        {modalOpen && (
    <Stack sx={{ width: '100%' }} spacing={2}>
 
    <Alert severity="error"> Alert — <strong>Choose a container Please!</strong></Alert>
  </Stack>     )}
  </div>}
        </div>
      </div>
    </div>    );
};
export default MetricsDashboard49;
