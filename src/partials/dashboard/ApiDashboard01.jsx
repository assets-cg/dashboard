// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import {Link, useLocation} from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import DashboardCard06 from './DashboardCard06';

function ApiDashboard01() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const jobName= location.state?.data2;
  const min = location.state?.min;
  const max = location.state?.max;

  // console.log(data)
  // console.log(data2)
  const [values, setValues] = useState([]);
  const [val,setVal]=useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [pageNumber2,setPageNumber2]=useState(0);
  const [containerUrl,setContainerUrl]=useState("r9tttzmic3.us-east-1.awsapprunner.com");
  const [jobs, setJobs] = useState();
  const [mapping, setMapping]=useState(0)
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = val.filter(api =>
    api.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };


  const valuesPerPage=15
  const pagesVisited=pageNumber * valuesPerPage
  const pagesVisited2=pageNumber2 *valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const pageCount2=Math.ceil(val.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
  const changePage2=({selected})=>{
    setPageNumber2(selected);
  };
 console.log(containerUrl)
 useEffect( ()=>{

   const sApi =[];
   const getSprints_TaskByStatus= async()=>{
   const reqData= await fetch(`${API_URL}awsservicedetails`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   const resData1=await fetch(`https://${containerUrl}/actuator/mappings`,{
    headers: {
      'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 });
   const apidata=await resData1.json();
   for(let i=0;i<apidata.contexts.application.mappings.dispatcherServlets.dispatcherServlet.length-6;i++){ 
    
    if(apidata.contexts.application.mappings.dispatcherServlets.dispatcherServlet[i].details !== null && apidata.contexts.application.mappings.dispatcherServlets.dispatcherServlet[i].details.handlerMethod.name !== "handle" && apidata.contexts.application.mappings.dispatcherServlets.dispatcherServlet[i].details.handlerMethod.name !== "links" ){
        sApi.push(apidata.contexts.application.mappings.dispatcherServlets.dispatcherServlet[i].details.handlerMethod)
    }

     }  

 setValues(resData.serviceSummaryList)
 setVal(sApi)
 console.log(apidata.contexts.application.mappings.dispatcherServlets.dispatcherServlet)
   }
   getSprints_TaskByStatus();
},[containerUrl, mapping, data]);
console.log(values)
console.log(val)
console.log(localStorage.getItem('api'))
  return (

    <div className="col-span-full xl:col-span-5 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl" >
      <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-black ">List Of Containers</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-sm  text-black bg-slate-50 rounded-sm">
              <tr>
              <th className="p-2">
                  <div className="flex items-center font-semibold text-center">Sr. no</div>
                </th>
                
                <th className="p-2">
                  <div className="flex items-center font-semibold text-center">Name</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((service,key)=>
                <tr key={key}>
                <td className="p-2 text-white">
                  <div className="flex items-center">
                    <div className="text-sm text-white">{key + 1}</div>
                  </div>
                </td>

                <td className="p-2 text-white">
                  <div style={{textDecoration:'underline'}} className="flex items-center ">
                  <Link><div className="text-white" onClick={() => setContainerUrl(service.serviceUrl)}>{service.serviceName}</div></Link>
                  </div>
                </td>
                {/* <td style={{textDecoration:'underline'}} className="p-2">
                  <Link to={'/sprint'} state={{ data: {sprintIdVar}}}><div className="text-center" onClick={()=>setSprintIdVar(sprints.id)}>{sprints.name}</div></Link>
                  <Link to={'/sprintboard'} state={{ data: sprints.id,sprintnm: sprints.name,brdid:boardId}}><div className="text-center">{sprints.name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")}</div></Link>
                </td> */}
                </tr>
                )
              }
            </tbody>
          </table>
          <div className='pagination' style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previoustBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            /></div>
    <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-white">API Details</h3>
      </header>
      <label><span className="ml-2 items-center text-sm font-semibold">Search API :</span>
      <input
        type="text"
        placeholder="Enter API name"
        value={searchTerm}
        onChange={handleSearch}
        className="w-60 ml-2 -mt-32 py-1 px-4 rounded-md border-2 border-black-600 focus:outline-none"
      /></label>
           <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-sm  text-black bg-slate-50 rounded-sm">
              <tr>
              <th className="p-2">
                  <div className="flex items-center font-semibold text-center">Sr. no</div>
                </th>
                <th className="p-2">
                  <div className="flex items-center font-semibold text-center">API Name</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-md font-medium ">
              {filteredData.slice(pagesVisited2,pagesVisited2+valuesPerPage).map((api,key)=>
           
               
                <tr key={key}>
                    <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-sm text-white">{key + 1}</div>
                  </div>
                </td>
                  <td className="p-2 text-md text-white ">
                  <div style={{textDecoration:'underline'}} className="flex items-center">
              <Link state={{api:api.name}}><div className="text-white" onClick={()=>{setMapping(api.name), setJobs("spring-actuator");}}>{api.name}</div></Link>
                  </div>
                </td>
                </tr>
        )
              }
            </tbody>
          </table>
          <div style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount2}
            onPageChange={changePage2}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previoustBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            /></div>
        </div>
      </div>
    </div>
  );
}
export default ApiDashboard01;