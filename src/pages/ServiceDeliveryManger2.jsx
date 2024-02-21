// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {Auth, Hub} from 'aws-amplify';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import lockedDoor from '../images/lockedDoor.png'
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DeepDiveDashboard02 from '../partials/dashboard/DeepDiveDashboard02';
import DeepDiveDashboard03 from '../partials/dashboard/DeepDiveDashboard03';
import DeepDiveDashboard04 from '../partials/dashboard/DeepDiveDashboard04';
import DeepDiveDashboard05 from '../partials/dashboard/DeepDiveDashboard05';
import WeatherDashboard from '../partials/dashboard/WeatherDashboard';
import ProjectDashboard1 from '../partials/dashboard/ProjectDashboard1';
import ProjectDashboard02 from '../partials/dashboard/ProjectDashboard02';
import ProjectDashboard04 from '../partials/dashboard/ProjectDashboard04';
import ProjectDashboard05 from '../partials/dashboard/ProjectDashboard05';
import DashboardCard15 from '../partials/dashboard/DashboardCard15';
import DashboardCard16 from '../partials/dashboard/DashboardCard16';
import DashboardCard14 from '../partials/dashboard/DashboardCard14';
import DashboardCard20 from '../partials/dashboard/StorySummaryCard01';
import DashboardCard21 from '../partials/dashboard/FeatureDashboard04';
import DashboardCard22 from '../partials/dashboard/StorySummaryCard02';
import SignOutButton from './SignOutButton';
import LabelWidgetSDM from '../partials/dashboard/LabelWidgetSDM';
import { Alert, Stack } from '@mui/material';
import { API_URL } from '../config';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';

// import Banner from '../partials/Banner';

function ServiceDeliveryManager2() {

  const location = useLocation();
  console.log(location, " useLocation Hook");
  const email = location.state?.data;
  console.log(email)

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);


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

  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups && (groups.includes("Service_Delivery_Manager") || groups.includes("Admin"))) {
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
    return (
      <div>
        <Header/>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={lockedDoor} alt="Access Denied" className="h-64 mb-8 shake-rotate" />
        <div className="text-center">
          <h1 className="text-4xl font-bold">Access to this page is restricted</h1>
          <p className="text-xl mt-4">Only <b>Service Delivery Manager</b> access accepted</p>
        </div>
      </div>
      </div>
    );
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
          {/* <SignOutButton/> */}

            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}

            <div className="grid grid-cols-12 gap-3">
            {/* <LabelWidgetSDM /> */}
            </div>
            
            {/* <WeatherDashboard/> */}

            {/* Dashboard actions */}
            <div className="sm:flex p-2 sm:justify-between sm:items-center mb-2">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mb-3">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>Service Now Tickets Details <div className ='absolute right-10 -mt-7'>{tokenExpiry === "Expired JWT token" || tokenExpiry ==="Invalid JWT token" && (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          Alert : <strong>JWT Token Expired / Invalid</strong>
        </Alert>
      </Stack> )}</div> </label> &nbsp;
  </span>   
  

                {/* <Datepicker /> */}
                {/* Add view button */}
                {/* <Link to="/">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" >
                
                    <span className="hidden xs:block ml-2"> Previous Page</span>
                </button></Link> <br></br> */}
                           
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">

             
            
           

              {/* <DashboardCard04 /> */}
              <DashboardCard09 />
              <DashboardCard05 />
              <DashboardCard02 />
              <DiscussionWidget />
              {/* <DashboardCard07 /> */}
              
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

export default ServiceDeliveryManager2;