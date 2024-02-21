// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import {Auth, Hub} from 'aws-amplify';
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
import LabelWidgetBoards from '../partials/dashboard/LabelWidgetBoards';
// import Banner from '../partials/Banner';

function ProjectDetails03() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState('Board Sprints');
  const [showOptions, setShowOptions] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem('selectedOption') || 'Board Sprints'
  );
  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  

    switch (event.target.value) {
      case 'Board Sprints':
        navigate('/projectdetails');
        break;
      case 'Sprint Health':
        navigate('/projectDetails2');
        break;
      case 'Sprint Tickets':
        navigate('/projectdetails3');
        break;
      default:
        navigate('/projectdetails');
    }
  };

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };


  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups && (groups.includes("Program_Manager") || groups.includes("Admin"))) {
        setIsAdmin(true);
      }
    };

    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "signIn") {
        checkIfAdmin();
      }
    });

    checkIfAdmin();
  }, []);

  if (!isAdmin) {
    return <div style={{textAlign:'center', paddingTop:'200px'}}><div style={{textAlign:'center', fontSize:'60px'}}  className='fa fa-lock'><h1 style={{fontSize:'30px'}}>Access to this page is restricted</h1></div><p style={{textAlign:'center', marginTop:'10px', marginLeft:'20px'}}>Only Program Manager Access Accepted </p></div>;
  }

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
                {/* <Datepicker /> */}
                {/* Add view button */}
                <span>    <div className="relative flex justify-center items-center space-x-4">
                <label style={{fontWeight:"bold", fontSize:'20px'}}>Sprint Tickets</label>
      <div
        className="relative rounded-md px-2 py-1 border border-gray-300 cursor-pointer bg-green-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-between items-center">
          <div className="text-white font-bold">{selectedOption}</div>
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
              onClick={() => handleOptionChange({ target: { value: 'Sprint Health' } })}
            >
              Sprint Health
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
    </div> </span>&nbsp;
                      
                
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3 mb-28">

              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 /> */}
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 /> */}
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard11 /> */}
              {/* <DashboardCard08 />
              <DashboardCard09 />
              <DashboardCard16 /> */}
              <DashboardCard05 />
              {/* Doughnut chart (Task By Status) */}
              {/* <DashboardCard06 /> */}
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              
            </div>

          </div>
          <footer class="p-2 md:px-4 md:py-4 z-10 left-20 bottom-0 w-full bg-custom3">
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

export default ProjectDetails03;