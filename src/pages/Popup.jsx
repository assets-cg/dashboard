// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import ReactSpeedometer from 'react-d3-speedometer';
import { API_URL } from '../config';
import { Alert, Stack } from '@mui/material';

const Popup = ({ onClose }) => {

    const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;

  const [gauge, setGauge] = useState([]);
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
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <div className="bg-white w-auto h-auto rounded-lg p-6 relative">
            <button className="absolute top-0 right-0 m-2" onClick={onClose}>
              <svg className="h-6 w-6 text-gray-500 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl scrollTable5">
      <div>
      <div className="px-3 pt-2">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">Total Work Remaining in %age</h2>
       
      </div>
         <div style={{display:'flex', justifyContent:'center', overflow:'hidden', marginTop:'30px'}}>
          { values.map((sprintVelocity)=>
          <div title='Total Work Remaining in Sprints'>
            {sprintVelocity.percentCompleted ?
        <ReactSpeedometer
        maxValue={100}
        width={200}
        value={100 - sprintVelocity.percentCompleted}
        currentValueText={(100 - sprintVelocity.percentCompleted).toFixed(2) + "% in " + sprintVelocity.sprintName.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")}
        valueTextFontSize="12"
        labelFontSize="11"
        needleColor="black"
        startColor="green"
        segments={4}
        endColor="red"
        />: <div className='absolute mt-6 ml-20'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>
      }
      
      </div>
        
        )
          }
        </div>
        </div>
    </div>
          </div>
        </div>
      </div>
    );
  };

export default Popup;
