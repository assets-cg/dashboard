import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import Chart from 'react-apexcharts';
// import Chart from 'chart.js';
// import 'chartjs-adapter-moment';



function PieChart(){
    const [taskByStatus, settaskByStatus]= useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sTasks=[];
//    const sPercentage=[];
   const getSprintTaskByStatus= async()=>{
   const reqData= await fetch("https://z9ynuwgrpt.us-east-1.awsapprunner.com/dashboardKPI/V1/getSprint_TaskByStatus?projectName=DashboardProject&boardId=2&sprintId=1");
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
},[]);




  return (
    <React.Fragment>
            <div className="container-fluid mb-3">
                {/* <h3 className="mt-3">Mean Aggregated Time Spent per Task </h3> */}
                <Chart

               type="pie"

               width={370}

               height={250}

               border={10}



                series={ taskByStatus}                



                options={{

                        

                       noData:{text:"Empty Data"},                        

                      // colors:["#f90000","#f0f"],

                      labels:[" Done ",  " Blocked ",   " To Do ",   "In Progress" ]            



                 }}

                >

                </Chart>
            </div>
        </React.Fragment>
  );
}

export default PieChart;