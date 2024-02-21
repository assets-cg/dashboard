// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import lockedDoor from '../images/lockedDoor.png'
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
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
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import UserTable from './UserTable';
import NotificationBell2 from '../partials/dashboard/NotificationBell2';
import MetricsDashboard53 from '../partials/dashboard/MetricsDashboard53';
import MetricsDashboard50 from '../partials/dashboard/MetricsDashboard50';
import DashboardCard25 from '../partials/dashboard/DashboardCard25';
import DiscussionWidget from '../partials/dashboard/DiscussionWidget';
import DashboardCard35 from '../partials/dashboard/DashboardCard35';
import KibanaDashboard01 from '../partials/dashboard/KibanaDashboard01';
import KibanaDashboard02 from '../partials/dashboard/KibanaDashboard02';
import KibanaDashboard03 from '../partials/dashboard/KibanaDashboard03';
import ApiWidget01 from '../partials/dashboard/ApiWidget01';
// import Banner from '../partials/Banner';

function KibanaDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'hour'));
   const [endDate, setEndDate] = useState(moment());
   const [tokenExpiry, setTokenExpiry] = useState("");
   const [showPopup, setShowPopup] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpen2, setModalOpen2] = useState(false);
   const [token, setToken] = useState("");  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expireAfterHours, setExpireAfterHours] = useState();
  const [expireAfterMinutes, setExpireAfterMinutes] = useState();
  const [expireAfter, setExpireAfter] = useState();
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [url, setUrl] = useState(false);
  const [tokenInvalidated, setTokenInvalidated] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myValue, setMyValue] = useState(token);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('Log Counts'); // Initialize with the default tab


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

   function handleOpenModal() {
    setModalOpen(true);
    setModalOpen2(false);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    // Handle logic to close the modal
  };

  function handleOpenModal2() {
    setModalOpen2(true);
    setModalOpen(false);
  }

  const handleCloseModal2 = () => {
    setModalOpen2(false);

  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };
  const navigate = useNavigate();


  async function handleSubmit2(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}postprometheusurl`, {
        prometheusUrl: comment,
      },{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
     localStorage.setItem("PromUrl" , comment)
     setUrl(true)
    //  console.log(localStorage.getItem("PromUrl"));
    } catch (error) {
      console.error(error);
    }
  }
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = await fetch(`${API_URL}generatetoken?username=${username}&password=${password}`, {
      method: 'POST'
    });
    
    const tokenData = await fetch(`${API_URL}tokens`)
    const Tdata = await tokenData.json();
    localStorage.setItem("token", Tdata[Tdata.length-1].token)
    console.log(localStorage.getItem("token") + " is your local token")
  
    const resData = await reqData.text();
        
    setToken(resData);
    setShowToken(false);
   
  
    if (resData === "Invalid username or password") {
      setErrorMsg("Invalid username or password");
      setTokenGenerated(false);
      setTokenInvalidated(false);
    } else {
      setTokenGenerated(true);
      setTokenInvalidated(false);
      console.log("Generating token...");
      setErrorMsg(false);
      // setExpireAfter(`${expireAfterHours}:${expireAfterMinutes}`);
      navigate('/businessownerview'); // navigate to page after token generation
    }
    // updateToken(token);
  };

  function handleToggleTokenVisibility() {
    setShowToken(!showToken);
  }
  

  const handleInvalidate = async () => {
    try {
      await fetch(`${API_URL}deletetoken?token=${localStorage.getItem("token")}`, {
        method: 'DELETE'
      });
      setTokenInvalidated(true);
      setTokenGenerated(false);
      setErrorMsg(false)
      localStorage.removeItem("token")
      console.log("Invalidating token...");
      navigate('/businessownerview');
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user
      console.error(error);
    }
  };

  const handleExpireAfterChange = (e) => {
    const input = e.target.value;
      
  };

  const handleExpireAfterHoursChange = (event) => {
    setExpireAfterHours(parseInt(event.target.value));
    // console.log(expireAfterHours)
  };

  const handleExpireAfterMinutesChange = (event) => {
    setExpireAfterMinutes(parseInt(event.target.value));
    // console.log(expireAfterMinutes)
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

            <div className="grid grid-cols-12 gap-3 mb-4">
           
            <ApiWidget01/>

            </div>

            {/* Dashboard actions */}
            {/* <div>
            <div className="relative py-2 flex justify-center items-center space-x-12">
    <span
      className={`px-4 py-2 cursor-pointer bg-white font-medium hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10 ${
        activeTab === 'Log Counts' ? 'font-bold' : ''
      }`}
      onClick={() => handleTabClick('Log Counts')}
    >
      Log Counts
    </span>
    <hr className="w-px h-6 bg-black mx-3" ></hr>
    <span
      className={`px-4 py-2 cursor-pointer bg-white font-medium hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10 ${
        activeTab === 'Log Streams' ? 'font-bold' : ''
      }`}
      onClick={() => handleTabClick('Log Streams')}
    >
      Log Streams
    </span>
    <hr className="w-px h-6 bg-black mx-3" ></hr>
    <span
      className={`px-4 py-2 cursor-pointer bg-white font-medium hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10 ${
        activeTab === 'Log Requests' ? 'font-bold' : ''
      }`}
      onClick={() => handleTabClick('Log Requests')}
    >
      Log Requests
    </span>
  </div>
</div> */}
<span><label style={{fontWeight:"bold", fontSize:'20px'}}>ELK Statistics </label></span>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
             
            <KibanaDashboard01 />
           {/* <KibanaDashboard02 />
            <KibanaDashboard03 />              */}
              <DiscussionWidget/>



              {/* <DashboardCard25/> */}
              
              {/* <GenerateToken/> */}
              {/* <NotificationWidget/> */}
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

export default KibanaDashboardPage;