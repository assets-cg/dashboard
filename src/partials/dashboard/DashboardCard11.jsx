// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import {Link, useLocation} from "react-router-dom";
import { API_URL, Bearer_Token} from '../../config';
import DashboardCard06 from './DashboardCard06';
import { Alert, Stack } from '@mui/material';

function DashboardCard11() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  // console.log(data)
  // console.log(data2)
  const [values, setValues] = useState([]);
  const [val,setVal]=useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [pageNumber2,setPageNumber2]=useState(0);
  const [sprintId,setSprintId]=useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [sprintName,setSprintName]=useState("");
  const [sprintIdVar,setSprintIdVar]=useState(0);
  const [projectName,setProjectName]=useState();
  const [boardId,setBoardId]=useState();
  // const inputString = "kpi_projSprint1";
  // const outputString = inputString.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_");
  // console.log(outputString);

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
console.log(sprintIdVar)
 console.log(sprintId)
 useEffect( ()=>{
   const getSprints_TaskByStatus= async()=>{
   const reqData= await fetch(`${API_URL}sprints?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   const resData1=await fetch(`${API_URL}sprintdetails?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintId=${sprintId}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const apidata=await resData1.json();
 setProjectName(data2)
 setBoardId(data)  
 setValues(resData.sprints)
 setVal(apidata.sprintDetails)
   }
   getSprints_TaskByStatus();
},[sprintId, data, localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
console.log(values)
console.log(val)
// console.log(sprintName)
  return (
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl scrollTable2" >
      <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-black">List Of Sprints</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {values.length ?
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Planned Start Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actual Start Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Planned Completion Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actual Completion Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">State</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((sprints,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div style={{textDecoration:'underline'}} className="flex items-center">
                    <Link><div className="text-white" onClick={() => {setSprintId(sprints.id), setSprintName(sprints.name)}}>{sprints.id}</div></Link>
                  </div>
                </td>
                <td style={{textDecoration:'underline'}} className="p-2 text-white">
                  {/* <Link to={'/sprint'} state={{ data: {sprintIdVar}}}><div className="text-center" onClick={()=>setSprintIdVar(sprints.id)}>{sprints.name}</div></Link> */}
                  <Link to={'/sprintboard'} state={{ data: sprints.id,sprintnm: sprints.name,brdid:boardId}}><div className="text-center text-white">{sprints.name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")}</div></Link>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-700">{sprints.startDate}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{sprints.activatedDate ? sprints.activatedDate : "-"}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-600">{sprints.endDate}</div>
                </td>
                <td className="p-2">
  <div className="text-center text-white">
    {sprints.completeDate ? sprints.completeDate : "-"}
  </div>
</td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: sprints.state === "active" ? "darkgreen" : "red"}} className="text-center">{sprints.state}</div>
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
    <header className="px-5 py-4 border-b border-slate-100 mt-2">
        <h3 className="font-semibold text-black">Sprint Issue Details for {sprintName}</h3>
      </header>
      {val.length ?
           <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {
                val.slice(pagesVisited2,pagesVisited2+valuesPerPage).map((sprintDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div style={{textDecoration:'underline'}} className="flex items-center text-white">
                  <Link to={'/sprintdeepdive'} state={{ data1: sprintDetails.name}} ><div className="text-white" onClick={()=>{setSprintName(sprintDetails.name),  localStorage.setItem("sprintName", sprintDetails.name)}}>{sprintDetails.issueId}</div></Link>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{sprintDetails.issueKey}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-700">{sprintDetails.issueType}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{sprintDetails.name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")}</div>
                </td>
                </tr>
                )
              }
            </tbody>
          </table>
           : <div className='absolute right-12 mt-0'>
           {modalOpen && (
       <Stack sx={{ width: '100%'}} spacing={2}>
    
       <Alert severity="error"> Alert — <strong>No data available/ Select Sprint Id</strong></Alert>
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
  );
}
export default DashboardCard11;