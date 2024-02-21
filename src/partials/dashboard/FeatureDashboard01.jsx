// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

function FeatureDashboard01() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid?.boardId;//for boaardid
  const [modalOpen, setModalOpen] = useState(true);
  const data2 = location.state?.projectname?.projectName;//for projectname
  const data1 = location.state?.sprintname?.sprintName;//for sprintname 
  const featureKey=location.state?.featureKey;//for featureKey
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEpicDetails= async()=>{
   const reqData= await fetch(`${API_URL}featuretoepicdetails?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${data1}&featureKey=${featureKey}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.epicDetails)
   }
   getEpicDetails();
},[[data1,featureKey]]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 border-solid border-2 border-green-600  shadow-2xl rounded-3xl scrollTable">
      <header className="px-5 py-4 ">
        <h3 className="font-semibold text-black">Epic Details</h3>
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
                  <div className="font-semibold text-center">Epic Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Feature Key</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((epicDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-white">{epicDetails.epicKey}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{epicDetails.epicId}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: epicDetails.epicStatus === "Done" ? "darkgreen" : epicDetails.epicStatus === "In Progress" ? "yellow" : epicDetails.epicStatus === "TO DO" ? "#ff7b00" :  "red" }} className="text-center text-green-500">{epicDetails.epicStatus}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{epicDetails.featureKey}</div>
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
            /></div></div>: <div className='absolute right-12 mt-0'>
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
export default FeatureDashboard01;