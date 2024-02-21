// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import {Link, useLocation} from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';
function DeepDiveDashboard03(props) {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const data2 = location.state?.projectname;//for projectname
  const data1 = location.state?.data1;//for sprintname 
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [sprintName, setsprintName]=useState([]);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEfforts= async()=>{
   const reqData= await fetch(`${API_URL}sprint_epicassociatedbysprintname?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${data1}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.epicsAssociated)
 setsprintName(data1)
   }
getEfforts();
},[data,data1,data2, localStorage.getItem("projectName"), localStorage.getItem("boardId")]);
console.log(values)
  return (
    <div className="col-span-full xl:col-span-6 bg-custom2 border-solid border-2 border-green-600 shadow-2xl rounded-3xl scrollTable">
      <header className="px-5 py-4 ">
        <h3 className="font-semibold text-black">Epics Associated to Sprint</h3>
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
                  <div className="font-semibold text-center">Epic Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic Status</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((epicsAssociated,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div style={{textDecoration:'underline'}} className="flex items-center text-white">
                  <Link to={'/storysummary'} state={{id: epicsAssociated.epicId, sprintname: sprintName}} ><div className="text-white">{epicsAssociated.epicId}</div></Link>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{epicsAssociated.epicKey}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: epicsAssociated.epicStatus === "Done" ? "darkgreen" : epicsAssociated.epicStatus === "In Progress" ? "yellow" : epicsAssociated.epicStatus === "TO DO" ? "#ff7b00" :  "red" }} className="text-center text-green-500">{epicsAssociated.epicStatus}</div>
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
            /></div></div>: <div className='absolute mt-14 ml-20'>
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
export default DeepDiveDashboard03;