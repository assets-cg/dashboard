// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##


import React, { useState, useEffect } from 'react';
import { useLocation, Link} from 'react-router-dom';
import {Auth, Hub} from 'aws-amplify';
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
import ApiWidget01 from '../partials/dashboard/ApiWidget01';
import ApiDashboard01 from '../partials/dashboard/ApiDashboard01';
import MetricsDashboard40 from '../partials/dashboard/MetricsDashboard40';
// import Banner from '../partials/Banner';

function ApiViews() {

  const location = useLocation();
  console.log(location, " useLocation Hook");
  const email = location.state?.data;
  console.log(email)

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const checkIfAdmin = async () => {
  //     const user = await Auth.currentAuthenticatedUser();
  //     const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

  //     if (groups && (groups.includes("Program_Manager") || groups.includes("Admin"))) {
  //       setIsAdmin(true);
  //     }
  //   };

  //   Hub.listen("auth", ({ payload: { event, data } }) => {
  //     if (event === "signIn") {
  //       checkIfAdmin();
  //     }
  //   });

  //   checkIfAdmin();
  // }, []);

  // if (!isAdmin) {
  //   return <div style={{textAlign:'center', paddingTop:'200px'}}><div style={{textAlign:'center', fontSize:'60px'}}  className='fa fa-lock'><h1 style={{fontSize:'30px'}}>Access to this page is restricted</h1></div><p style={{textAlign:'center', marginTop:'10px', marginLeft:'20px'}}>Only Program Manager Access Accepted </p></div>;
  // }

  return (
    <div className="flex h-screen overflow-hidden">

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
            <WelcomeBanner />
            {/* <div className="grid grid-cols-12 gap-3">
            <ApiWidget01/></div> */}
            {/* <WeatherDashboard/> */}

            {/* Dashboard actions */}
            <div className="sm:flex p-2 sm:justify-between sm:items-center mb-2">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>Container Details</label>
                {/* <ApplicationDropdown/> */}
                 &nbsp;
             
  </span>   
  <div className='inline-block absolute right-10 w-51'>
                <Link  to="/admin" >
                  <button type="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 mb-1">
                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                        <span>Set Thresholds</span>
                  </button> 
               </Link>
               {/* <Link to="/httpstats">
                  <button type="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800"> 
                        <span>Next</span>
                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                  </button>
                </Link> */}
                </div>
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
           
           <ApiDashboard01/>
            </div> 

          </div>
          <footer class="p-2 rounded-lg md:px-4 md:py-4 z-10 left-20 bottom-0 w-full bg-white">
           <span style={{fontWeight:'600'}} class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 bg-white">DAAS (Dashboard As A Service) ©  
            <a href="https://www.capgemini.com/"  target="_blank" class="hover:underline">Capgemini 2023</a>
             </span>
            </footer>
        </main>

        {/* <Banner /> */}

      </div>
    </div>
  );
}

export default ApiViews;