// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';

function Card05(props) {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  console.log(data)
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEfforts= async()=>{
   const reqData= await fetch(`${API_URL}sprint_taskassociated?project=DashboardProject&boardID=2&sprintId=1`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.taskDetails)
   }
getEfforts();
},[data]);
console.log(values)
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-2xl rounded-3xl border border-slate-200 scrollTable">
      <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">Tasks Associated to Sprint</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">StoryId</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">TaskKey</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Summary</div>
                </th> */}
                <th className="p-2">
                  <div className="font-semibold text-center">AssignedTo</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((taskDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">{taskDetails.storyId}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{taskDetails.taskKey}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">{taskDetails.status}</div>
                </td>
                {/* <td className="p-2">
                  <div className="text-center">{taskDetails.summary}</div>
                </td> */}
                <td className="p-2">
                  <div className="text-center text-sky-500">{taskDetails.assignedTo}</div>
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
export default Card05;