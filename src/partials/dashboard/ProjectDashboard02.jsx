// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import {Auth, Hub} from 'aws-amplify';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from 'react-d3-speedometer';


// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import GaugeChart1 from '../../charts/GaugeChart1';
import ReactApexChart from 'react-apexcharts';
import { API_URL, Bearer_Token } from '../../config';

function ProjectDashboard02() {

  const [gauge, setGauge] = useState([]);
  const [meanEffortPerEpic, setmeanEffortPerEpic]= useState();
  const [epic, setEpic] = useState();
  const [value, setValue] = useState();
  const [isAdmin, setIsAdmin] = useState(false);


 useEffect( ()=>{
   
//    const sPercentage=[];
   const sMean=[];
   const sEpics=[];
   const getMeanEffort= async()=>{
   const reqData= await fetch(`${API_URL}effortperepic?project=DashboardProject&boardID=2`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sMean.push(resData.meanEffortPerEpic); 
   sEpics.push(resData.noOfEpics)   
  //  sTickets.push(resData.noOfTickets);

  setmeanEffortPerEpic(sMean[0]);
  setEpic(sEpics[0])
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getMeanEffort();
});

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable1">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Mean Effort per Epic</h2><span style={{fontSize:'15px', fontWeight:'600', marginLeft:'220px', paddingTop:'60px', color:'black'}}>Total Epics: {epic}</span>
      </div>
         <div style={{marginTop:"35px", marginLeft:'60px'}}>
        <ReactSpeedometer
        maxValue={8}
        width={280}
        value={meanEffortPerEpic}
        currentValueText={`${meanEffortPerEpic} Cal Days`}
        currentValueTextFontWeight="bold" 
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        />
        </div>
    </div>
  );
}

export default ProjectDashboard02;