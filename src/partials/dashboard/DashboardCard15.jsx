// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';
import { API_URL, Bearer_Token} from '../../config';
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

function DashboardCard15() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [sprintName, setsprintName]= useState([]);
  const [committed,setcommitted]=useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [delivered,setdelivered]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sName=[];
   const sCommit=[];
   const sDeliver=[];
//    const sPercentage=[];
   const getSprintVelocity= async()=>{
   const reqData= await fetch(`${API_URL}sprintvelocitycommitteddelivered?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.sprints.length;i++){
    sName.push(resData.sprints[i].sprintName);
    
    sCommit.push(resData.sprints[i].committed);

    sDeliver.push(resData.sprints[i].delivered);
   }   
  
   

   setsprintName(sName);
   setcommitted(sCommit);
   setdelivered(sDeliver);

   }
  

   getSprintVelocity();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
  return (
    <div className="flex flex-col col-span-full sm:col-span-7 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl scrollTable3">
      <header className="px-5 py-3 ">
        <h2 className="font-semibold text-black">Sprint Velocity</h2><h6 style={{fontSize:'15px', color:'black'}} className="font-semibold">(Committed Story Points vs Delivered Story Points)</h6>
        
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {committed && delivered ?
      <ReactApexChart

series={ [{
    name: 'Commited',
    data: committed
  }, {
    name: 'Delivered',
    data: delivered
  }
  ]}

    options={{
    // colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '35%',
          distributed: false,
        }
      },
      
      title: {
        style: {
            color: "black",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },
    // colors:{

    // },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: true,
        labels:{colors:'black'}
      },
      xaxis: {
        categories: sprintName,
        title:{
          text: "Sprints",
          style: {
            color: "black",
        },
          offsetX: 0,
          offsetY: 85,

                  },
        labels: {
          style: {
            colors: 'black',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Velocity',
          style:{
            color:'black'
          }
          
        },
        labels: {
          style: {
            colors: ["black"], // replace with your desired colors
          },
        }

      }
    } }
    type='bar'  height={225} />
    : <div className='absolute mt-6 ml-10'>
    {modalOpen && (
<Stack sx={{ width: '100%'}} spacing={2}>

<Alert severity="error"> Alert — <strong>No data available</strong></Alert>
</Stack>     )}
</div>
}
    </div>
    </div>
  );
}



//   // IMPORTANT:
//   // Code below is for demo purpose only, and it's not covered by support.
//   // If you need to replace dummy data with real data,
//   // refer to Chart.js documentation: https://www.chartjs.org/docs/latest

//   // Fake real-time data
//   const [counter, setCounter] = useState(0);
//   const [increment, setIncrement] = useState(0);
//   const [range, setRange] = useState(35);
  
//   // Dummy data to be looped
//   const data = [
//     57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87,
//     53.73, 56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25,
//     65.91, 64.44, 65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92,
//     50.95, 49.65, 48.09, 49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42,
//     50.91, 58.52, 53.37, 57.58, 59.09, 59.36, 58.71, 59.42, 55.93, 57.71,
//     50.62, 56.28, 57.37, 53.08, 55.94, 55.82, 53.94, 52.65, 50.25,
//   ];

//   const [slicedData, setSlicedData] = useState(data.slice(0, range));

//   // Generate fake dates from now to back in time
//   const generateDates = () => {
//     const now = new Date();
//     const dates = [];
//     data.forEach((v, i) => {
//       dates.push(new Date(now - 2000 - i * 2000));
//     });
//     return dates;
//   };

//   const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

//   // Fake update every 2 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounter(counter + 1);
//     }, 2000);
//     return () => clearInterval(interval)
//   }, [counter]);

//   // Loop through data array and update
//   useEffect(() => {
//     setIncrement(increment + 1);
//     if (increment + range < data.length) {
//       setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]]);
//     } else {
//       setIncrement(0);
//       setRange(0);
//     }
//     setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
//     return () => setIncrement(0)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [counter]);

//   const chartData = {
//     labels: slicedLabels,
//     datasets: [
//       // Indigo line
//       {
//         data: slicedData,
//         fill: true,
//         backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
//         borderColor: tailwindConfig().theme.colors.indigo[500],
//         borderWidth: 2,
//         tension: 0,
//         pointRadius: 0,
//         pointHoverRadius: 3,
//         pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
//         clip: 20,
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-col col-span-full sm:col-span-6 bg-black shadow-lg rounded-sm border border-slate-200">
//       <header className="px-5 py-4 border-b border-slate-100 flex items-center">
//         <h2 className="font-semibold text-slate-800">Real Time Value</h2>
//         <Info className="ml-2" containerClassName="min-w-44">
//           <div className="text-sm text-center">Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></div>
//         </Info>
//       </header>
//       {/* Chart built with Chart.js 3 */}
//       {/* Change the height attribute to adjust the chart height */}
//       <RealtimeChart data={chartData} width={595} height={248} />
//     </div>
//   );
// }

export default DashboardCard15;
