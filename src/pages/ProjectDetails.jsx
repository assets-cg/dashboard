// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';  
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link, useNavigate } from 'react-router-dom';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import ProjectDashboard03 from '../partials/dashboard/ProjectDashboard03';
import DashboardCard15 from '../partials/dashboard/DashboardCard15';
import DashboardCard16 from '../partials/dashboard/DashboardCard16';
import DashboardCard22 from '../partials/dashboard/DashboardCard22';
import Datepicker from '../partials/actions/Datepicker';
import { Alert, Stack } from '@mui/material';
import { API_URL } from '../config';
import LabelWidgetBoards from '../partials/dashboard/LabelWidgetBoards';
import DashboardCard25 from '../partials/dashboard/DashboardCard25';
import DashboardCard26 from '../partials/dashboard/DashboardCard26';
import YourComponent from '../partials/dashboard/YourComponent';
import DashboardCard28 from '../partials/dashboard/DashboardCard28';
import DashboardCard30 from '../partials/dashboard/DashboardCard30';
import DashboardCard31 from '../partials/dashboard/DashboardCard31';
import DashboardCard32 from '../partials/dashboard/DashboardCard32';
import DashboardCard33 from '../partials/dashboard/DashboardCard33';
import DashboardCard34 from '../partials/dashboard/DashboardCard34';
import YourComponent2 from '../partials/dashboard/YourComponent2';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';
// import Banner from '../partials/Banner';

function ProjectDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Board Sprints');
  const [tokenExpiry, setTokenExpiry] = useState("");

  useEffect(() => {
    console.log(selectedOption)
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  

    // switch (event.target.value) {
    //   case 'Board Sprints':
    //     navigate('/projectdetails');
    //     break;
    //   case 'Sprint Velocity':
    //     navigate('/projectDetails2');
    //     break;
    //   case 'Sprint Tickets':
    //     navigate('/projectdetails3');
    //     break;
    //   default:
    //     navigate('/projectdetails');
    // }
  };

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    const checkTokenExpiry = async () => {
      try {
        const reqData = await fetch(`${API_URL}projects?userName=${localStorage.getItem("projectUser")}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const resData = await reqData.text();
        setTokenExpiry(resData)
        
      } catch (error) {
        console.log(error);
      }
    };
    checkTokenExpiry();
  }, [tokenExpiry]);

  return (
    <div className="flex h-screen overflow-hidden bg-custom">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          

            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}
            <div className="grid grid-cols-12 gap-3">
            {/* <LabelWidgetBoards/> */}
            </div>

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                
                {/* Add view button */}
    <span> 
     
    <div className="relative flex justify-center items-center space-x-4">
    <label style={{fontWeight:"bold", fontSize:'20px'}}>{selectedOption}</label>
      <div
        className="relative rounded-md px-2 py-1 border border-gray-300 cursor-pointer bg-green-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        <div className="flex justify-between items-center">
          
          <div className="text-white font-bold">{selectedOption} ⏷</div>
          <div className="ml-2">
            
          </div>
        </div>
        {showOptions && (
          <div className="absolute left-0 top-full mt-0 py-2 w-40 bg-white rounded-lg border border-gray-300 shadow-lg">
            <div
              className="px-3 py-2 text-md font-medium text-gray-700 hover:bg-green-700 hover:text-white cursor-pointer"
              onClick={() => handleOptionChange({ target: { value: 'Board Sprints' } })}
            >
              Board Sprints
            </div>
            <div
              className="px-3 py-2 text-md font-medium text-gray-700 hover:bg-green-700 hover:text-white  cursor-pointer"
              onClick={() => handleOptionChange({ target: { value: 'Sprint Velocity' } })}
            >
              Sprint Velocity
            </div>
            <div
              className="px-3 py-2 text-md font-medium text-gray-700 hover:bg-green-700 hover:text-white  cursor-pointer"
              onClick={() => handleOptionChange({ target: { value: 'Sprint Tickets' } })}
            >
              Sprint Tickets
            </div>
          </div>
        )}
        
      </div>
    </div>
    <div className ='absolute right-10 -mt-6'>{tokenExpiry === "Expired JWT token" || tokenExpiry ==="Invalid JWT token" && (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          Alert : <strong>JWT Token Expired / Invalid</strong>
        </Alert>
      </Stack> )}</div> 
  </span>
                
                <div className='inline-block absolute right-10 w-51'>
              
                </div>
                {/* <Link to="/assigneeview">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">To Assignee View</span>
                </button>    </Link> 
                <Link to="/jenkinsview">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">To Jenkins View Page</span>
                </button>    </Link>             */}
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
            {selectedOption === 'Board Sprints' && <DashboardCard08 />}
            {selectedOption === 'Board Sprints' && <DashboardCard10 />}
            {/* {selectedOption === 'Board Sprints' && <DashboardCard26 />} */}
            {selectedOption === 'Board Sprints' && <DashboardCard11 />}
            {selectedOption === 'Board Sprints' && <YourComponent/>}
            {/* {selectedOption === 'Board Sprints' && <YourComponent2/>} */}
            {selectedOption === 'Board Sprints' && <DashboardCard25 />}
            {selectedOption === 'Board Sprints' && <DashboardCard28 />}
            {selectedOption === 'Board Sprints' && <DashboardCard30 />}
            {selectedOption === 'Board Sprints' && <DashboardCard31 />}

              {/* <DashboardCard08 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
            {/* {selectedOption === 'Sprint Velocity' && <DashboardCard16 />} */}
            {selectedOption === 'Sprint Velocity' && <ProjectDashboard03 />}
            {selectedOption === 'Sprint Velocity' && <DashboardCard15 />}
            {selectedOption === 'Sprint Velocity' && <DashboardCard33 />}
            {selectedOption === 'Sprint Velocity' && <DashboardCard34 />}
            {selectedOption === 'Sprint Velocity' && <DashboardCard32 />}
            
              {/* <DashboardCard10 /> */}
              {/* Line chart (Real Time Value) */}
            {selectedOption === 'Sprint Tickets' && <DashboardCard05 />}
            {selectedOption === 'Sprint Tickets' && <DashboardCard07 />}

            <DiscussionWidget />
              {/* <DashboardCard11 /> */}
              
            </div>

          </div>
          <footer class="p-2 md:px-4 md:py-4 mt-20 z-10 left-20 bottom-0 w-full bg-custom3">
           <span style={{fontWeight:'600'}} class="block text-sm text-white sm:text-center dark:text-white bg-custom3">DAAS (Dashboard As A Service) ©  
            <a href="https://www.capgemini.com/"  target="_blank" class="hover:underline">Capgemini 2023</a>
             </span>
            </footer>
        </main>

        {/* <Banner /> */}

      </div>
    </div>
  );
}

export default ProjectDetails;