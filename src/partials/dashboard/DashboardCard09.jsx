// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faHourglass, faHourglass1, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

function DashboardCard09() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const [modalOpen, setModalOpen] = useState(true);
  const data2 = location.state?.data2;
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  // const [status, setStatus] = useState("");

  // Fetch the data from the API and update the status state variable

  // let statusColor;

  const[ statusColor , setStatusColor] = useState();
  
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEfforts= async()=>{
   const reqData= await fetch(`${API_URL}effortofallstories?project=${data2}&boardID=${data}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData.storyDetails);
}
getEfforts();
},[]);

  

  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600  rounded-3xl h-84">
      <header className="px-5 py-4">
        <h3 className="font-semibold text-black"> Effort taken in Ticket Resolution </h3>
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
                  <div className="font-semibold text-center">Story Key</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created Time</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Epic Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Efforts In Days</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((storyDetails,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                  {/* <FontAwesomeIcon icon = {storyDetails.status ==="Done" ? faCheckCircle : storyDetails.status ==="In Progress" ? faHourglass1 : storyDetails.status ==="To Do" ? faExclamationCircle : faTimesCircle } size="1x" color={storyDetails.status ==="Done" ? "green" : storyDetails.status ==="In Progress" ? "rgb(199, 199, 60)" : storyDetails.status ==="To Do" ? "orange" : "red"} /> &nbsp;&nbsp; */}
                    
                    <div className="text-white ">{storyDetails.storyKey}</div>
                  </div>
                </td>
                <td className="p-2 ">
                  <div className="text-center text-white">{storyDetails.createdTime}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-700">{storyDetails.epicId}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-white">{storyDetails.effortsOfStories}</div>
                </td>

                
                <td className="p-2">
                
                  <div style={{ border: '1px solid', borderRadius:'4px', color: storyDetails.status === "Done" ? "darkgreen" : storyDetails.status === "In Progress" ? "yellow" : storyDetails.status === "To Do" ? "#ff7b00" :  "red" }} className="text-center text-sky-500 storyDetails.status">{storyDetails.status}</div>
               
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
          <div  style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
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
            />
</div>
        </div>
      </div>
    </div>
  );
}
export default DashboardCard09;