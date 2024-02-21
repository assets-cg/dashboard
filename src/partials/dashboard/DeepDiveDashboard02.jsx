// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import {Link, useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

function DeepDiveDashboard02(props) {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const data2 = location.state?.projectname;//for projectname
  const data1 = location.state?.data1;//for sprintname 
  console.log(data1)
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [sprintName,setSprintName]=useState();
  const [modalOpen, setModalOpen] = useState(true);
  const [boardId,setboardId]=useState();
  const [projectName,setProjectName]=useState();
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEfforts= async()=>{
   const reqData= await fetch(`${API_URL}sprint_featureassociatedbyname?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${data1}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.featureDetails)
 setSprintName(data1);
 setProjectName(data2);
 setboardId(data);
   }
getEfforts();
},[data,data1,data2, localStorage.getItem("projectName"), localStorage.getItem("boardId"), values]);
console.log(values)
  return (
    <div className="col-span-full xl:col-span-7 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl ">
      <header className="px-5 py-4">
        <h3 className="font-semibold text-black">Features Associated to Sprint</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {values.length ?
          <div>
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Feature Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Feature Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                
                <th className="p-2">
                  <div className="font-semibold text-center">Assigned To</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((featureDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div style={{textDecoration:'underline'}} className="flex items-center text-white">
                  <Link to={"/featuredrilldown"} state={{featureKey:featureDetails.featureKey,sprintname:sprintName,boardid:boardId,projectname:projectName}}><div className="text-white">{featureDetails.id}</div></Link>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{featureDetails.summary}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{featureDetails.featureKey}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: featureDetails.status === "Done" ? "darkgreen" : featureDetails.status === "In Progress" ? "yellow" : featureDetails.status === "To Do" ? "#ff7b00" :  "red" }} className="text-center text-green-500">{featureDetails.status}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-600">{featureDetails.assignedTo}</div>
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
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previoustBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            /></div></div> : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>
      }
        </div>
      </div>
    </div>
  );
}
export default DeepDiveDashboard02;