// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from "react-d3-speedometer"


// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import GaugeChart1 from '../../charts/GaugeChart1';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
function TaskSummaryCard02() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const data2 = location.state?.projectname;//for projectname
  const sprintnm = location.state?.sprintnm;//for sprintname 
  const id = location.state?.id;

  const [gauge, setGauge] = useState([]);
  const [noOfDays, setnoOfDays]= useState();
  const [storyId, setstoryId]= useState();
  const [value, setValue] = useState();
  
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sDays=[];
   const sStory=[];
   const getTimeSpentOnTask= async()=>{
   const reqData= await fetch(`${API_URL}timespentontask?project=DashboardProject&boardID=2&sprintName=${sprintnm}&storyId=${id}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sDays.push(resData.noOfDays); 
   sStory.push(resData.storyId);   
  //  sTickets.push(resData.noOfTickets);

 setnoOfDays(sDays);
 setstoryId(sStory);
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getTimeSpentOnTask();
});



  return (
    <div className="flex flex-col col-span-full sm:col-span-6 border-solid border-2 border-green-600 xl:col-span-6 h-80 bg-custom2 shadow-2xl rounded-3xl" >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Time Spent on Task for Story {storyId}</h2>
        
      </div>
        <div className='mt-10' style={{paddingLeft:"80px"}}>
       
        <ReactSpeedometer
        
        maxValue={8}
        width={280}
        value={noOfDays}
        currentValueText={noOfDays + " Day(s)"}
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        />
        
        </div>
    </div>
  );
}

export default TaskSummaryCard02;
