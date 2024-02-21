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
import { API_URL, Bearer_Token} from '../../config';
import {Alert, Stack} from '@mui/material';

function AssigneeIssuesDashboard04() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const name = location.state?.name;
  // console.log(name);

  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [modalOpen, setModalOpen] = useState(true);

  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getAssigneeTasks= async()=>{
   const reqData= await fetch(`${API_URL}assigneetasks?project&boardId&AssigneeName=${name}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.taskDetails)
   }
   getAssigneeTasks();
},[]);

  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable3">
       <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        {/* Icon */}
        {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      </header>
        <h3 className="font-semibold text-black">Details Of Task Associated to {name}</h3>    
      
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {values.length?
          <table className="table-auto w-full" >
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Story Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Task Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Assigned To</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">TaskStatus</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium" >
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((taskDetails,key)=> 
                
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-white">{taskDetails.storyId}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{taskDetails.taskKey}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: taskDetails.status === "Done" ? "darkgreen" : taskDetails.status === "In Progress" ? "yellow" : taskDetails.status === "To Do" ? "#ff7b00" :  "red" }} className="text-center">{taskDetails.status}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white ">{taskDetails.assignTo}</div>
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
        </div>
      </div>
      </div>
    </div>
  );
}
export default AssigneeIssuesDashboard04;