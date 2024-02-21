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
import { Alert, Stack } from '@mui/material';

function DashboardCard17() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;
  console.log(brdid)
  console.log(sprintnm)

  const [gauge, setGauge] = useState([]);
  const [noOfDefects, setnoOfDefects]= useState();
  const [value, setValue] = useState();
  const [modalOpen, setModalOpen] = useState(true);
  
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sDefects=[];
   const getDefectsOnSprints= async()=>{
   const reqData= await fetch(`${API_URL}sprintdefects?projectName=${localStorage.getItem("projectName")}&boardID=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sDefects.push(resData.noOfDefects);    
  //  sTickets.push(resData.noOfTickets);

  setnoOfDefects(sDefects[0]);
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getDefectsOnSprints();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);



  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 border-solid border-2 border-green-600  h-60 bg-custom2 shadow-2xl rounded-3xl" >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Defects in {sprintnm} </h2>
        
      </div>
        <div style={{marginLeft:"115px"}}>
       {noOfDefects?
        <ReactSpeedometer
        
        maxValue={12}
        width={280}
        value={noOfDefects}
        currentValueText={noOfDefects + " Defect(s)"}
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        />: <div className='relative right-14 mt-14'>
        {modalOpen && (
    <Stack sx={{ width: '100%'}} spacing={2}>
 
    <Alert severity="success"> Congratulations ! — <strong>No Defects </strong></Alert>
  </Stack>     )}
  </div>
  }
        
        </div>
    </div>
  );
}

export default DashboardCard17;
