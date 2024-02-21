// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_LINK } from '../../config';
import { Link, NavLink, useLocation } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';



function ApiWidget01(){

   const location = useLocation();
   console.log(location, " useLocation Hook");
   const min = location.state?.min1;
   const max = location.state?.max1;
   const job = location.state?.data;
  const [jobName,setJobName]=useState(job);
        return (
        <>
       
      
{/* <div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 bg-white hover:bg-green-500 hover:text-white  shadow-2xl rounded-3xl h-10">
     <NavLink to={'/basicstats'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"5%"}}>Basic Statistics</h2></span> 
</div>
</NavLink>
</div>



<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 bg-custom2 shadow-2xl rounded-3xl h-10">
     <NavLink to={'/httpstats'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"5%"}}>HTTP Statistics</h2></span> 
</div>
</NavLink>
</div> */}
<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 p-1 bg-white hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10">
     
     <NavLink to={'/basicstats'} state={{min1:min , max1:max, data:jobName}} >
        <div >
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>Basic Statistics</h2></span> 
</div>
</NavLink>
</div>
<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 p-1 bg-white hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10">
     
     <NavLink to={'/httpstats'} state={{min1:min , max1:max, data2:jobName}}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>HTTP Statistics</h2></span> 
</div>
</NavLink>
</div>

<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 p-1 bg-white hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10">
     
     <NavLink to={'/jvmstats-memory'} state={{min1:min , max1:max, data:jobName}}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>JVM Statistics-M</h2></span> 
</div>
</NavLink>
</div>

<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 p-1 bg-white hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10">
     
     <NavLink to={'/jvmstats-gc'} state={{min1:min , max1:max, data:jobName}}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>JVM Statistics-GC</h2></span> 
</div>
</NavLink>
</div>

<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 p-1 bg-white hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10">
     <NavLink to={'/hikaristats'} state={{min1:min , max1:max, data:jobName}}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>HikariCP Statistics</h2></span> 
</div>
</NavLink>
</div>

<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-2 p-1 bg-white hover:bg-green-500 hover:text-white border border-green-600 shadow-md shadow-slate-400 rounded-3xl h-10">
     
     <NavLink to={'/kibana-dashboard'}>
        <div>
   <span><h2 style={{fontWeight:"bold", fontSize:'15px', textAlign:'center', marginTop:"3%"}}>ELK Statistics</h2></span> 
</div>
</NavLink>
</div>


         </>
         );
  
     

};

export default ApiWidget01;