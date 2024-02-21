// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{useState,useEffect} from 'react';
import PieChart from '../../charts/PieChart';
import Icon from '../../images/icon-01.svg';
import Chart from 'react-apexcharts';
import DoughnutChart from '../../charts/DoughnutChart';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import {Alert, Stack} from '@mui/material';



// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { API_URL, Bearer_Token } from '../../config';

function Card01(props) {

  const location = useLocation();

console.log(location, " useLocation Hook");
const [modalOpen, setModalOpen] = useState(true);

const data = location.state?.data;

console.log(data)
  // const theme = useTheme();

  // const colors = tokens(theme.palette.mode);
  const [taskByStatus, settaskByStatus]= useState([]);
  const [value, setValue] = useState();
  const [sprintId, setsprintId] = useState();
 useEffect( ()=>{
   const sTasks=[];
//    const sPercentage=[];
   const getSprintTaskByStatus= async()=>{
   const reqData= await fetch(`${API_URL}sprint_taskbystatus?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintId=`,{
    headers: {
     'Authorization':  `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();      
   sTasks.push(resData.taskByStatus[0].taskDonePercentage);
   sTasks.push(resData.taskByStatus[0].taskBlockedPercentage);
   sTasks.push(resData.taskByStatus[0].taskToDoPercentage);
   sTasks.push(resData.taskByStatus[0].taskInProgressPercentage);

 settaskByStatus(sTasks);
 console.log(JSON.stringify(sTasks)); 
 console.log(taskByStatus[0]);
   }
getSprintTaskByStatus();
},[data]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 bg-white shadow-2xl rounded-3xl border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2"> Task By Status</h2>
        
      </div>
        <div>
{taskByStatus?
             <Chart

type="pie"

width={380}

height={220}



// border={10}



 series={ taskByStatus}                



 options={{

         

        noData:{text:"Empty Data"},                        

       // colors:["#f90000","#f0f"],

       labels:[" Done ",  " Blocked ",   " To Do ",   "In Progress" ]            



  }}

 >

 </Chart> : <div className='absolute right-12 mt-0'>
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

export default Card01;

