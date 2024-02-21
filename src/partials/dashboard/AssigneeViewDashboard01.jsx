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

function AssigneeViewDashboard01() {
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
   const getFeatureStatus= async()=>{
   const reqData= await fetch(`${API_URL}assigneeviewdetails?project&boardId`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json(); 
   const reqData1= await fetch(`${API_URL}assigneestatusview?project&boardId&AssigneeName=${assignee}&statusPassed=${status}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData1= await reqData1.json();     
 setValues(resData.assigneeDetails);
 setval(resData1.assigneeDetails);

   }
   getFeatureStatus();
},[assignee, status]);
// console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable2">
       <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        {/* Icon */}
        {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      </header>
        <h3 className="font-semibold text-black">Assignee Details</h3>    
      
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
                  <div className="font-semibold text-center">To Do</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">In Progress</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Done</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Work Effort(In Hrs.)</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Created</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">TaskStatus</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((assigneeDetails,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div style={{textDecoration:'underline'}} className="flex items-center">
                    <Link to={"/assigneeissues"} state={{name:assigneeDetails.assigneeName}}><div className="text-white">{assigneeDetails.assigneeName}</div></Link>
                  </div>
                </td>
                <td style={{textDecoration:'underline'}} className="p-2 text-white">
                  <Link><div className="text-center text-white" onClick={() => {setStatus("To Do"); setAssignee(assigneeDetails.assigneeName)}}>{assigneeDetails.toDo}</div></Link>
                </td>
                <td style={{textDecoration:'underline'}} className="p-2 text-white">
                  <Link><div className="text-center text-white" onClick={() => {setStatus("In Progress"); setAssignee(assigneeDetails.assigneeName)}}>{assigneeDetails.inProgress}</div></Link>
                </td>
                <td style={{textDecoration:'underline'}} className="p-2 text-white">
                  <Link><div className="text-center text-white" onClick={() => {setStatus("Done"); setAssignee(assigneeDetails.assigneeName)}}>{assigneeDetails.done}</div></Link>
                </td>
                <td className="p-2 text-white">
                  <div className="text-center text-white">{assigneeDetails.workEffortInHours}</div>
                </td>
                </tr>
                )
              }
            </tbody>
          </table> : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>Choose a container Please!</strong></Alert>
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
             <header className="px-5 py-4 ">
             {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        <h3 className="font-semibold text-black">Assignee View {status} Status for {assignee}</h3>
      </header>
      {val.length ?
           <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Assignee</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Type</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                val.slice(pagesVisited2,pagesVisited2+valuesPerPage).map((assigneeDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                  <div className="text-white">{assigneeDetails.issueKey}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{assigneeDetails.assignee}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: assigneeDetails.issueStatus === "Done" ? "darkgreen" : assigneeDetails.issueStatus === "In Progress" ? "yellow" : assigneeDetails.issueStatus === "To Do" ? "#ff7b00" :  "red" }} className="text-center text-green-500">{assigneeDetails.issueStatus}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{assigneeDetails.issueType}</div>
                </td>
                </tr>
                )
              }
            </tbody>
          </table>
           : <div className='absolute right-12 mt-0'>
           {modalOpen && (
       <Stack sx={{ width: '100%'}} spacing={2}>
    
       <Alert severity="error"> Alert — <strong>No data available/ Select issue Status</strong></Alert>
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
export default AssigneeViewDashboard01;