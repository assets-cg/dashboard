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

function JenkinsDashboard01() {
  const location = useLocation();
  // console.log(location, " useLocation Hook");


  // console.log(data)
  // console.log(data2)
  const [envi, setEnvi]=useState("QA");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [day,setDay]=useState([]);
  const [selectedOption, setSelectedOption] = useState(180);

  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }

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
   const sDay=[];
   const getDeploymentByEnvironment= async()=>{
   const reqData= await fetch(`${API_URL}deploymentbyenvironment?Environment=${envi}&days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();  
   sEnv.push(resData.environment);    
   sCount.push(resData.count);

  //  sTickets.push(resData.noOfTickets);

  setenv(sEnv);
  setcount(sCount);
//  console.log(noOfTickets);
//  console.log(sTickets[0])
   }
   getDeploymentByEnvironment();
},[envi, selectedOption]);



  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 h-80 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl" >
      <div className="px-5 pt-5">
        <header className="flex justify-between items-center ">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}

          {/* <button className="btn bg-green-500 hover:bg-green-700 text-white"
        aria-controls="days-menu"
        aria-haspopup="true"
        onClick={handleClick}
        
      >

         Selected {env} Env ↓ </button>
      
      
      <Menu
        id="days-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem value="QA" component={Link} className={classes.link} onClick={() => setEnvi("QA")} >
          QA
        </MenuItem>
        <MenuItem value="PROD" component={Link} className={classes.link} onClick={() => setEnvi("PROD")}>
          PROD
        </MenuItem>
        <MenuItem value="DEV" component={Link} className={classes.link} onClick={() => setEnvi("DEV")}>
          DEV 
        </MenuItem>
      </Menu> */}
      <h2 className="text-lg font-semibold text-black mb-2">Deployment Job Frequency on {envi}</h2>
    
        </header>
        <div className='mb-5 -ml-2 '>
        <select
    className=" w-20 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={envi}
    onChange={handleOptionChange2}
  >
    <option value="QA">QA</option>
    <option value="PROD">PROD</option>
    <option value="DEV">DEV</option>
  </select>
      <select
    className=" w-32 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="1">Today</option>
    <option value="2">Yesterday</option>
    <option value="30">Last Month</option>
    <option value="90">Quarterly</option>
    <option value="180">Half Yearly</option>
    <option value="365">Yearly</option>
  </select>
  </div>
        
      </div>
        <div style={{paddingLeft:"80px"}}>
        {count && count.length > 0 ? (
        <ReactSpeedometer
        
        maxValue={200}
        width={280}
        value={count}
        currentValueText={count + " Deployment(s) Last " + selectedOption + " Days"}
        needleColor="black"
        startColor="green"
        segments={5}
        endColor="red"
        />): (
    
          <div style={{marginTop:'15%', justifyContent:'center', fontWeight:'700'}}>
            <h1 className='blink' style={{marginLeft:'-50px'}}>No Data!!</h1>
            <h2>No Deployments in last 30 days</h2> 
          </div>
            
            )}
        
        </div>
    </div>
  );
}

export default JenkinsDashboard01;
