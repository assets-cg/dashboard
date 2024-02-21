// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate, Link } from 'react-router-dom';
import Header2 from '../partials/Header2';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import BgImg from '../images/LoginBg.jpg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [reset, setReset] = useState(false);
  const navigate = useNavigate();

  async function handleForgotPasswordSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await Auth.forgotPassword(email);
      setSent(true);
    } catch (error) {
      alert("Email Id not Registered")
      console.error(error);
    }
    setLoading(false);
  }
  async function handleResetPasswordSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      setReset(true);
      alert("Password reset Sucessfully")
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false);
  }
  return (
 <div className="flex h-screen overflow-hidden">
  <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 
       <section className="h-screen">
        <div className="h-full bg-orange-50">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
    <img
      src={BgImg}
      className="w-auto"
      alt="Sample image"
    />  
    </div>        
    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

      {/* <form onSubmit={handleForgotPasswordSubmit}> */}
        <div className="flex flex-row  justify-center">
          {/* <h1 className=" font-semibold">Welcome back User</h1> */}
          </div>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-medium mx-0 mb-0">Reset Password</p></div>
          <div className="text-center lg:text-left">{error && <p style={{ color: 'red' }}>{error}</p>}
            
             {!sent && !reset && (
        <form  onSubmit={handleForgotPasswordSubmit}>       
           <input
           className='input-field'
            type="email"
            placeholder='Registered Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />       
        <button style={{marginTop:'20px'}} className='btn bg-green-500 hover:bg-green-700 text-white input-submit' type="submit">      
                {loading ? 'Sending...' : 'Send OTP'}
          </button> 
          <Link style={{textDecoration:'none', color:'black' , marginLeft:'15px'}} to={'/'}>Cancel</Link> 
        </form>      
        )}
      {sent && !reset && (
        <form className='input-control' onSubmit={handleResetPasswordSubmit}>   
       <input className='input-field'
            type="text"
            placeholder = "Enter the OTP"
            value={code}
            onChange={e => setCode(e.target.value)}
          />     
        <input
        className='input-field'
            type="password"
            placeholder = "Enter new Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />      
    <button style={{marginTop:'10px'}} className='btn bg-green-500 hover:bg-green-700 text-white input-submit' type="submit">           
     {loading ? 'Resetting...' : 'Reset Password'}
    </button>  
       {error && <p style={{ color: 'red' }}>{error}</p>}  
          <Link style={{textDecoration:'none', color:'black' , marginLeft:'15px'}} to={'/'}>Cancel</Link>  
           
           </form>     
         )}
      
      {sent && !reset && (
        <p style={{color:'green', fontSize:'15px', fontWeight:'600'}}>OTP sent to your registered Email !</p>      )}
      {reset &&  
        (
        alert("Reset Password Successessfully")
           )}
    </div>    
           
            </div>

            
          </div>
          </div>
          <footer class="p-2 rounded-lg md:px-4 md:py-4 z-10 left-20 bottom-0 w-full bg-white">
          <span style={{fontWeight:'600'}} class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 bg-white">DAAS (Dashboard As A Service) ©  
            <a href="https://www.capgemini.com/"  target="_blank" class="hover:underline">Capgemini 2023</a>
             </span>
            </footer>

        {/* </div> */}
      </section>

      {/* <Banner /> */}
      </div>
      </div>
          );
}
export default ForgotPassword;