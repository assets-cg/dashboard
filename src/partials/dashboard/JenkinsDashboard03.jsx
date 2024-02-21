// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Icon from '../../images/icon-01.svg';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import ReactPaginate from 'react-paginate';
import { API_URL, Bearer_Token } from '../../config';


const useStyles = makeStyles(theme => ({
    link: {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  }));

function JenkinsDashboard03() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
//   const day = location.state?.day;

//   const id = location.state?.id;
  const [days, setDays]=useState(30);
  const [values, setValues] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const valuesPerPage=3
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(180);

function handleOptionChange(event) {
  const optionValue = event.target.value;
  setSelectedOption(optionValue);
}


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(values.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };
 useEffect( ()=>{
   const getEnvironmentSpecificBuild= async()=>{
   const reqData= await fetch(`${API_URL}environmentspecificbuild?NumberOfDays=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
 setValues(resData)
   }
   getEnvironmentSpecificBuild();
},[days, selectedOption]);
console.log(values)
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="col-span-full xl:col-span-6 bg-custom2 border-solid border-2 border-green-600  shadow-2xl rounded-3xl scrollTable3">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-center mb-2">
        {/* Icon */}
        {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        {/* <button className="btn bg-green-500 hover:bg-green-700 text-white"
        aria-controls="days-menu"
        aria-haspopup="true"
        onClick={handleClick}
        
      >

Selected {days} Days ↓</button>
      <Menu
        id="days-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} className={classes.link} onClick={() => setDays(7)} >
          7 Days
        </MenuItem>
        <MenuItem component={Link} className={classes.link} onClick={() => setDays(30)}>
          30 Days
        </MenuItem>
        <MenuItem component={Link} className={classes.link} onClick={() => setDays(100)}>
          100 Days
        </MenuItem>
        <MenuItem component={Link} className={classes.link} onClick={() => setDays(200)}>
          200 Days
        </MenuItem>
      </Menu>  */}
       <h3 className="font-semibold text-black">Environment Specific Build</h3>
       <select
    className=" w-36 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="1">Today</option>
    <option value="2">Yesterday</option>
    <option value="30">Last Month</option>
    <option value="90">Quarterly</option>
    <option value="180">Half Yearly</option>
    <option value="365">Yearly</option>
  </select>
      </header>
       
       
     
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Builds</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Environment</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">TaskName</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">TimeSpentInDays</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">TaskStatus</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                values.slice(pagesVisited,pagesVisited+valuesPerPage).map((val,key)=>
                <tr key={key}>
                  <td className="p-2 text-white">
                  <div className="flex items-center">
                    <div className="text-white">{val.build}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-700">{val.environment}</div>
                </td>
                {/* <td className="p-2">
                  <div className="text-center text-green-500">{taskDetails.taskName}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{taskDetails.timeSpentInDays}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{taskDetails.created}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{taskDetails.taskStatus}</div>
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
      </div>
    </div>
    </div>
  );
}
export default JenkinsDashboard03;