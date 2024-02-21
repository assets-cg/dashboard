// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import JenkinsDashboard01 from '../partials/dashboard/JenkinsDashboard01';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import { Alert, Stack } from '@mui/material';
import AssigneeIssuesDashboard01 from '../partials/dashboard/AssigneeIssuesDashboard01';
import AssigneeIssuesDashboard02 from '../partials/dashboard/AssigneeIssuesDashboard02';
import AssigneeIssuesDashboard03 from '../partials/dashboard/AssigneeIssuesDashboard03';
import AssigneeIssuesDashboard04 from '../partials/dashboard/AssigneeIssuesDashboard04';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';



function AssigneeIssues() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState("");

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
        console.log("Error in Token");
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

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                
                {/* Add view button */}
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>Assignee Issues <div className ='absolute right-32 -mt-7'>{tokenExpiry === "Expired JWT token" || tokenExpiry ==="Invalid JWT token" && (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          Alert : <strong>JWT Token Expired / Invalid</strong>
        </Alert>
      </Stack> )}</div></label> </span>&nbsp;
                {/* <div>       */}
      
                <div className='inline-block absolute right-10 w-51'>
                <Link  to="/assigneeview" >
                  <button type="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 m-1">  
                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg> 
                        <span>Prev</span>
                  </button> 
               </Link>
                </div>    
        
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
          
              {/* <BusinessDashboardCard01 /> */}
              
              
              
              <AssigneeIssuesDashboard01/>
              <AssigneeIssuesDashboard02/>
              <AssigneeIssuesDashboard03/>
              <AssigneeIssuesDashboard04/>
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

export default AssigneeIssues;