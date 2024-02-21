// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import LineChart from '../../charts/LineChart01';
import EditMenu from '../EditMenu';
import ReactSpeedometer from "react-d3-speedometer"
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import {Prom_Url, API_URL} from '../../config';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
import sgMail from '@sendgrid/mail';
import { Novu } from '@novu/node';
import axios from 'axios';
import { Novu_Url, Novu_Api } from '../../config';
// Configure the SendGrid API key
sgMail.setApiKey('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');

const useStyles = makeStyles(theme => ({
    link: {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  }));

const MetricsDashboard32 = ({startDate, endDate}) => {

//   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  // const jobName = location.state?.data;
  const min = location.state?.min1;
  const max = location.state?.max1;
  
  const [id, setId] = useState("Metaspace");
  const recipients = ['vedant-pravin.yerpude@capgemini.com'];
  const [data, setData] = useState([1]);
  const [currentValue, setCurrentValue] = useState();
  
  const [threshold, setThreshold] = useState();
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
  const [lab,setLab]=useState([]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

const handleClick = event => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=jvm_memory_committed_bytes{id="${id}", area="nonheap", job="${jobName}"}[5d]`);
      const result2 = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      // console.log(result)
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
        const time = date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
        return { time, count:parseFloat(count)*0.000001,color:parseFloat(count)*0.000001 < minVal ? '#0fa63a' : parseFloat(count)*0.000001 > maxVal ? '#c90f08' : '#f27311' };
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

     for(let i=0; i<lab.length; i++){
      if(`${id} (Non-Heap)` === lab[i].graphName){
         miniVal.push( lab[i].minVal)
         mxVal.push(lab[i].maxVal)
      
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)
    };
    fetchData();
  }, [lab, id, data, currentValue, minVal, maxVal, startDate, endDate, jobName]);

  // if (currentValue > max && !emailSent) {

  //   // Send the email
  //   const msg = {
  //     to: recipients,
  //     from: 'vivek-sunil.pawar@capgemini.com',
  //     subject: 'Threshold exceeded',
  //     text: `The threshold of ${maxVal} has been exceeded. The current value is ${currentValue} for ${id} Non Heap Graph.`,
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
    const graphName = `${id} Non-Heap `
  
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
  //       GraphName:`${id} Non-Heap `,
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
  //       GraphName:`${id} Non-Heap `,
  //       limit : "min value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}` },
  //      });
  //     } 
  

  console.log(data)

  const chartData = {
    labels: data.map(({ time }) => time),
    datasets: [
      {
        label:  'Space in MegaBytes',
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
    <div className="col-span-full xl:col-span-7 bg-custom2 shadow-2xl border-solid border-2 border-green-600 p-6 h-80 rounded-3xl ">
      <div style={{display:'flex'}}><h2 style={{fontWeight:'600', color:'black'}}>{id} (Non-Heap) </h2>&nbsp;&nbsp;

      <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}

          <button className="btn bg-green-500 hover:bg-green-700 text-white p-1"
        aria-controls="days-menu"
        aria-haspopup="true"
        onClick={handleClick}
        
      >

Selected {id}↓ </button>
      <Menu
        id="days-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  className={classes.link} onClick={() => setId("Metaspace")} >
          MetaSpace
        </MenuItem>
        <MenuItem  className={classes.link} onClick={() => setId("Compressed Class Space")}>
          CompressedClass
        </MenuItem>
        <MenuItem  className={classes.link} onClick={() => setId("Code Cache")}>
          CodeCache
        </MenuItem>
      </Menu> 
         
        </header>
      </div>
       <Line data={chartData} options={chartOptions} height={350} />  
         </div>     );
};
export default MetricsDashboard32;
