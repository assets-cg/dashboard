// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import {React, useState, useEffect} from "react";
import { API_URL, Bearer_Token } from "../../config";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function GenerateToken({onClose}) {
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


  const navigate = useNavigate();




  // useEffect(() => { 
  //   // do something with myValue // ...
  //    // Update the global variable when myValue changes u
  //    updateToken(myValue); }, [myValue]);

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
    const reqData = await fetch(`${API_URL}generatetoken?expiry=${expireAfterHours}:${expireAfterMinutes}&username=${username}&password=${password}`, {
      method: 'POST'
    });
    
    const tokenData = await fetch(`${API_URL}tokens`)
    const Tdata = await tokenData.json();
    localStorage.setItem("token", Tdata[Tdata.length-1].token)
    // console.log(localStorage.getItem("token") + " is your local token")
  
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
      setExpireAfter(`${expireAfterHours}:${expireAfterMinutes}`);
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

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
    <div className="col-span-full xl:col-span-5 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <div className="px-5 py-4">
        <h2 className="font-semibold text-black">Generate Token</h2>
      </div>
  
      <div className="w-80 mx-auto my-4">
        <form onSubmit={handleSubmit} className="rounded pt-2 pb-3 mb-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="rounded border border-gray-300">
                <input
                  className="w-full rounded py-1 px-2 text-gray-700 leading-tight focus:shadow-outline border border-gray-300"
                  id="username"
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
  
            <div>
              <label className="block font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="rounded border border-gray-300">
                <input
                  className="w-full rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
  
            <div className="col-span-2">
              <label className="block font-bold mb-2" htmlFor="expire-after">
                Expire After
              </label>
              <div className="flex items-center">
                <p className="text-black mr-2">Hours:</p>
                <div className="rounded border border-gray-300">
                  <input
                    type="number"
                    className="w-16 rounded border border-gray-400 bg-white text-gray-700 py-0 leading-tight focus:outline-none"
                    value={expireAfterHours}
                    placeholder="--"
                    required
                    min="0"
                    max="24"
                    onChange={(e) => setExpireAfterHours(e.target.value)}
                  />
                </div>
  
                <p className="text-black mx-2">Minutes:</p>
                <div className="rounded border border-gray-300">
                  <input
                    type="number"
                    className="w-16 rounded border border-gray-400 bg-white text-gray-700 py-0 leading-tight focus:outline-none"
                    value={expireAfterMinutes}
                    placeholder="--"
                    required
                    min="0"
                    max="59"
                    onChange={(e) => setExpireAfterMinutes(e.target.value)}
                  />
                </div>
              </div>
            </div>
  
            <div className="col-span-2 flex items-center justify-between">
              <button
                style={{ fontSize: '15px' }}
                className="bg-green-600 hover:bg-green-500 text-white font-sm py-2 px-4 rounded"
                type="submit"
                >
                Generate
                </button>
                <button
                style={{ fontSize: '15px' }}
                className="bg-red-600 hover:bg-red-500 text-white font-sm py-2 px-4 rounded"
                type="button"
                onClick={handleInvalidate}
                >
                Invalidate
                </button>

                <FontAwesomeIcon
          icon={showToken ? faEyeSlash : faEye}
          title={showToken ? 'Hide Token' : 'Show Token'}
          style={{ marginLeft: '10px' }}
          onClick={handleToggleTokenVisibility}
        />
      </div>
    </div>

    {tokenGenerated && (
      <div>
        <p style={{ fontSize: '13px', marginTop: '5px' }} className="text-green-300">
          Token generated successfully for {expireAfterHours} hours and {expireAfterMinutes} minutes
        </p>
      </div>
    )}

    {tokenInvalidated && (
      <p style={{ fontSize: '13px', marginTop: '5px' }} className="text-white">
        Token invalidated!
      </p>
    )}

    {errorMsg && (
      <p style={{ fontSize: '13px', marginTop: '5px' }} className="text-white">
        Invalid Username or Password
      </p>
    )}
  </form>

  <div className="flex items-center justify-center">
    {showToken && (
      <div className="mt-4">
        <p className="text-sm font-bold mb-2">Here's your token:</p>
        <textarea
          readOnly
          className="resize-none w-80 bg-transparent border-none text-xs"
          value={localStorage.getItem('token')}
        />
      </div>
    )}
  </div>
</div>

<div className="w-80 mx-auto my-4">
  <form onSubmit={handleSubmit2} className="rounded pt-2 pb-3 mb-2">
    <header className="py-4">
      <h2 className="font-semibold text-black">Set Prometheus URL</h2>
    </header>
    <input
      id="comment"
      name="comment"
      value={comment}
      required
      onChange={(event) => setComment(event.target.value)}
      className="w-full bg-gray-200 text-gray-700 border-solid border-1 py-2 border-black rounded leading-tight mb-2"
      placeholder="e.g. ec2-44-200-131-926.compute-1.amazonaws.com"
    />

    <div className="flex items-center justify-end">
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>

    {url && (
      <p style={{ fontSize: '13px', marginTop: '5px' }} className="text-green-600 font-medium">
        Prometheus URL set successfully!
      </p>
    )}
  </form>
</div>
</div>
</div>
</div>
);
  
}

export default GenerateToken;
