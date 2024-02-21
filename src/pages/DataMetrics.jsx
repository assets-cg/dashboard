// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link} from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import { API_URL } from '../config';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Flatpickr from 'react-flatpickr';

import ApiWidget01 from '../partials/dashboard/ApiWidget01';

import MetricsDashboard12 from '../partials/dashboard/MetricsDashboard12';
import MetricsDashboard13 from '../partials/dashboard/MetricsDashboard13';
import MetricsDashboard44 from '../partials/dashboard/MetricsDashboard44';
import MetricsDashboard45 from '../partials/dashboard/MetricsDashboard45';
import MetricsDashboard46 from '../partials/dashboard/MetricsDashboard46';
import MetricsDashboard47 from '../partials/dashboard/MetricsDashboard47';
import MetricsDashboard48 from '../partials/dashboard/MetricsDashboard48';
import MetricsDashboard49 from '../partials/dashboard/MetricsDashboard49';

import { makeStyles } from "@material-ui/core/styles";

import ApiDashboard02 from '../partials/dashboard/ApiDashboard02';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';


const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));


function DataMetrics() {

  const location = useLocation();
  console.log(location, " useLocation Hook");
  const jobName = location.state?.data;
  console.log(jobName)



  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [values, setValues] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [job, setJob] = useState(jobName);

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


  useEffect(() => {
    const sName=[];
    const getContainerDetails = async () => {
      const reqData= await fetch(`${API_URL}getAwsServiceDetails`);
      const resData= await reqData.json();
      console.log(resData.serviceSummaryList);  
      for(let i=0;i<resData.serviceSummaryList.length;i++){
        sName.push(resData.serviceSummaryList[i].serviceName)
      }
      setValues(sName)
      setJob(jobName)

    };
    getContainerDetails();

  }, [startDate, endDate,modalOpen]);
  console.log(values);
console.log(job);
console.log(serviceName);
console.log(startDate);
console.log(endDate);

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
  
  console.log(modalOpen)


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
         
            <WelcomeBanner />
            <div className="field bg-white">
            
             </div>
             
            <div className="grid grid-cols-12 gap-3">
           
            <ApiWidget01/>

          
            
            


            <ApiDashboard02/>
            
            
            </div>
            
            
           
            
            <div className="sm:flex p-2 sm:justify-between sm:items-center mb-2">
           
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
               
                
                <span><label style={{fontWeight:"bold", fontSize:'20px'}}>Basic Statistics </label>
              

                 
             
  </span>  
  <div className='inline-block absolute right-36 w-80 flex items-center'>
  <div class="relative">
  <button class="bg-white text-white border border-gray-300  rounded-md px-1 py-1" onClick={() => setShowDiv(!showDiv)}>📆</button> 
  {showDiv && (
    <div class="absolute z-10 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600  mt-2 w-80 px-2">
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
    <div className="border border-gray-300 rounded-md" style={{color:'white', marginRight: '2px', marginLeft: '4px'}}>
    <Flatpickr
      id="start-date"
      options={startOptions}
      placeholder="Start Date"
      className="w-48 px-2 py-1 text-black rounded-md"
    /></div>
    <div className="border border-gray-300 rounded-md" style={{color:'white', marginLeft: '5px', marginRight: '5px'}}>
    <Flatpickr
      id="end-date"
      options={endOptions}
      placeholder="End Date"
      className="w-48 px-2 py-1 text-black border rounded-md"
    /></div>
  </div>

 
      
  
             
  
        
                </div>
               
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
            {/* <ApiWidget01/> */}

              {/* <MetricsDashboard01/> */}
              
              <MetricsDashboard47 startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000} jobName={jobName}/>
              <MetricsDashboard48 startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000} jobName={jobName}/>
              <MetricsDashboard49 startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000} jobName={jobName}/>
             
              <MetricsDashboard45 startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000} jobName={jobName}/>
              <MetricsDashboard46 startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000} jobName={jobName}/>
              <MetricsDashboard44 startDate={new Date(startDate).getTime()/1000} endDate={new Date(endDate).getTime()/1000} jobName={jobName}/>

              <DiscussionWidget />
              
              
      
              
            </div> 


          </div>
  

          <footer class="p-2 md:px-4 md:py-4 z-10 left-20 bottom-0 w-full bg-custom3">
           <span style={{fontWeight:'600'}} class="block text-sm text-white sm:text-center dark:text-white bg-custom3">DAAS (Dashboard As A Service) ©  
            <a href="https://www.capgemini.com/"  target="_blank" class="hover:underline">Capgemini 2023</a>
             </span>
            </footer>
        </main>


      </div>
    </div>
  );
}

export default DataMetrics;