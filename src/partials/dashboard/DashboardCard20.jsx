// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../images/icon-01.svg';
import { API_URL, Bearer_Token} from '../../config';
import { Alert, Stack} from '@mui/material';

function DashboardCard20() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;
  const [modalOpen, setModalOpen] = useState(true);


  console.log(sprintnm);


  const [hours, sethours]= useState([]);

 useEffect( ()=>{
//    const sPercentage=[];
   const sHours=[];
   const getHoursWorked= async()=>{
   const reqData= await fetch(`${API_URL}sprinthoursworked?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}` ,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();
    sHours.push(resData.hoursWorked);

  sethours(sHours);

  console.log("Hours"+ hours);

   }
   getHoursWorked();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 border-solid border-2 border-green-600  h-60 bg-custom2 shadow-2xl rounded-3xl scrollTable4">
      <div className="px-5 pt-5 scrollTable4" >
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <h2  className="text-lg font-semibold text-black mb-2">Total Hours Worked in ({sprintnm.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")})</h2>
        <div className='status' style={{textAlign:'center',height:'60%', width:'90%', margin:'auto'}}>
          {hours.length ?
            <h1 style={{padding:'5%',textAlign:'center',fontSize:'44px',color:'darkgreen', fontWeight:'600', fontFamily:'Orbitron' }}>{hours} Hrs</h1>
            : <div className='absolute mt-5 ml-5 '>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>
      }
            {/* <p style={{justifyContent:'center',fontWeight:'700', color:'white', fontSize:'20px'}}>Total Worked Hours</p> */}
        </div>
        
      </div>
    </div>
  );
}
export default DashboardCard20;