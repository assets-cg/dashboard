// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Alert, Stack } from '@mui/material';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';
import ReleaseDashboard01 from '../partials/dashboard/ReleaseDashboard01';
import ReleaseDashboard02 from '../partials/dashboard/ReleaseDashboard02';
import ReleaseDashboard03 from '../partials/dashboard/ReleaseDashboard03';
import ReleaseDashboard04 from '../partials/dashboard/ReleaseDashboard04';
import ReleaseDashboard05 from '../partials/dashboard/releaseDashboard05';
import ReleaseDashboard06 from '../partials/dashboard/ReleaseDashboard06';
import ReleaseDashboard07 from '../partials/dashboard/ReleaseDashboard07';

function ReleaseManagementView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState("");
  const [selectedProject, setSelectedProject] = useState('');
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const fetchProjectOptions = async () => {
      try {
        const reqData = await fetch(`${API_URL}projects?userName=${localStorage.getItem("projectUser")}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await reqData.json();
  
        const options = data.projects.map(project => ({
          id: project.id,
          projectName: project.projectName
        }));
  
        setProjectOptions(options);
  
        if (!selectedProject && options.length > 0) {
          setSelectedProject(options[0].projectName);
          localStorage.setItem('releaseProject', options[0].projectName);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProjectOptions();
  }, []);
  

  const handleProjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProject(selectedValue);
    localStorage.setItem('releaseProject', selectedValue);
  };

console.log(localStorage.getItem('releaseProject'))


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
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>Release Management View 
                <span>
        <select className='rounded py-0 ml-2 text-lg font-medium'
         value={selectedProject}
         onChange={handleProjectChange}
        >
          <option value="">Select project</option>
          {projectOptions.map(option => (
            <option key={option.projectName} value={option.projectName}>
              {option.projectName}
            </option>
          ))}
        </select>
      </span>
                 <div className ='absolute right-10 -mt-6'>{tokenExpiry === "Expired JWT token" || tokenExpiry ==="Invalid JWT token" && (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          Alert : <strong>JWT Token Expired / Invalid</strong>
        </Alert>
      </Stack> )}</div> </label> </span>&nbsp;

      
                
               <div className='inline-block absolute right-10 w-51'>
                {/* <Link  to="/deliverydashboard" >
                  <button type="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 m-1">  
                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg> 
                        <span>Prev</span>
                  </button> 
               </Link> */}
                </div>   
        
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">

                <ReleaseDashboard03/>
                <ReleaseDashboard04/>
                <ReleaseDashboard01/>
                <ReleaseDashboard02/>
                {/* <ReleaseDashboard05/> */}
                {/* <ReleaseDashboard06 /> */}
                <ReleaseDashboard07/>
                
          
              <DiscussionWidget />
              
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

export default ReleaseManagementView;