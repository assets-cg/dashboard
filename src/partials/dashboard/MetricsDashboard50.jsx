// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { CategoryScale } from 'chart.js';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Menu, MenuItem } from '@material-ui/core';
import { Prom_Url, Job_Name, API_URL } from '../../config';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api } from '../../config';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

const MetricsDashboard50 = ({ startDate, endDate }) => {
  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, ' useLocation Hook');

  const startDateTime = new Date(startDate * 1000).toLocaleString('en-US');
  const endDateTime = new Date(endDate * 1000).toLocaleString('en-US');

  const [level, setLevel] = useState('info');
  const [data, setData] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [currentValue, setCurrentValue] = useState();
  const [maxVal, setMaxVal] = useState(0);
  const [lab, setLab] = useState([]);
  const [chartData2, setChartData2] = useState([]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [jobName, setJobname] = useState(localStorage.getItem('jobName'));
  const [limit, setLimit] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const sCom = [];
      const result = await fetch(`https://${localStorage.getItem('PromUrl')}:9090/api/v1/query?query=http_server_requests_seconds_count{job="${jobName}"}[5d]`);
      const result2 = await fetch(`${API_URL}allthresholds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data2 = await result.json();
      console.log(data2);
      const thresholds = await result2.json();
      setLimit(thresholds);
      setLab(data2.data.result[0].values);

      const values = data2.data.result[0].values;
      const metrics = data2.data.result[0].metric;
      console.log(metrics)
      
      const filteredData = values.map(([timestamp, count]) => {
        const date = new Date(parseFloat(timestamp) * 1000);
        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
        return { time, count, metrics };
      });
      
      setData(filteredData);
      
      const chartData = filteredData.map(({ time, count, metrics }) => {
        const date = new Date(time);
        return {
          date,
          count,
          uriName: metrics.uri, // Fetch the URI name from the metrics object
        };
      });
      
      setChartData2(chartData);

      console.log(filteredData);

      setData(filteredData);
      const counts = filteredData.map(({ count }) => count);
      setCurrentValue(counts[counts.length - 1]);

      const miniVal = [];
      const mxVal = [];

      for (let i = 0; i < limit.length; i++) {
        if ('Application Logs' === limit[i].graphName) {
          miniVal.push(limit[i].minVal);
          mxVal.push(limit[i].maxVal);
        }
      }
      setMinVal(miniVal);
      setMaxVal(mxVal);
    };
    fetchData();
  }, [
    level,
    jobName,
    minVal,
    maxVal,
    startDate,
    endDate,
    minVal,
    maxVal,
    currentValue,
    limit,
    chartData2
  ]);

  console.log(data);
  console.log(startDate);
  console.log(endDate);
  console.log(chartData2);


  async function fetchNotification() {

    const emailParam = 'yerpudevedant1@gmail.com'
    const graphName = `Application Logs (${level})`
  
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

  // if (currentValue >= maxVal[0]) {
  //   novu.trigger('dashboardkpi-notifications', {
  //     to: { subscriberId: 'on-boarding-subscriber-id-123' },
  //     payload: {
  //       GraphName: `Application Logs (${level})`,
  //       limit: 'max value',
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${maxVal[0]}`,
  //     },
  //   });
  // } else if (currentValue >= minVal[0]) {
  //   novu.trigger('dashboardkpi-notifications', {
  //     to: { subscriberId: 'on-boarding-subscriber-id-123' },
  //     payload: {
  //       GraphName: `Application Logs (${level})`,
  //       limit: 'min value',
  //       containerName: `${localStorage.getItem("conatinerName")}`,
  //       value: `${minVal[0]}`,
  //     },
  //   });
  // }

  // Generate time range with 15-minute intervals
  const timeRange = [];
  let currentTime = new Date(startDate);
  while (currentTime <= endDate) {
    const timeString = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    timeRange.push(timeString);
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }

  return (
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl p-6 h-80 border-solid border-2 border-green-600 rounded-3xl">
      <div style={{ display: 'flex' }}>
        <h2 style={{ fontWeight: '600', color: 'black' }}>Application Logs </h2>
        &nbsp;&nbsp;
        <header className="flex justify-between items-start">
          <button
            className="btn bg-green-500 hover:bg-green-700 text-white p-1"
            aria-controls="days-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Selected {level} logs↓
          </button>
          <Menu
            id="days-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => setLevel('info')}>Info Logs</MenuItem>
            <MenuItem onClick={() => setLevel('error')}>Error Logs</MenuItem>
            <MenuItem onClick={() => setLevel('warn')}>Warn Logs</MenuItem>
            <MenuItem onClick={() => setLevel('debug')}>Debug Logs</MenuItem>
            <MenuItem onClick={() => setLevel('trace')}>Trace Logs</MenuItem>
          </Menu>
        </header>
      </div>
      <CalendarHeatmap
  startDate={startDateTime}
  endDate={endDateTime}
  values={data}
  classForValue={(value) => {
    if (!value) {
      return 'color-empty';
    }
    if (value.count >= maxVal[0]) {
      return 'color-max';
    }
    if (value.count >= minVal[0]) {
      return 'color-min';
    }
    return 'color-normal';
  }}
  showWeekdayLabels={false} // Disable the weekday labels
  showMonthLabels={true}
  showOutOfRangeDays={false}
  titleForValue={(value) => {
    const time = timeRange[value.x];
    const uriName = value.metrics.uri; // Fetch the URI name from the metrics object
    return `${value.count} events at ${time} (${uriName})`; // Display URI name along with the count and time
  }}
/>

    </div>
  );
};

export default MetricsDashboard50;
