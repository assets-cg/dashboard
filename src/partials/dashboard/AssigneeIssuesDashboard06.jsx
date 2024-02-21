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
import {Alert, Stack} from '@mui/material';
import { API_URL, Bearer_Token } from '../../config';

function AssigneeIssuesDashboard06() {
  const location = useLocation();
//   console.log(location, " useLocation Hook");
//   const day = location.state?.day;
//   console.log(day);
  const [days, setDays]=useState(30);
  const [values, setValues] = useState([]);
  const [val, setval] = useState([]);
  const [status, setStatus] = useState();
  const [modalOpen, setModalOpen] = useState(true);
  const [assignee, setAssignee] = useState();
  const [pageNumber,setPageNumber]= useState(0);
  const [pageNumber2,setPageNumber2]=useState(0);

  const valuesPerPage=3
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
 useEffect( ()=>{
   const getAssigneeStatus= async()=>{
   const reqData= await fetch(`${API_URL}assigneeloadperstatus?projectName=DashboardProject&BoardId=2`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json(); 
  //  const reqData1= await fetch(`${API_URL}assigneestatusview?project&boardId&AssigneeName=${assignee}&statusPassed=${status}`,{
  //   headers: {
  //    'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  // }
 
//  });
//    const resData1= await reqData1.json();     
 setValues(resData.assigneeDetails);
//  setval(resData1.assigneeDetails);

   }
   getAssigneeStatus();
},[assignee, status,values]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 ">
       <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        {/* Icon */}
        {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      </header>
        <h3 className="font-semibold text-black">Assignee Efforts By Status</h3>    
      
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {values.length ?
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Assignee Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Done(In Hrs.)</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">To Do(In Hrs.)</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">In Progress(In Hrs.)</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Blocked(In Hrs.)</div>
                </th>
               
              </tr>
            </thead>
        
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((assigneeDetails,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div className="flex items-center">
                    <div className="text-white">{assigneeDetails.assignee}</div>
                  </div>
                </td>
                <td className="p-2 text-white">
                  <div className="text-center text-white" >{assigneeDetails.doneEffort}</div>
                </td>
                <td className="p-2 text-white">
                  <div className="text-center text-white" >{assigneeDetails.toDoEffort}</div>
                </td>
                <td className="p-2 text-white">
                  <div className="text-center text-white" >{assigneeDetails.inProgresEffort}</div>
                </td>
                <td className="p-2 text-white">
                  <div className="text-center text-white">{assigneeDetails.blockedEffort}</div>
                </td>
                </tr>
                )
              }
            </tbody>
          </table> : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No Data!</strong></Alert>
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
           
      
          
        </div>
      </div>
      </div>
    </div>
  );
}
export default AssigneeIssuesDashboard06;