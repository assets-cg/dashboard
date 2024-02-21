// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{useState,useEffect} from 'react';
import PieChart from '../../charts/PieChart';
import Icon from '../../images/icon-01.svg';
import Chart from 'react-apexcharts';
import DoughnutChart from '../../charts/DoughnutChart';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import {Alert, Stack} from '@mui/material';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06(props) {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const [modalOpen, setModalOpen] = useState(true);
  const data2 = location.state?.projectname;//for projectname
  const data1 = location.state?.data1;//for sprintname  

console.log(data)
console.log(data1)
console.log(data2)
  // const theme = useTheme();
const [sprintName,setSprintName]=useState(data1);
const [tasks, setTasks]= useState(0)
const [projName,setProjName]=useState(data2);
const [id,setId]=useState(data);
  // const colors = tokens(theme.palette.mode);
  const [taskByStatus, settaskByStatus]= useState([]);
  const [value, setValue] = useState();
  const [sprintId, setsprintId] = useState();
 useEffect( ()=>{
   const sTasks=[];
//    const sPercentage=[];
   const getSprintTaskByStatus= async()=>{
   const reqData= await fetch(`${API_URL}sprint_taskbystatusbysprintname?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintName}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();      
   sTasks.push(resData.taskByStatus[0].taskDonePercentage);
   sTasks.push(resData.taskByStatus[0].taskBlockedPercentage);
   sTasks.push(resData.taskByStatus[0].taskToDoPercentage);
   sTasks.push(resData.taskByStatus[0].taskInProgressPercentage);

   setTasks(resData.noOfTasks)

 settaskByStatus(sTasks);
 console.log(JSON.stringify(sTasks)); 
 console.log(taskByStatus[0]);
   }
getSprintTaskByStatus();
},[data,data1,data2, localStorage.getItem("projectName"), localStorage.getItem("boardId"), tasks]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 h-80 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start ">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-lg font-semibold text-black mb-2"> Task By Status <span className='text-sm font-bold'>(No of Tasks: {tasks})</span></h2>
        
      </div>
        <div className='taskByStatus'>
          { tasks ?

             <Chart

type="pie"

width={380}

height={220}



// border={10}



 series={ taskByStatus}                



 options={{

         

        noData:{text:"No Data"},                        

       // colors:["#f90000","#f0f"],

       labels:[" Done ",  " Blocked ",   " To Do ",   "In Progress" ],
       
       legend:{
        labels:{colors:'black'}
       }



  }}

 >

 </Chart> : <div className='absolute  mt-20 ml-32'>
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

export default DashboardCard06;
