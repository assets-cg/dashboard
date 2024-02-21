// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from "react-d3-speedometer"
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';
import { API_URL, Bearer_Token } from '../../config';


const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function DashboardCard38() {
    const location = useLocation();
  const sprintnm = location.state?.sprintnm;
  // console.log(location, " useLocation Hook");


  // console.log(data)
  // console.log(data2)
  const [envi, setEnvi]=useState("QA");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [day,setDay]=useState([]);  

  function handleJenkinsProjectSelect(projectName) {
    setAnchorEl(null);
    setSelectedOption(projectName);
  }
  
  const handleJenkinsProjectClose = () => {
    setAnchorEl(null);
  };
  


//   const currentValueText = `${handleCountValue().toFixed(2)} ${getUnit()}`;

  function handleOptionChange2(event) {
    const optionValue = event.target.value;
    setEnvi(optionValue);
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [gauge, setGauge] = useState([]);
  const [env, setenv]= useState();
  const [count, setcount]= useState();
  const [value, setValue] = useState();
  
 useEffect( ()=>{
   
//    const sPercentage=[];
   const sEnv=[];
   const sCount=[];
   const sProject=[];
   const getDeploymentByEnvironment= async()=>{
   const reqData= await fetch(`${API_URL}effortperfeature?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   setValue(resData)   
   sCount.push(resData.timeInDays);
   sProject.push(resData.projectName)

  //  sTickets.push(resData.noOfTickets);

  setenv(sEnv);
  setcount(sCount);
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getDeploymentByEnvironment();
},[]);


// const handleCountValue = () => {
//     if (Number(count) < 1) {
//         return Number(value.timeInHours) < 1 ? Number(value.timeInSeconds) < 1 ? Number(value.timeInMilliSeconds) || 0 : Number(value.timeInSeconds) || 0 : Number(value.timeInHours) || 0;
//     }
//     return Number(count) || 0;  
//   };


//   const getUnit = () => {
//     if (Number(count) < 1) {
//       if (Number(value.timeInHours) < 1) {
//         if (Number(value.timeInSeconds) < 1) {
//           return "Miliseconds";
//         } else {
//           return "Seconds";
//         }
//       } else {
//         return "Hrs";
//       }
//     } else {
//       return "Cal Days";
//     }
//   };

const formattedCount = isNaN(count) ? 0 : parseFloat(count).toFixed(3);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 h-80 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl" >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-center ">
      <h2 className="text-lg font-semibold text-black mb-2">Mean Effort per Feature ({sprintnm}) </h2>
        </header>     
      </div>
      <div style={{ paddingLeft: "55px", marginTop:'20px' }}>
  {count && count.length > 0 ? (
    <ReactSpeedometer
      maxValue={30}
      width={280}
      value={parseFloat(formattedCount).toFixed(3)}
      currentValueText={parseFloat(formattedCount).toFixed(3) + " Cal Days"}
      needleColor="black"
      startColor="green"
      segments={5}
      endColor="red"
    />
  ) : (
    <div style={{ marginTop: "15%", justifyContent: "center", fontWeight: "700" }}>
      <h1 className="blink" style={{ marginLeft: "-50px" }}>
        No Data!!
      </h1>
      <h2>No Feature available</h2>
    </div>
  )}
</div>
    </div>
  );
}

export default DashboardCard38;
