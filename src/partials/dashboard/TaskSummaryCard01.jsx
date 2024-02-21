// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##import React from 'react';

import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { API_URL, Bearer_Token } from '../../config';
function TaskSummaryCard01() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const data2 = location.state?.projectname;//for projectname
  const sprintnm = location.state?.sprintnm;//for sprintname 
  const id = location.state?.id;
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getStoryToTaskDetails= async()=>{
   const reqData= await fetch(`${API_URL}storytotaskdetails?project=DashboardProject&boardID=2&sprintName=${sprintnm}&storyId=${id}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.taskDetails)
   }
   getStoryToTaskDetails();
},[]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-12 bg-custom2 border-solid border-2 border-green-600 shadow-2xl rounded-3xl  scrollTable1">
      <header className="px-5 py-4 ">
        <h3 className="font-semibold text-black">Story to Task Details</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Story Key</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Task Key</div>
                </th> */}
                <th className="p-2">
                  <div className="font-semibold text-center">Task Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Time Spent In Days</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">TaskStatus</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((taskDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-white">{taskDetails.storyKey}</div>
                  </div>
                </td>
                {/* <td className="p-2">
                  <div className="text-center text-white">{taskDetails.taskKey}</div>
                </td> */}
                <td className="p-2">
                  <div className="text-center text-green-700">{taskDetails.taskName}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{taskDetails.timeSpentInDays}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-600">{taskDetails.created}</div>
                </td>
                <td className="p-2">
                  <div style={{ border: '1px solid', borderRadius:'4px', color: taskDetails.taskStatus === "Done" ? "darkgreen" : taskDetails.taskStatus === "In Progress" ? "yellow" : taskDetails.taskStatus === "To Do" ? "#ff7b00" :  "red" }} className="text-center text-sky-500">{taskDetails.taskStatus}</div>
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
export default TaskSummaryCard01;