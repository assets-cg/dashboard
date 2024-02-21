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

const MetricsDashboard40 = () => {
  const location = useLocation();
  console.log(location, " useLocation Hook");


  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
//   const [sum, setSum] = useState([]);
//   const [avg , setAvg] = useState([]);
  const [lab,setLab]=useState([]);

  useEffect(() => {
    const sCom=[];
      const sCom2=[];
    const fetchData = async () => {
      const sCom=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=hikaricp_connections{job="${jobName}", pool="HikariPool-1"}`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=hikaricp_connections_timeout_total{job="${jobName}", pool="HikariPool-1"}`)
      const data2 = await result.json();
      const data3 = await result2.json();
    //   console.log(data2)
      console.log(data3)
      const results = data2.data.result;
      const results2 = data3.data.result;
      // Convert the timestamp data to readable time and filter by minutes and seconds being zero
      const filteredData = results[0].value[1]
      console.log(results[0].value[1])
      sCom.push(filteredData)
      // console.log(data2)
     setData(sCom);

     const filteredData2 = results2[0].value[1]
     console.log(results2[0].value[1])
      sCom2.push(filteredData2)
     setData1(sCom2);

    };
    fetchData();
  }, [data, data1,jobName]);
  console.log(data1)
  console.log(data1)
//   var sum = 0; 
//   var avg = 0;
//   console.log(sum)
//   avg = sum/data.length;
//   console.log(avg)

  return (
    <div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-3 bg-custom2 shadow-2xl h-60 border-solid border-2 border-green-600 rounded-3xl">
        <header className="flex justify-between items-start mb-2">
        </header>
        <h2 style={{textAlign:'center', fontSize:'14px', color:'black'}} className="text-lg font-semibold text-slate-800 ">Connection Size</h2>
        <div style={{textAlign:'center',marginTop:'10px', width:'90%'}} >
            <h1 style={{padding:'5%',textAlign:'center',fontSize:'35px',color:'#6fbf65', fontWeight:'900' }}>{data}</h1>
        </div>
        <h2 style={{textAlign:'center', fontSize:'14px', color:'black'}} className="text-lg font-semibold text-slate-800 ">Connection Timeout Count</h2>
        <div style={{textAlign:'center',marginTop:'10px', width:'90%'}} >
            <h1 style={{padding:'5%',textAlign:'center',fontSize:'35px',color:'#4ab33e', fontWeight:'900' }}>{data1}</h1>
      </div>
    </div>    );
};
export default MetricsDashboard40;
