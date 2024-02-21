// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_LINK } from '../../config';

function MetricsDashboard01(){
  
      return (
        <>
    <div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 bg-white shadow-2xl rounded-3xl border border-slate-200">
            <iframe style={{ borderRadius:'20px'}} src = {`${API_LINK}d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&from=now-6h&to=now&theme=light&panelId=52`} allow="insecure" width="100%" height="120" frameborder="0"></iframe>
            <iframe style={{ borderRadius:'20px'}} src = {`${API_LINK}d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&from=now-6h&to=now&theme=light&panelId=56`} allow="insecure" width="100%" height="120" frameborder="0"></iframe>

        </div>
         </>
         );
  
     

};

export default MetricsDashboard01;

























// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {CategoryScale} from 'chart.js';
// import Chart from 'chart.js/auto';
// Chart.register(CategoryScale);

// const MetricsDashboard01 = () => {
  
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetch('http://ec2-54-211-61-113.compute-1.amazonaws.com:9090/api/v1/query?query=http_server_requests_seconds_count[5m]');
//       // console.log(result)
//       const data2 = await result.json();
//       // console.log(data2)
//       setData(data2.data.result);
//     };
//     fetchData();
//   }, [data]);
//   // console.log(data)
//   // const timestamp = data.map(data => data.values[0][0]) ; // the timestamp value you want to convert
//   // const date = new Date(timestamp * 1000); // create a new date object from the timestamp
//   // date.setMinutes(date.getMinutes() + 5); // add 30 minutes to the minutes value
//   // console.log(date); // output the new date object
  

//   const chartData = {
//     labels: data.map(d => d.metric.uri),
//     datasets: [
//       {
//         label: 'Counts',
//         data: data.map(d => d.values[1]),
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//         lineTension: 0.1
//       }
//     ]
//   };
//   // console.log(data)
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       xAxes: [{
//         ticks: {
//           fontSize: 10, // set the font size for x-axis labels
//         }
//       }],
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   };
//   return (
//     <div className="col-span-full xl:col-span-12 bg-white shadow-2xl rounded-3xl border border-slate-200">  

//        <Line data={chartData} options={chartOptions} height={400} />   
              
//     </div> 
     
//      );
// };
// export default MetricsDashboard01;