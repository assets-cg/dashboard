// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{useState,useEffect} from 'react';
import PieChart from '../../charts/PieChart';
import Icon from '../../images/icon-01.svg';
import Chart from 'react-apexcharts';
import DoughnutChart from '../../charts/DoughnutChart';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';

import {Alert, Stack} from '@mui/material';
// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { API_URL, Bearer_Token } from '../../config';

function DashboardCard21() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const data2 = location.state?.projectname;//for projectname
  const sprintnm = location.state?.sprintnm;//for sprintname  
  // const theme = useTheme();

  // const colors = tokens(theme.palette.mode);
  const [sprintGoals, setsprintGoals]= useState([]);
  const [value, setValue] = useState();
  const [sprintId, setsprintId] = useState();
  const [modalOpen, setModalOpen] = useState(true);
  const [assignee, setassignee]= useState([]);
  const [capacity,setcapacity]=useState([]);
  const [totalValue, settotalValue]=useState([]);
  const [totalPercentage, settotalPercentage]=useState([]);
 useEffect( ()=>{
   const sGoals=[];
   const sAssignee=[];
   const sCapacity=[];
//    const sPercentage=[];
   const getSprintGoal= async()=>{
   const reqData= await fetch(`${API_URL}sprintgoals?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json(); 
   const reqData1= await fetch(`${API_URL}capacitypercentage?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData1= await reqData1.json(); 
   const sTvalue = resData1.totalVal;
   const sTpercent = resData1.totalPercentage; 
   for(var i=0;i<resData1.details.length;i++){
    sAssignee.push(resData1.details[i].assignee);
    
    sCapacity.push(resData1.details[i].capacity); 
  }
    sGoals.push(resData.sprintGoals[0].committed);
    sGoals.push(resData.sprintGoals[0].delivered);
   setsprintGoals(sGoals);
   setassignee(sAssignee);
   setcapacity(sCapacity);
   settotalPercentage(sTpercent);
   settotalValue(sTvalue);
   }
 
   getSprintGoal();
   
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
let chartSeries = [];
console.log(assignee);
console.log(capacity)
for(var j=0;j<assignee.length;j++){
    chartSeries.push({
        name: [assignee[j]],
        data: [capacity[j]]
    });
}


console.log(sprintGoals)
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 #70bf65 xl:col-span-6 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-lg font-semibold text-black mb-2"> Sprint Goals</h2>
        
      </div>
        <div >
<div style={{marginLeft:'25%'}}>
  {sprintGoals.length ?
             <Chart

type="donut"

width={300}

height={290}



// border={10}



 series={sprintGoals}                



 options={{

         

        noData:{text:"Empty Data"},                        

       colors:["#4d83ff","#1ad5c3"],

       labels:[" Committed ",  " Done " ],

       legend:{
        show: true,
        labels:{
          colors: ['black']
        }
    
      }     




  }}

 >

 </Chart> : <div className='relative mt-5'>
            {modalOpen && (
        <Stack sx={{ width: '90%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>}
 </div>
<div style={{justifyContent:'center'}}>
 <header className="px-5 py-4">
 {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        <h2 className="font-semibold text-black">Capacity %age of {sprintnm.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")} </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {chartSeries.length ?
      <ReactApexChart



    series = {chartSeries}

    options={{
      chart: {
        // type: 'bar',
       
        stacked: true,
      },
    //   colors: "#9999",
      plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: '50%',
            barHeight: '40%',
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '10px',
                  fontWeight: 700,
                  color:'black'
                }
              }
            }
        }
      },
      title: {
        text: totalPercentage + "%",
        offsetX: 0,
        offsetY: 5,
        style: {
            color: "black",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },

   xaxis:{
    labels: {
      style: {
        colors: 'black',
      }
    },

   },
    
      legend: {
        show: true,
        labels:{colors:'black'}

      },
      yaxis: {
        labels: {
          style:{
            colors:'black'
          },
          show: false,
        }},
    } }
    type='bar'  height={150}  /> : <div className='relative mt-14 ml-20'>
    {modalOpen && (
<Stack sx={{ width: '60%'}} spacing={2}>

<Alert severity="error"> Alert — <strong>No data available</strong></Alert>
</Stack>     )}
</div>}
    </div></div>

             </div>
    </div>
  );
}

export default DashboardCard21;
