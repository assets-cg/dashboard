// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState } from 'react';
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
import LocationDetails01 from '../partials/dashboard/LocationDetails01';
// import Banner from '../partials/Banner';

function LocationDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>Add Location Details</label> &nbsp;
  {/* <select name="sprints" id="sprint ">
   <option value="sprint1">kpi_projSprint1</option>
    <option value="sprint2">kpi_projSprint2</option>
    <option value="sprint3">kpi_projSprint3</option>
  </select> */}
  </span>   
                <Datepicker />
                {/* Add view button */}
                <Link to="/adminPage">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" >
                    {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg> */}
                    <span className="hidden xs:block ml-2"> Previous Page</span>
                </button></Link> <br></br>
                           
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
              <LocationDetails01/> 
              
              
              {/* <DashboardCard23/> */}
            </div>

          </div>
        </main>

        {/* <Banner /> */}

      </div>
    </div>
  );
}

export default LocationDetails;