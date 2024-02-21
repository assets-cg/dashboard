// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { API_URL } from '../config';
import { CircularProgress } from '@material-ui/core';
import UserTable from './UserTable';

const CreateAccountForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userGroup, setUserGroup] = useState('');
  const [userGroups, setUserGroups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleEdit = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const params = {
    UserPoolId: 'us-east-1_24YAXL0Ry',
  };

  useEffect(() => {

    const getGroups = async()=>{
      const user = await Auth.currentAuthenticatedUser();
      console.log(user)
      try {
        const response = await fetch(`${API_URL}cognitogroups`,{
          headers: {
           'Authorization':  `Bearer ${localStorage.getItem("token")}`,
        }
         
       });
       const groups = await response.json();
       console.log(groups);
       setUserGroups(groups);
    
      } catch (error) {
        console.error(error);
      }
      // const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
      
      
  }
  getGroups();
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}runscript?username=${email}&password=${password}&groupName=${userGroup}`,{
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
     setLoading(false);
     if (response.status === 200) {
      
      setMessage("User Created Successfully !!");
    } else {
      setMessage("Error creating user, Check credentials !")
      throw new Error(await response.text());
      
      
      
    }
    } catch (error) {
      setLoading(false);
      setMessage("Error creating user, Check credentials");
      console.error(error);
    }
  };


  return (
 



    <div className="flex flex-col col-span-full shadow-2xl sm:col-span-6 xl:col-span-4 h-80 bg-custom2 border-solid border-2 border-green-600 rounded-3xl scrollTable5">
     <main>
     <div className="grid grid-cols-6  gap-3 wrapper3 ">
     
        <div className='signUpForm'>
        {showPopup && <UserTable onClose={handleClosePopup}/> }  
    <form onSubmit={handleSignUp}>
    <div className="flex flex-row ">
         <h1 className=" font-semibold text-black -mt-4">Add New User</h1>
         <Link to={'/editusers'} className="absolute right-12 text-blue-600 text-sm">
              Edit User..
            </Link>
          </div> 

          
        <div className='input-control'>
        {/* <label  style={{fontWeight:"600", fontSize:'20px'}}>Add New User</label> */}
        
          <div className="flex justify-between items-center -mb-5 ml-4"> 
      <input
        className='input-field2'
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
      /></div></div>
      <div className='input-control'>
        
      <div className="flex justify-between items-center mb-4 ml-4"> 
     
      <input
      className='input-field2'
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        required
        
      />
      
      {/* <span style={{cursor:'default'}} onClick={() => setShowPassword(!showPassword)} className={`fa fa-eye${showPassword ? "" : "-slash"}`}></span> */}
      </div>
      <div className="flex items-center -mt-2 ml-4 ">
  <input
  style={{border:'0.5px solid black', width:'12px', height:'12px'}}
    type="checkbox"
    checked={showPassword}
    onChange={() => setShowPassword(!showPassword)}
  />
  <label className='ml-1 text-sm'>Show password</label>
</div>
<div className="flex justify-between items-center mt-2 mb-4 ml-4"> 
      <label >
        <select required className='p-1 rounded-md py-0 roledropdown' value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
          <option className='roleoptions' value="">Select User Role</option>
          {userGroups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </label>
      </div>
      </div>
      {loading && (
  <p className="flex items-center">
    <span className="mr-2 text-green-600 font-medium text-sm">Creating user...</span>
    <CircularProgress size='20px' />
  </p>
)}
      {!loading && <button className='btn bg-green-500 hover:bg-green-700 text-white rounded-lg p-1.5 ml-3 mb-2' type="submit" >Sign Up</button>}
      {message && (
  <p className={message.startsWith("User Created") ? "text-green-600 font-bold text-xs" : "text-red-600 font-bold text-xs" }>
    {message}
  </p>
)}  
     {/* <div className='input-control'>
      <input
      className='input-field2'
        type="text"
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
        placeholder="OTP"
        required
      /></div>
      <button className='btn bg-indigo-500 hover:bg-indigo-600 text-white input-submit ' onClick={handleConfirmSignUp}>Confirm Email</button> */}
    </form>
    </div>
    </div>
    </main>
    </div>
    
  );
};

export default CreateAccountForm;
