// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_LINK } from '../../config';
import { Link, NavLink, useLocation } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';



function LabelWidgetSDM(){

   const location = useLocation();
   console.log(location, " useLocation Hook");
  
      return (
        <>
<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 p-0 hover:bg-green-500 hover:text-white border-solid border border-green-600  bg-custom2 shadow-md shadow-slate-400 mb-2  rounded-3xl h-10">
     
     <NavLink to={'/servicedeliverydashboard'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>SDM Dashboard 1</h2></span> 
</div>
</NavLink>
</div>
<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 p-0 hover:bg-green-500 hover:text-white border-solid border border-green-600 bg-custom2 shadow-md shadow-slate-400 mb-2 rounded-3xl h-10">
     
     <NavLink to={'/servicedeliverydashboard2'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>SDM Dashboard 2</h2></span> 
</div>
</NavLink>
</div>


         </>
         );
  
     

};

export default LabelWidgetSDM;