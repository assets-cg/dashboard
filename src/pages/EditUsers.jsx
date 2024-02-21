// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import lockedDoor from '../images/lockedDoor.png'
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
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
import {Link} from "react-router-dom";
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DeepDiveDashboard02 from '../partials/dashboard/DeepDiveDashboard02';
import Dashboard from './Dashboard';
import DeepDiveDashboard03 from '../partials/dashboard/DeepDiveDashboard03';
import DeepDiveDashboard04 from '../partials/dashboard/DeepDiveDashboard04';
import DeepDiveDashboard05 from '../partials/dashboard/DeepDiveDashboard05';
import DashboardCard17 from '../partials/dashboard/DashboardCard17';
import DashboardCard18 from '../partials/dashboard/DashboardCard18';
import DashboardCard19 from '../partials/dashboard/DashboardCard19';
import DashboardCard20 from '../partials/dashboard/DashboardCard20';
import DashboardCard21 from '../partials/dashboard/DashboardCard21';
import DashboardCard22 from '../partials/dashboard/DashboardCard22';
import DashboardCard23 from '../partials/dashboard/DashboardCard23';
import AdminCard01 from '../partials/dashboard/AdminCard01';
import CreateAccountForm from './CreateAccountForm';
// import UserTable from './UserTable';
import { Auth, Hub } from "aws-amplify";
import AdminCard02 from '../partials/dashboard/AdminCard02';
import { EuiDatePicker, EuiDatePickerRange } from '@elastic/eui';
import moment from 'moment';
import DateSelector from '../partials/dashboard/DateSelector';
import IntervalSet from '../partials/dashboard/IntervalSet';
import GenerateToken from '../partials/dashboard/GenerateToken';
import NotificationWidget from '../partials/dashboard/NotificationWidget';
import { API_URL } from '../config';
import { Alert, Stack } from '@mui/material';
import UserTable from './UserTable';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';
// import Banner from '../partials/Banner';

function EditUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'hour'));
   const [endDate, setEndDate] = useState(moment());
   const [tokenExpiry, setTokenExpiry] = useState("");

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
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
        console.log("Error in Token");
      }
    };
    checkTokenExpiry();
  }, [tokenExpiry]);

  // if (tokenExpiry === "Expired JWT token") {
         
  //   // display alert message
  //   const alertMessage = (
  //     <div className='absolute right-10 -mt-6'>
  //       <Stack sx={{ width: '100%' }} spacing={2}>
  //         <Alert severity='error'>
  //           Alert — <strong>JWT Token Expired!! Generate New Token..</strong>
  //         </Alert>
  //       </Stack>
  //     </div>
  //   );
  //   // render the alert message in the DOM
  //   // ReactDOM.render(alertMessage, document.getElementById('alert-container'));
  // } else {
  //   // handle other errors
  //   console.log("error");
  // }
  // console.log(tokenExpiry)

  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups && groups.includes("Admin")) {
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
          <p className="text-xl mt-4">Only <b>Admin</b> access accepted</p>
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

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-2">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                <span><label style={{fontWeight:"bold", fontSize:'20px', }}>Edit Users <div className ='absolute right-10 -mt-6'>{tokenExpiry === "Expired JWT token" || tokenExpiry ==="Invalid JWT token" && (
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity='error'>
          Alert : <strong>JWT Token Expired / Invalid</strong>
        </Alert>
      </Stack> )}</div> </label> &nbsp;
  {/* <select name="sprints" id="sprint ">
   <option value="sprint1">kpi_projSprint1</option>
    <option value="sprint2">kpi_projSprint2</option>
    <option value="sprint3">kpi_projSprint3</option>
  </select> */}
  </span>   
  
  <div className='inline-block absolute right-10 w-51'>
  {/* <DateSelector/> */}
                {/* <Link  to="/deliverydashboard" >
                  <button type="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 m-1">  
                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg> 
                        <span>Prev</span>
                  </button> 
               </Link> */}
                </div>
                {/* Add view button */}
                {/* <Link to="/addLocationDetails">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" >
                    {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg> */}
                    {/* <span className="hidden xs:block ml-2"> Add City</span> */}
                {/* </button></Link>  */} 
                <br></br> 
                           
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
              {/* <DashboardCard20 /> 
              
              <DashboardCard17 /> */}
              
              {/* <AddThresholds/> */}
              
              <UserTable/>
              <DiscussionWidget />
              {/* <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="Start date"
        />      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          startDate={startDate}
          endDate={endDate}
          isInvalid={endDate < startDate}
          aria-label="End date"
        />      }
      aria-label="Date range"
    /> */}

    
             
              
              {/* <UserTable/> */}
              {/* <DashboardCard21 />
              <DashboardCard19 /> */}
              {/* <DashboardCard23/> */}
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

export default EditUsers;