// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import Icon from '../../images/icon-01.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { API_URL, Bearer_Token } from '../../config';
import WeatherDisplay from './WeatherDisplay';
import { Country, State, City } from 'country-state-city';
import { Select } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import { createAPI } from 'openweatherapi-js-sdk';
import { Weather_API_KEY } from '../../config';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

function WeatherDashboard () {
  const [weather, setWeather] = useState([]);
  const [cName, setcName] = useState();
  const [cTemp, setcTemp] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cDescription, setcDescription] = useState([]);
  const [cIcon, setcIcon] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [values, setValues] = useState([]);
  const [cityC, setCityC] = useState("Bengaluru");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const api = createAPI("ee0b8cb4ccd0b58e4b6131c608477da5");

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleClick2 = (e) => {
    setCityC(e.target.innerText);
    fetchWeatherData(e.target.innerText); // Fetch weather data for the selected city
  };

  const fetchWeatherData = async (selectedCity) => {
    try {
      const response = await fetch(`${API_URL}weatherbycity?city=${selectedCity}&apiKey=${Weather_API_KEY}`,{
        headers: {
         'Authorization':  `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      const data = await response.json();
      console.log(data)
      setcName(data.city);
      setcTemp(data.temperature);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const sCities=[];
    var code = "";
    const getStatesOfCountry = async () => {
    const a=await api.weather.getWeatherByCityName({cityName: cityC,
    // units: "metric", // optional
  });
      const reqData= await fetch(`${API_URL}locationdetails`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      const resData= await reqData.json();   
   for(var i=0;i<resData.length;i++){
    sCities.push(resData[i].city);
   }   
  setValues(sCities);
  // setcName(a.name);
  // setcTemp(a.main.temp);
  

  setcDescription([a.weather[0].description]);
  setcIcon(a.weather[0].icon)
 
    };
    getStatesOfCountry();

    fetchWeatherData(cityC)

  }, [weather,cName,cDescription,cTemp,cIcon, values]);

  return (
    <div className="col-span-full shadow-2xl rounded-2xl weather ">  
      <div className="px-5 pt-5 ">   
        <header className="flex justify-between items-start mb-2">  
           {/* <h6 style={{fontSize:'13px', marginTop:'-12px'}} className="font-semibold text-slate-800">Today's Temperature </h6> */}
     {/* Icon */}
     {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
   </header>         
    {/* <span className="title">Weather App</span> */}
          {/* <br /> */}
          {/* <button className="btn-location" onClick={e=>Location()}>Locate Me</button> */}
          <div className="container">        
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-xs text-white p-0.5"
        aria-controls="days-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >         📌{cName}</button> 
      {/* <Link to={'/admin'}>⚙️</Link>  */}
        {/* <button className="getweather" onClick={e=> weatherData(e)}>Submit</button> */}
         <Menu
         
        id="days-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >          {values.map((val,key)=>  
      
      <MenuItem  value={val} onClick={(e)=>{handleClick2(e)}} > 
               {val}
        </MenuItem>        )
}
      </Menu>    
           <h1  style={{display:'inline', fontSize:'20px', marginLeft:'20px'}}>{(Math.floor(cTemp - 273.15))}°C</h1> 
           

</div>  


</div> 
 

</div> 
 );
  // console.log(city)
}
export default WeatherDashboard;