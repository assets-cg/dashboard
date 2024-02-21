// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from "react-d3-speedometer"
import { API_URL, Bearer_Token } from '../../config';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import GaugeChart1 from '../../charts/GaugeChart1';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from "react-router-dom";
import { Alert, Stack } from '@mui/material';

function FeatureDashboard02() {

  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid?.boardId;//for boaardid
  const data2 = location.state?.projectname?.projectName;//for projectname
  const data1 = location.state?.sprintname;//for sprintname 
  const [modalOpen, setModalOpen] = useState(true);
  const featureKey=location.state?.featureKey;//for featureKey

  const [gauge, setGauge] = useState([]);
  const [epicKey, setepicKey]= useState([]);
  const [effortPerRelease, seteffortPerRelease]= useState([]);
  const [value, setValue] = useState();
  
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sEpics=[];
   const sEfforts=[];
   const getMeanEffortPerFeature= async()=>{
   const reqData= await fetch(`${API_URL}meaneffortperfeatureinsprint?project=DashboardProject&boardID=2&sprintName=${data1}&featureKey=${featureKey}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sEpics.push(resData.epicDetails[0].epicKey);  
   sEfforts.push(resData.epicDetails[0].effortPerRelease);    
  //  sTickets.push(resData.noOfTickets);
  setepicKey(sEpics);
  seteffortPerRelease(sEfforts);
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getMeanEffortPerFeature();
},[data1,featureKey]);

console.log(epicKey)
console.log(effortPerRelease)
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 h-80 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl " >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Mean Effort per Epic</h2>
        
      </div>
        <div className='mt-10' style={{paddingLeft:"80px"}}>
       {effortPerRelease > 0?
        <ReactSpeedometer
        
        maxValue={12}
        width={280}
        value={[effortPerRelease]}
        currentValueText={effortPerRelease + " Cal Days"}
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        />: <div className='relative mt-10 ml-24'>
        {modalOpen && (
    <Stack sx={{ width: '60%'}} spacing={2}>
 
    <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
  </Stack>     )}
  </div>
}
        
        </div>
    </div>
  );
}

export default FeatureDashboard02;
