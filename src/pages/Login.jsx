// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import { Auth, Hub } from 'aws-amplify';
import Sidebar from '../partials/Sidebar';
import Header2 from '../partials/Header2';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Datepicker from '../partials/actions/Datepicker';
import WeatherDashboard from '../partials/dashboard/WeatherDashboard';
import SignOutButton from './SignOutButton';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import BgImg from '../images/LoginBg.jpg';
import { Alert, Stack } from '@mui/material';
import { CircularProgress } from '@material-ui/core';
import lockedDoor from '../images/lockedDoor.png'

const Login = ({onClose}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  // const { signIn } = useAmplifyAuth();
  const [error, setError] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState("");
  const [msg , setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // const handleShowMore = () => {
  //   setShowPopup(true);
  // };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  // useEffect(() => {
  //   const checkTokenExpiry = async () => {
  //     try {
  //       const reqData = await fetch(`${API_URL}getProjects?userName=${localStorage.getItem("projectUser")}`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       const resData = await reqData.text();
  //       setTokenExpiry(resData)
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkTokenExpiry();
  // }, [tokenExpiry]);
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPopup(false)
    setLoading(true);
   
    try {
      const tokenData = await fetch(`${API_URL}tokens`)
     
           
           const Tdata = await tokenData.json();
           console.log(Tdata)
           const date = new Date(Tdata[Tdata.length-1].expireAt);
           const newTime = date.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000);
           const expiredate = new Date(newTime);
           console.log(expiredate);
           console.log(new Date())
          //  setLoading(false);
           if(Tdata.length === 0 || expiredate < new Date()){
            localStorage.setItem("token", "abcd")
            setMsg("Token not Generated or Token Expired")
            }else{
           localStorage.setItem("token", Tdata[Tdata.length-1].token)}
           localStorage.setItem("intervals",15);
          
           
      await Auth.signIn(email, password);
      console.log("Sucessessfully Signed In")
      const user = await Auth.currentAuthenticatedUser();
      localStorage.setItem("projectUser", user.attributes.email)
      const group = user.signInUserSession.accessToken.payload['cognito:groups'][0];
      console.log(group)
        console.log(localStorage.getItem('jobName'))
    switch (group) {
      case 'Admin':
        navigate('/admin');
        break;
      case 'Program_Manager':
        navigate('/projects');
        break;
      case 'Business_Owner':
        navigate('/businessownerview');
        break;
        case 'Service_Delivery_Manager':
        navigate('/servicedeliverydashboard');
        break;
      default:
        break;
    }
    } catch (error) {
      setError(error.message);
      setShowPopup(true);
      setLoading(false);
    }
  };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setShowPopup(false);
  //   setLoading(true);
    
  //   try {
  //     await Auth.signIn(email, password);
  //     console.log("Successfully Signed In");
      
  //     const user = await Auth.currentAuthenticatedUser();
  //     localStorage.setItem("projectUser", user.attributes.email);
      
  //     const group = user.signInUserSession.accessToken.payload['cognito:groups'][0];
  //     console.log(group);
      
  //     switch (group) {
  //       case 'Admin':
  //         navigate('/admin');
  //         break;
  //       case 'Program_Manager':
  //         navigate('/projects');
  //         break;
  //       case 'Business_Owner':
  //         navigate('/businessownerview');
  //         break;
  //       case 'Service_Delivery_Manager':
  //         navigate('/servicedeliverydashboard');
  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //     setShowPopup(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  return (
    <div className="flex h-screen overflow-hidden"> 
       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"> 
            <Header2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />    
              <section className="h-screen"> 
               <div className="h-full bg-orange-50">  
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6" >  
        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">      
        <img
          src={BgImg}
          className="w-auto"
          alt="Sample image"
        />     
         </div>     
  <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">  
  <form onSubmit={handleSubmit}>   
   <div className="flex flex-row  justify-center">
   
        <h1 className=" font-semibold">Welcome Back, KPI Dashboard User</h1>
            </div>  
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">    
  <p className="text-center mx-0 mb-0">Sign In</p>  </div>
  <div className="mb-6 input-control"> 
     <input
      type="email"
      className="form-control block input-field w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id="exampleFormControlInput2"
      placeholder="Email address"
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
    />  </div>  {/* <!-- Password input --> */}
  <div className="mb-6 input-control"> 
     <input
      className="form-control input-field block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id="exampleFormControlInput2"
      placeholder="Password"
      required
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    /> 
     </div> 
      <div className="flex justify-between items-center mb-6">   
       <div className="form-group form-check">    
         <input
        type="checkbox"
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        id="exampleCheck2"
      />    
        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
        >Remember me
        </label>   
       </div>   
        <Link className='forgotPass text-gray-800' to ={'/forgotpassword'}>Forgot Password ?</Link>
          </div> 
           <div className="text-center lg:text-left">   
           {loading && (
  <p className="flex items-center">
    <span className="mr-2 text-green-600 font-medium text-sm">Logging in...</span>
    <CircularProgress size='20px' />
  </p>
)}
            {!loading &&<button
             type="submit"
            className="inline-block px-7 py-3 bg-green-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"> 
           Login</button>}

           {showPopup && <div onClose={handleClosePopup} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <div className="bg-white w-auto h-auto rounded-lg p-6 relative">
            <button className="absolute top-0 right-0 m-2" onClick={handleClosePopup}>
              <svg className="h-5 w-5 text-gray-500 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className='text-red-700 font-bold'>{msg}</p>   
     {error && <div className="justify-between items-center"><img src={lockedDoor} alt="Access Denied" className="h-20 ml-20 shake-rotate" />
     <p className='text-red-500 font-bold error-message'> {error}</p></div>}
     </div>
     </div>
     </div>}
           
  </div>
  </form>
  </div> 
     </div> 
      </div>
      <footer class="p-2 md:px-4 md:py-4 z-10 left-20 bottom-0 w-full bg-custom3">
      <span style={{fontWeight:'600'}} class="block text-sm text-white sm:text-center dark:text-gray-400 bg-custom3">DAAS (Dashboard As A Service) ©  
            <a href="https://www.capgemini.com/"  target="_blank" class="hover:underline">Capgemini 2023</a>
             </span>
            </footer>
      </section>   
       </div>
         </div>
  );

}

export default Login;