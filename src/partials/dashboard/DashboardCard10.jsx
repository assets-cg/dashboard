// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import ReactSpeedometer from 'react-d3-speedometer';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';
import Popup from '../../pages/Popup';


function DashboardCard10() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;

  const [gauge, setGauge] = useState([]);
  const [sprintsToShow, setSprintsToShow] = useState(2);
  const [values, setValues] = useState([]);
  const [sprintName, setsprintName]= useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [percentCompleted, setpercentCompleted]= useState([]);
  const [value, setValue] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const handleShowMore = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

 useEffect( ()=>{

  //  const sName=[];
  //  const sPercent=[];
   const getSprintVelocity= async()=>{
   const reqData= await fetch(`${API_URL}sprintvelocity?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
    headers: {
     'Authorization':  `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json(); 
   setValues(resData.sprintVelocity) 
   }
   getSprintVelocity();
},[localStorage.getItem("projectName"), localStorage.getItem("boardId")]);



  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-8 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl scrollTable5">
      <div>
      <div className="px-5 pt-2">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <h2 className="text-lg font-semibold text-black mt-5">Total Work Remaining in %age <span>{sprintsToShow < values.length && (
            <Link onClick={handleShowMore} className="absolute right-12 text-blue-600 text-sm">
              Show More..
            </Link>
          )}</span></h2>
        
        {showPopup && <Popup onClose={handleClosePopup}/> }
       
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', marginTop: '30px' }}>
      {values.slice(0, sprintsToShow).map((sprintVelocity) => (
            <div title="Total Work Remaining in Sprints">
              {sprintVelocity.percentCompleted ? (
                <ReactSpeedometer
                  maxValue={100}
                  width={200}
                  value={100 - sprintVelocity.percentCompleted}
                  currentValueText={(100 - sprintVelocity.percentCompleted).toFixed(2) + '% in ' + sprintVelocity.sprintName.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('_')}
                  valueTextFontSize="12"
                  labelFontSize="11"
                  needleColor="black"
                  startColor="green"
                  segments={4}
                  endColor="red"
                />
              ) : (
                <div className="absolute mt-6 ml-20">
                  {modalOpen && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">
                        {' '}
                        Alert — <strong>No data available</strong>
                      </Alert>
                    </Stack>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;