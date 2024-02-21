// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { API_URL, Bearer_Token } from '../../config';
function StorySummaryCard02() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const epicId= location.state?.id;
  const sprintnm= location.state?.sprintname;
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEpicToStoryDetails= async()=>{
   const reqData= await fetch(`${API_URL}epictostorydetails?project=DashboardProject&boardID=2&sprintName=${sprintnm}&epicId=${epicId}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.epicDetails)
   }
   getEpicToStoryDetails();
},[]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 border-solid border-2 border-green-600 shadow-2xl rounded-3xl scrollTable5">
      <header className="px-5 py-4 ">
        <h3 className="font-semibold text-black">Epic to Story Details</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Story Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Story Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created Time</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Story Status</div>
                </th>
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
                    <div className="text-white">{epicDetails.epickey}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{epicDetails.storykey}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-700">{epicDetails.storyId}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{epicDetails.createdTime}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: epicDetails.storyStatus === "Done" ? "darkgreen" : epicDetails.storyStatus === "In Progress" ? "yellow" : epicDetails.storyStatus === "To Do" ? "#ff7b00" :  "red" }} className="text-center text-sky-500">{epicDetails.storyStatus}</div>
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
            /></div>
        </div>
      </div>
    </div>
  );
}
export default StorySummaryCard02;