// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_LINK } from '../../config';
import { Link, NavLink, useLocation } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';



function LabelWidgetBoards(){

   const location = useLocation();
   console.log(location, " useLocation Hook");
  
      return (
        <>
<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 p-0 bg-custom2 hover:bg-green-500 hover:text-white border-solid border border-green-600  shadow-md shadow-slate-400 rounded-3xl h-10 mb-2">
     
     <NavLink to={'/projectdetails'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>Sprints</h2></span> 
</div>
</NavLink>
</div>
<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 p-0 bg-custom2 hover:bg-green-500 hover:text-white border-solid border border-green-600  shadow-md shadow-slate-400 rounded-3xl h-10 mb-2">
     
     <NavLink to={'/projectDetails2'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>Sprint Health</h2></span> 
</div>
</NavLink>
</div>

<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 p-0 bg-custom2 hover:bg-green-500 hover:text-white border-solid border border-green-600  shadow-md shadow-slate-400 rounded-3xl h-10 mb-2">
     
     <NavLink to={'/projectdetails3'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>Sprint Tickets</h2></span> 
</div>
</NavLink>
</div>


         </>
         );
  
     

};

export default LabelWidgetBoards;