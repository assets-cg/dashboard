// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import {Link, useLocation} from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import DashboardCard06 from './DashboardCard06';

function ApiDashboard02() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const min = location.state?.min;
  const max = location.state?.max;

  // console.log(data)
  // console.log(data2)
  const [values, setValues] = useState([]);
  const [serviceName, setServiceName] = useState("SprintDashboardRunnerService");
  const [jobName, setJobName] = useState("");
  const [pageNumber,setPageNumber]=useState(0);
  const [pageNumber2,setPageNumber2]=useState(0);
  const [mapping, setMapping]=useState(0)

  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pagesVisited2=pageNumber2 *valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)

  const handleClick=(e)=>{

    console.log(e.target)
    setServiceName(e.target.innerText)
    

  }

  const changePage=({selected})=>{
    setPageNumber(selected);
  };
  const changePage2=({selected})=>{
    setPageNumber2(selected);
  };

 useEffect( ()=>{
  
    if(serviceName === "SprintDashboardRunnerService"){
      setJobName("spring-actuator")
      
    }
   const getSprints_TaskByStatus= async()=>{

    const PromUrl = await fetch(`${API_URL}prometheusurls`,{
      headers: {
        'Authorization':  `Bearer ${localStorage.getItem("token")}`,
     }
    });
    const UrlData = await PromUrl.json();
           console.log(UrlData);



           localStorage.setItem("PromUrl" , UrlData[UrlData.length-1].prometheusUrl )

        console.log(localStorage.getItem("PromUrl"))   
    
   const reqData= await fetch(`${API_URL}awsservicedetails`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
    setValues(resData.serviceSummaryList)
    localStorage.setItem("conatinerName", resData.serviceSummaryList[1].serviceName)
   }
   getSprints_TaskByStatus();
},[values, serviceName]);
console.log(values)


  return (

    <div className="col-span-full xl:col-span-4 bg-custom2 rounded-lg shadow shadow-slate-100 border-solid border-2 border-green-600 " >
      {/* <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">List Of Containers</h3>
      </header> */}
      <div className="p-2">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs rounded bg-slate-50">
              <tr>
              {/* <th className="p-2">
                  <div className="flex items-center font-semibold text-center">Sr. no</div>
                </th> */}
                
                <th className="p-2">
                  <div className="flex items-center font-bold text-black-700  text-center">Select Container/App</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm  font-medium">
              {values
                .filter((service) => service.serviceName === "SprintDashboardRunnerService") // Filter by service name
                .slice(pagesVisited, pagesVisited + valuesPerPage) // Paginate the filtered data
                .map((service, key) => (
                  <tr key={key}>
                    <td className="p-2 text-white">
                      <div style={{ textDecoration: 'underline' }} className="flex items-center">
                        <Link state={{ data: jobName }}>
                          <div className="text-white" value={service.serviceName} onClick={(e) => { handleClick(e); console.log(e); localStorage.setItem('jobName', jobName) }}>{service.serviceName}</div>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <div className='pagination' style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
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
            /></div> */}
        </div>
      </div>
    </div>
  );

}

export default ApiDashboard02;
