// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Icon from '../../images/icon-01.svg';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import ReactPaginate from 'react-paginate';
import { getDrawerUtilityClass } from '@mui/material';
import { Select } from '@material-ui/core';
import { API_URL, Bearer_Token } from '../../config';
import {Alert, Stack} from '@mui/material';

function BusinessDashboardCard03() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const day = location.state?.day;
  // console.log(day);
const [values, setValues] = useState([]);
const [val,setVal]=useState([]);
const [pageNumber,setPageNumber]=useState(0);
const [pageNumber2,setPageNumber2]=useState(0);
const [bugKey,setbugKey]=useState();

const valuesPerPage=3
const pagesVisited=pageNumber * valuesPerPage
const pagesVisited2=pageNumber2 *valuesPerPage
const pageCount=Math.ceil(values.length/valuesPerPage)
const [modalOpen, setModalOpen] = useState(true);
const pageCount2=Math.ceil(val.length/valuesPerPage)
const changePage=({selected})=>{
  setPageNumber(selected);
};
const changePage2=({selected})=>{
  setPageNumber2(selected);
};
 useEffect( ()=>{
   const getPostProductionDetails= async()=>{
   const reqData= await fetch(`${API_URL}postproductiondetails`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   const resData1=await fetch(`${API_URL}bugspostproduction?BugKey=${bugKey}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const apidata=await resData1.json();
 setValues(resData)
setVal(apidata.bugInfo)
 console.log(resData)
   }
   
   getPostProductionDetails();
},[bugKey]);
// console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable1">
       <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        {/* Icon */}
        {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      </header>
        <h3 className="font-semibold text-black">Post Production Details</h3>    
      
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {values.length?
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Change Request</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created By</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Creation Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Priority</div>
                </th> 
                 <th className="p-2">
                  <div className="font-semibold text-center">Fixed in Build</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Bug Key</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((val,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div style={{textDecoration:'underline'}} className="flex items-center">
                    <Link><div className="text-white " onClick={() => setbugKey(val.bug_key)}>{val.change_request}</div></Link>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{val.created_by}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{val.creation_date}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{val.priority}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{val.fixed_in_build}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{val.bug_key}</div>
                </td>
                </tr>
                )
              }
            </tbody>
          </table> : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>
      }
          <div style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
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
        <h3 className="font-semibold text-black">Bug Info</h3>
      </header>
      {val.length?
           <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Bug Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Fixed in Build</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Bug Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Story Id</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {
                val.slice(pagesVisited2,pagesVisited2+valuesPerPage).map((bugInfo,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                  <div className="text-white">{bugInfo.summary}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: bugInfo.status === "Done" ? "darkgreen" : bugInfo.status === "In Progress" ? "yellow" : bugInfo.status === "To Do" ? "#ff7b00" :  "red" }} className="text-center">{bugInfo.status}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-700">{bugInfo.fixed_in_build}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{bugInfo.bugKey}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{bugInfo.storyId}</div>
                </td>
                </tr>
                )
              }
            </tbody>
          </table>
           : <div className='flec right-12 '>
           {modalOpen && (
       <Stack sx={{ width: '50%'}} spacing={2}>
    
       <Alert severity="error"> Alert — <strong>No data available/ Select change request</strong></Alert>
     </Stack>     )}
     </div>
     }
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
    </div>
  );
}
export default BusinessDashboardCard03;