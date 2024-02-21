// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Prom_Url, API_URL} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
import axios from 'axios';
import sgMail from '@sendgrid/mail';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api } from '../../config';
// Configure the SendGrid API key
sgMail.setApiKey('SG.BcWnozbuTYq2uR3ueK9XgQ.CiRAMyhEosNkne7cZCHpGQUgiM3DZGOLUjKE4RkSEj');

const MetricsDashboard38 = ({startDate, endDate}) => {

  //   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const recipients = ['vedant-pravin.yerpude@capgemini.com'];
  const min = location.state?.min1;
  const max = location.state?.max1;

  const [data, setData] = useState([1]);
  const [currentValue, setCurrentValue] = useState();
  const [threshold, setThreshold] = useState();
  const [minVal, setMinVal] = useState([]);
  const [maxVal, setMaxVal] = useState([]);
  const [limit, setLimit] = useState([]);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
  const [lab,setLab]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_gc_live_data_size_bytes{job="${jobName}"}[5d]`);
      // console.log(result)
      const result2 = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      const data2 = await result.json();
      const thresholds = await result2.json();
      setLimit(thresholds);

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
    
          //console.log("AAAAAAAAAAAAAAAAAA");
    
        }
    
        // If the current timestamp hour is not a multiple of 1, return null so that it is not displayed on the chart
        if (hour % 1 !== 0) {
          return null;
        }
    
        // Move the common code outside of the if/else blocks
        const time = date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        return { time,  count:parseFloat(count)*0.000001,color:parseFloat(count)*0.000001 < minVal ? '#8af2a1' : parseFloat(count)*0.000001 > maxVal ? '#fc6a68' : '#f59c58' };
      })
      .filter((dataPoint) => dataPoint !== null)
      .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
      console.log(filteredData[0].time)
     setData(filteredData);

     const counts = filteredData.map(({ count }) => count); 
     setCurrentValue(counts[counts.length - 1]);

     const miniVal = [];
     const mxVal = [];

     for(let i=0; i<limit.length; i++){
      if("GC Live Data Size" === limit[i].graphName){
         miniVal.push( limit[i].minVal)
         mxVal.push(limit[i].maxVal)
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)
    };
    fetchData();
  }, [data, jobName, startDate, endDate, minVal, maxVal, limit, currentValue]);
  console.log(data)

  // if (currentValue > max && !emailSent) {

  //   // Send the email
  //   const msg = {
  //     to: recipients,
  //     from: 'vivek-sunil.pawar@capgemini.com',
  //     subject: 'Threshold exceeded',
  //     text: `The threshold of ${maxVal} has been exceeded. The current value is ${currentValue} for GC Live Data size Graph.`,
  //   };
   
  //   const sendEmail = () => {
  //     sgMail
  //       .send(msg)
  //       .then(() => {
  //         console.log('Email sent');
  //         emailSent = true;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //     }
  //     sendEmail();
  //     setCounter(counter => counter + 1);
  //  }

  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `GC Live Data Size`
  
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
  //       GraphName:"GC Live Data Size",
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
  //       GraphName:"GC Live Data Size",
  //       limit : "min value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}` },
  //      });
  //     } 
      


  const chartData = {
    labels: data.map(({ time }) => time),
    datasets: [
      {
        label: 'Data size in MegaBytes',
        data: data.map(({ count }) => count),
        fill: true,
        borderColor:(data[data.length-1].color),
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
    <div className="col-span-full xl:col-span-5 shadow-2xl p-5 h-80 border-solid border-2 border-green-600 bg-custom2 rounded-3xl scrollTable4 ">
      <div><h2 style={{fontWeight:'600', color:'black'}}>GC Live Data Size </h2></div>
       <Line data={chartData} options={chartOptions} height={350} />  
         </div>     );
};
export default MetricsDashboard38;