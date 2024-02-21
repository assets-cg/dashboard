// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';
Chart.register(CategoryScale);

const MetricsDashboard37 = ({startDate, endDate}) => {
  const location = useLocation();
  console.log(location, " useLocation Hook");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
  const [data0, setData0] = useState([])
  const [lab,setLab]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const sCom2=[];
      const sCom3=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_gc_pause_seconds_count{action="end of major GC", cause="Allocation Failure", job="${jobName}"}[5d]`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_gc_pause_seconds_count{action="end of major GC", cause="Metadata GC Threshold",job="${jobName}"}[5d]`);
      const result3 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_gc_pause_seconds_count{action="end of minor GC", cause="Allocation Failure",job="${jobName}"}[5d]`);
      // console.log(result)
      const data2 = await result.json();
      const data3 = await result2.json();
      const data4 = await result3.json();
      // console.log(data2.data.result)

      const results = data2.data.result;
      const results2 = data3.data.result;
      const results3 = data4.data.result;
      // Convert the timestamp data to readable time and filter by minutes and seconds being zero
      const filteredData = results.flatMap(item => item.values)
      .map(([timestamp, count]) => {
        let date, hour;
    
        if(parseFloat(timestamp) >= parseFloat(startDate) && parseFloat(timestamp) <= parseFloat(endDate)){
          date = new Date(timestamp * 1000);
          hour = date.getHours();
    
          //console.log("AAAAAAAAAAAAAAAAAA");
    
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
     setData(filteredData);

     const filteredData2 = results2.flatMap(item => item.values)
      .map(([timestamp, count]) => {
        let date, hour;
    
        if(parseFloat(timestamp) >= parseFloat(startDate) && parseFloat(timestamp) <= parseFloat(endDate)){
          date = new Date(timestamp * 1000);
          hour = date.getHours();
    
          //console.log("AAAAAAAAAAAAAAAAAA");
    
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

     setData1(filteredData2);

     const filteredData3 = results3.flatMap(item => item.values)
      .map(([timestamp, count]) => {
        let date, hour;
    
        if(parseFloat(timestamp) >= parseFloat(startDate) && parseFloat(timestamp) <= parseFloat(endDate)){
          date = new Date(timestamp * 1000);
          hour = date.getHours();
    
          //console.log("AAAAAAAAAAAAAAAAAA");
    
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
      console.log(filteredData3[0].time)
     setData0(filteredData3);
    };
    fetchData();
  }, [data, data1, data0,jobName, startDate, endDate]);
  console.log(data1)

  const chartData = {
    labels: data.map(({ time }) => time),


    datasets: [
      {
        label: 'end of major GC [Allocation Failure]',
        data: data.map(({ count }) => count),
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.3,
        pointRadius: 0
      },
      {
        label: 'end of major GC [Metadata GC Threshold]',
        data: data1.map(({ count }) => count),
        fill: true,
        borderColor: '#fa6b6b',
        lineTension: 0.3,
        pointRadius: 0
      },
      {
        label: 'end of minor GC [Allocation Failure]',
        data: data0.map(({ count }) => count),
        fill: true,
        borderColor: 'rgba(192,192,1)',
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
    <div className="col-span-full xl:col-span-12 bg-white shadow-2xl p-5 h-80 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl ">
      <div><h2 style={{fontWeight:'600', color:'black'}}>GC Counts</h2></div>
       <Line data={chartData} options={chartOptions} height={350} />  
         </div>
       );
};
export default MetricsDashboard37;