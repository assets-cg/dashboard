// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {Prom_Url} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api , API_URL} from '../../config';
Chart.register(CategoryScale);

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const MetricsDashboard52 = ({ startDate, endDate}) => {

     //   const config = { 
    //     backendUrl: `${Novu_Url}`,
   //  };

  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");

  const [id, setId] = useState(["creation"]);
  const [data, setData] = useState([]);
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'))
  const [data1, setData1] = useState([]);
  const [main, setMain] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [currentValue, setCurrentValue] = useState();
  const [maxVal, setMaxVal] = useState(0);
  const [limit, setLimit] =useState([]);
  const [lab,setLab]=useState([]);
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
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=hikaricp_connections_${id}_seconds_sum{job="${jobName}", pool="HikariPool-1"}[5d]`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=hikaricp_connections_${id}_seconds_count{job="${jobName}", pool="HikariPool-1"}[5d] `);
      // console.log(result)
      const allThresholds = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      
      const data2 = await result.json();
      const data3 = await result2.json();
      const thresholds = await allThresholds.json();
      setLimit(thresholds)
      // console.log(data2.data.result)

      const results = data2.data.result;
      const results2 = data3.data.result;
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


     const divisionData = [];
     let i = 0;
     let j = 0;
     
     while (i < data.length && j < data1.length) {
       if (data[i].time === data1[j].time) {
         divisionData.push({ 
           time: data[i].time,
           count: (data[i].count / data1[j].count )*1000
         });
         i++;
         j++;
       } else if (data[i].time < data1[j].time) {
         i++;
       } else {
         j++;
       }
     }
console.log(divisionData);
     setMain(divisionData);

     const counts = divisionData.map(({ count }) => count); 
     setCurrentValue(counts[counts.length - 1]);

    const miniVal = [];
    const mxVal = [];

    for(let i=0; i<limit.length; i++){
     if(`Connection ${id} time` === limit[i].graphName){
        miniVal.push( limit[i].minVal)
        mxVal.push(limit[i].maxVal)
     
   }
 }
     setMinVal(miniVal)
     setMaxVal(mxVal)



    };
    fetchData();
  }, [data, data1, id, jobName, startDate, endDate, minVal, maxVal, currentValue, limit]);
  console.log(data1)
  

  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `Connection ${id} time`
  
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
  //       GraphName:`Connection ${id} time`,
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
  //       GraphName:`Connection ${id} time`,
  //       limit : "min value",
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}` },
  //      });
  //     } 

  const chartData = {
    labels: main.map(({ time }) => time),


    datasets: [
      {
        label: 'Time in sec',
        data: main.map(({ count }) => count),
        fill: true,
        borderColor:  currentValue > maxVal[0]
        ? '#c90f08'
        : currentValue > minVal[0]
        ? '#f27311'
        : '#0fa63a',
        lineTension: 0.3,
        pointRadius: 0
      },
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
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl p-8 border-solid border-2 border-green-600  h-80 rounded-3xl ">
      <div style={{display:'flex'}}><h2 style={{fontWeight:'600' , color:'black'}}> Connection {id} time </h2>&nbsp;&nbsp;

<header className="flex justify-between items-start">
    {/* Icon */}
    {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}

    <button className="btn bg-green-500 hover:bg-green-700 text-white"
  aria-controls="days-menu"
  aria-haspopup="true"
  onClick={handleClick}
  
>

Selected {id} time ↓ </button>
<Menu
  id="days-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem component={Link} className={classes.link} onClick={() => setId("creation")} >
    Creation
  </MenuItem>
  <MenuItem component={Link} className={classes.link} onClick={() => setId("usage")}>
    Usage
  </MenuItem>
  <MenuItem component={Link} className={classes.link} onClick={() => setId("acquire")}>
    Acquire
  </MenuItem>
</Menu> 
   
  </header>
</div>
 <Line data={chartData} options={chartOptions} height={280} />  
   </div>     );
};
export default MetricsDashboard52;