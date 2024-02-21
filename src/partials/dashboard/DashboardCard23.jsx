// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';
function DashboardCard23() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;
  // console.log(data)
  // console.log(data2)
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const [modalOpen, setModalOpen] = useState(true);
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getFeatureViewForSprint= async()=>{
   const reqData= await fetch(`${API_URL}featureviewforsprint?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.featureDetails)
   }
   getFeatureViewForSprint();
},[]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-7 bg-white shadow-2xl rounded-3xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">Feature Details</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          {values.length ?
            <div>
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue_Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue_Status</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Defect</div>
                </th> */}
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((featureDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">{featureDetails.name}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{featureDetails.issueKey}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">{featureDetails.issueStatus}</div>
                </td>
                {/* <td className="p-2">
                  <div className="text-center text-sky-500">{storyDetails.status}</div>
                </td> */}
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
            /></div></div> : <div className='absolute mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>}
        </div>
      </div>
    </div>
  );
}
export default DashboardCard23;