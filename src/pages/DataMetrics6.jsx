// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##


import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
import MetricsDashboard40 from '../partials/dashboard/MetricsDashboard40';
import MetricsDashboard51 from '../partials/dashboard/MetricsDashboard51';
import MetricsDashboard52 from '../partials/dashboard/MetricsDashboard52';
import ApiWidget01 from '../partials/dashboard/ApiWidget01';
import Flatpickr from 'react-flatpickr';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';
// import Banner from '../partials/Banner';

function DataMetrics6() {

  const location = useLocation();
  console.log(location, " useLocation Hook");
  const jobName = location.state?.data;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 3600000));
  const [endDate, setEndDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(true);
  const [showDiv, setShowDiv] = useState(false);

  const today = new Date();
  const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0);

  
  const startOptions = {
    dateFormat: 'd/m/Y h:i K',
    defaultDate : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 0, 0),
    enableTime: true,
    onChange: (selectedDates) => {
      setStartDate(selectedDates[0]);
    },
   
  
    
  };

  const endOptions = {
    dateFormat: 'd/m/Y h:i K',
    defaultDate : new Date(),
    enableTime: true,
    onChange: (selectedDates) => {
      setEndDate(selectedDates[0]);
    },
  };


  const handleTodayClick = () => {
    const today = new Date();
    setStartDate(targetDate);
    setEndDate(today);
    setShowDiv(!showDiv)
  };
  
  const handleYesterdayClick = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    setStartDate( new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 9, 0, 0));
    yesterday.setHours(21);
    yesterday.setMinutes(0);
    setEndDate(yesterday);
    setShowDiv(!showDiv)
  };
  
  const handleLast5DaysClick = () => {
    const today = new Date();
    const last5days = new Date(today);
    last5days.setDate(today.getDate() - 5);
    setStartDate(last5days);
    setEndDate(today);
    setShowDiv(!showDiv)
  };
  
    
    function handleFormSubmit(event) {
      event.preventDefault();
      const timeInput = event.target.elements.time;
      const unitInput = event.target.elements.units;
      const time = parseInt(timeInput.value, 10);
      const unit = unitInput.value;
  
      const now = new Date();
      let start = new Date(now);
      let end = new Date(now);
  
      switch (unit) {
        case 'minutes':
          start.setMinutes(now.getMinutes() - time);
          break;
        case 'hours':
          start.setHours(now.getHours() - time);
          break;
        case 'days':
          start.setDate(now.getDate() - time);
          break;
        default:
          break;
      }
  
      setStartDate(start);
      setEndDate(end);
      setShowDiv(!showDiv)
    }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  // console.log(event)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };
  
  const handleClick2=(val)=>{
    console.log(val)
    setServiceName(val)
   
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
            <WelcomeBanner />
            <div className="grid grid-cols-12 gap-3">
            <ApiWidget01/></div>
            
            {/* <WeatherDashboard/> */}

            {/* Dashboard actions */}
            <div className="sm:flex p-2 sm:justify-between sm:items-center mb-2">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mt-5">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>HikariCP Statistics </label> &nbsp;
             
  </span>   
  <div className='inline-block absolute right-36 w-80 flex items-center'>
  <div class="relative">
  <button class="bg-white text-white border border-gray-300 rounded-md px-1 py-1" onClick={() => setShowDiv(!showDiv)}>📆</button> 
  {showDiv && (
    <div class="absolute z-10 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 mt-2 w-80 px-2">
      <h3 style={{fontWeight:'600'}}>Quick Select</h3>
      <form
          className="flex items-center px-3"
          onSubmit={handleFormSubmit}
        >
         
  <label for="last" className='mr-1'>Last:</label>
  <input style={{border:'1px solid grey'}} type="number" id="time" name="time" className=" rounded-md py-0 px-1 mr-1 w-16"/>
  <select id="units" name="units" className=" rounded-md mr-2 py-0">
    <option value="minutes">Minutes</option>
    <option value="hours">Hours</option>
    <option value="days">Days</option>
  </select>
  <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-medium py-0 px-2 rounded-md">
    Apply
  </button>
</form>
<hr className='mt-2 border-gray-800 dark:border-gray-400'></hr>
      <h5 style={{fontWeight:'600'}}>Commonly Used.</h5>
      <ul>
      <li class="px-3 hover:bg-gray-100 text-blue-500 font-bold cursor-pointer" onClick={handleTodayClick}>Today</li>
        <li class="px-3 hover:bg-gray-100 text-blue-500 font-bold cursor-pointer" onClick={handleYesterdayClick}>Yesterday</li>
        <li class="px-3 hover:bg-gray-100 text-blue-500 font-bold cursor-pointer" onClick={handleLast5DaysClick}>Last 5 days</li>
      </ul>
    </div>
  )}
</div>

 
  
  <div className="relative flex items-center">
    <div className='rounded border border-gray-300' style={{color:'white', marginRight: '2px', marginLeft: '4px'}}>
    <Flatpickr
      id="start-date"
      options={startOptions}
      placeholder="Start Date"
      className="w-48 px-2 py-1 text-black rounded-md"
    /></div>
    <div className='rounded border border-gray-300' style={{color:'white', marginLeft: '5px', marginRight: '5px'}}>
    <Flatpickr
      id="end-date"
      options={endOptions}
      placeholder="End Date"
      className="w-48 px-2 py-1 text-black rounded-md"
    /></div>
  </div>
                </div>
               
              </div>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">

              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 /> */}
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 /> */}
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}

              <MetricsDashboard40  startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000}/>
              <MetricsDashboard51  startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000}/>
              <MetricsDashboard52  startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000}/>

            
              <DiscussionWidget />

              {/* <MetricsDashboard01/>
              <MetricsDashboard02/>
              <MetricsDashboard04/>
              <MetricsDashboard03/>
              <MetricsDashboard05/>
              <MetricsDashboard06/>
               */}

             
           
              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard13 /> */}
              
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

export default DataMetrics6;