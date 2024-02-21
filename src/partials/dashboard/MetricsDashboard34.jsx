// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
Chart.register(CategoryScale);
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api, API_URL } from '../../config';
// Configure the SendGrid API key
sgMail.setApiKey('SG.BcWnozbuTYq2uR3ueK9XgQ.CiRAMyhEosNkne7cZCHpGQUgiM3DZGOLUjKE4RkSEj');

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const MetricsDashboard34 = ({startDate, endDate}) => {

    //   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const recipients = ['vedant-pravin.yerpude@capgemini.com'];
  // const jobName = location.state?.data;
  const min = location.state?.min1;
  const max = location.state?.max1;

  const [id, setId] = useState(["direct"]);
  const [data, setData] = useState([1]);
  const [minVal, setMinVal] = useState([]);
  const [maxVal, setMaxVal] = useState([]);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
  const [currentValue, setCurrentValue] = useState();
  const [currentValue2, setCurrentValue2] = useState();
  const [threshold, setThreshold] = useState();
  const [data1, setData1] = useState([1]);
  const [lab,setLab]=useState([]);
  const [limit, setLimit] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

const handleClick = event => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const sCom2=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_buffer_memory_used_bytes{id="${id}",job="${jobName}"}[5d]`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_buffer_total_capacity_bytes{id="${id}",job="${jobName}"}[5d]`);
      // console.log(result)
      const allThresholds = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
     
      const data2 = await result.json();
      const data3 = await result2.json();
      const thresholds = await allThresholds.json();
      console.log(thresholds)
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
        const time = date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        return { time, count:parseFloat(count)*0.000001,color:parseFloat(count)*0.000001 < minVal ? '#8af2a1' : parseFloat(count)*0.000001 > maxVal ? '#fc6a68' : '#f59c58' };
      })
      .filter((dataPoint) => dataPoint !== null)
      .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
      console.log(filteredData[0].time)
     setData(filteredData);

     const counts = filteredData.map(({ count }) => count); 
     setCurrentValue(counts[counts.length - 1]);


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
        const time = date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        return { time, count:parseFloat(count)*0.000001,color:parseFloat(count)*0.000001 < minVal ? '#0fa63a' : parseFloat(count)*0.000001 > maxVal ? '#c90f08' : '#f27311' };
      })
      .filter((dataPoint) => dataPoint !== null)
      .sort((a, b) => new Date(a.time) - new Date(b.time)); // sort by date ascending
      console.log(filteredData2[0].time)
     setData1(filteredData2);
     const counts2 = filteredData2.map(({ count }) => count); 
    setCurrentValue2(counts2[counts2.length - 1]);

    const miniVal = [];
    const mxVal = [];

    for(let i=0; i<limit.length; i++){
     if("Memory for direct/mapped buffers" === limit[i].graphName){
        miniVal.push( limit[i].minVal)
        mxVal.push(limit[i].maxVal)
     
   }
 }
     setMinVal(miniVal)
     setMaxVal(mxVal)

    };
    fetchData();
  }, [id, data, data1,jobName, startDate, endDate, minVal, maxVal, currentValue, currentValue2, limit]);
  console.log(limit)

  // if (currentValue > max && !emailSent) {

  //   // Send the email
  //   const msg = {
  //     to: recipients,
  //     from: 'vivek-sunil.pawar@capgemini.com',
  //     subject: 'Threshold exceeded',
  //     text: `The threshold of ${maxVal} has been exceeded. The current value is ${currentValue} for ${id} buffers Graph.`,
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
  //     // setCounter(counter => counter + 1);
  //  }

  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `Memory for ${id} buffers Used`
  
    if (currentValue >= minVal[0]) {
      const limitOf = "min value"
      const value =  `${minVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
  
    }if(currentValue >= maxVal[0]){
      const limitOf = "max value"
      const value =  `${maxVal[0]}`
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
    const graphName = `Memory for ${id} buffers Capacity`
  
    if (currentValue2 >= minVal[0]) {
      const limitOf = "min value"
      const value =  `${minVal[0]}`
      const response = await fetch(`${API_URL}triggernovualert?apiKey=${Novu_Api}&subscriberId=on-boarding-subscriber-id-123&limit=${limitOf}&value=${value}&graphName=${graphName}&containerName=${localStorage.getItem("conatinerName")}&emails=${emailParam}`,{
        method: 'POST',
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     })
  
    }if(currentValue2 >= maxVal[0]){
      const limitOf = "max value"
      const value =  `${maxVal[0]}`
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
  //       GraphName:`Memory for ${id} buffers Used`,
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
  //       GraphName:`Memory for ${id} buffers Used`,
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
      //       GraphName:`Memory for ${id} buffers Capacity`,
      //       limit : "max value",
      //       value:`${maxVal[0]}` },
      //      });
      //   }
      // else if ( currentValue2 >= minVal[0]) {
      //   novu.trigger('dashboardkpi-notifications',
      //    { to:
      //      { subscriberId: "on-boarding-subscriber-id-123" }, 
      //     payload:{ 
      //       GraphName:`Memory for ${id} buffers Capacity`,
      //       limit : "min value",
      //       value: `${minVal[0]}` },
      //      });
      //     } 

  const chartData = {
    labels: data.map(({ time }) => time),


    datasets: [
      {
        label: 'Used MegaBytes',
        data: data.map(({ count }) => count),
        fill: true,
        borderColor:(data[data.length-1].color),
        lineTension: 0.3,
        pointRadius: 0
      },
      {
        label: 'Capacity MegaBytes',
        data: data1.map(({ count }) => count),
        fill: true,
        borderColor:(data1[data1.length-1].color),
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
    <div className="col-span-full xl:col-span-7 bg-custom2 shadow-2xl border-solid border-2 border-green-600 p-6 h-80 rounded-3xl">
      <div style={{display:'flex'}}><h2 style={{fontWeight:'600', color:'black'}}> Memory for {id} buffers </h2>&nbsp;&nbsp;

<header className="flex justify-between items-start">
    {/* Icon */}
    {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}

    <button className="btn bg-green-500 hover:bg-green-700 text-white p-1"
  aria-controls="days-menu"
  aria-haspopup="true"
  onClick={handleClick}
  
>

Selected {id} buffers↓ </button>
<Menu
  id="days-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem className={classes.link} onClick={() => setId("direct")} >
    Direct
  </MenuItem>
  <MenuItem className={classes.link} onClick={() => setId("mapped")}>
    Mapped
  </MenuItem>
</Menu> 
   
  </header>
</div>
 <Line data={chartData} options={chartOptions} height={280} />  
   </div>     );
};
export default MetricsDashboard34;