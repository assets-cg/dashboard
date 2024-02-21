// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';
function DashboardCard18() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;
  // console.log(data)
  // console.log(data2)
  const [values, setValues] = useState([]);
  const [val, setVal] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getDefectDetails= async()=>{
   const reqData= await fetch(`${API_URL}defectdetails?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();
   const reqData1= await fetch(`${API_URL}featureviewforsprint?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData1= await reqData1.json();   
 setVal(resData1.featureDetails)   
 setValues(resData.defectDetails)
   }
getDefectDetails();
},[localStorage.getItem("boardId"), localStorage.getItem("projectName")]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl scrollTable1">
      <header className="px-5 py-4">
        <h3 className="font-semibold text-black">Defect Details</h3>
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
                  <div className="font-semibold text-center">Feature</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Story</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Defect</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((defectDetails,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div className="flex items-center">
                    <div className="text-white">{defectDetails.featureKey}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{defectDetails.epicId}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-700">{defectDetails.issueKey}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{defectDetails.bugKey}</div>
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
            /></div>
            </div>
            : <div className='relative mt-10 mb-10 ml-20'>
            {modalOpen && (
        <Stack sx={{ width: '70%'}} spacing={2}>
     
        <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
      </Stack>     )}
      </div>
      }
            
            <header className="px-5 py-4 ">
        <h3 className="font-semibold text-black">Feature Details</h3>
      </header>
      {val.length?
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
         
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Issue Status</div>
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
            <tbody className="text-sm font-medium">
              {
                val.slice(pagesVisited,pagesVisited+valuesPerPage).map((featureDetails,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div className="flex items-center">
                    <div className="text-white">{featureDetails.name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("_")}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{featureDetails.issueKey}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: featureDetails.issueStatus === "Done" ? "darkgreen" : featureDetails.issueStatus === "In Progress" ? "yellow" : featureDetails.issueStatus === "To Do" ? "#ff7b00" :  "red" }} className="text-center text-green-500">{featureDetails.issueStatus}</div>
                </td>
                {/* <td className="p-2">
                  <div className="text-center text-sky-500">{storyDetails.status}</div>
                </td> */}
                </tr>
                )
              }
            </tbody>
          </table> <div style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
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
          : <div className='relative mt-20 ml-20'>
          {modalOpen && (
      <Stack sx={{ width: '70%'}} spacing={2}>
   
      <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
    </Stack>     )}
    </div>
    }
        </div>
      </div>
    </div>
  );
}
export default DashboardCard18;