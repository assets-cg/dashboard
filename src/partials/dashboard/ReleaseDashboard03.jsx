// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';


function ReleaseDashboard03(props) {
  const location = useLocation();
  // console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const data2 = location.state?.projectname;//for projectname
  const [releaseStartDate, setReleaseStartDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);


  useEffect(() => {
    const getReleaseStartDate = async () => {
      // Fetch the data from the API
      const response = await fetch(`${API_URL}releasestartdate?projectName=${localStorage.getItem('releaseProject')}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
  
      // Extract the date from the API response
      const apiDate = responseData.date; // Assuming the date property is named "date"
  
      // Set the fetched date to the state
      setReleaseStartDate(apiDate);
    };
  
    getReleaseStartDate();
  }, [localStorage.getItem('releaseProject')]); // Run only once on component mount
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        <h2 className="text-xl font-semibold text-center text-black mb-4"> Release Start Date</h2>

        <p className='text-2xl font-medium text-center'>
          {formatDate(releaseStartDate)}
        </p>
        
      </div>
    </div>
  );
}

export default ReleaseDashboard03;
