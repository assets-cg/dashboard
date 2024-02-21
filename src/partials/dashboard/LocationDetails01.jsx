// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../images/icon-01.svg';
import axios from 'axios';
import { API_URL, Bearer_Token } from '../../config';

function LocationDetails01() {
    const [modalOpen, setModalOpen] = useState(false);
    const [city,setCity]=useState();
    const [state,setState]=useState();
    const [alias,setAlias]=useState();

//   const location = useLocation();
//   console.log(location, " useLocation Hook");
//   const brdid = location.state?.brdid;
//   const sprintnm = location.state?.sprintnm;

//   console.log(sprintnm);


//   const [hours, sethours]= useState([]);
function handleOpenModal() {
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}addlocationdetails`, {
        city: city,
        state: state,
        alias: alias
      },{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(city+","+state+","+alias)
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(event.target);
//     const data = {
//       city: this.state.value1,
//       state: this.state.value2,
//       alias:this.state.value3,
//     };


  
   
  
//     try {;
//       const response = await axios.post('https://z9ynuwgrpt.us-east-1.awsapprunner.com/dashboardKPI/V1/addLocationDetails', data);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//  useEffect( ()=>{
// //    const sPercentage=[];
//    const sHours=[];
//    const getHoursWorked= async()=>{
//    const reqData= await fetch(`https://z9ynuwgrpt.us-east-1.awsapprunner.com/dashboardKPI/V1/getSprintHoursWorked?project=DashboardProject&boardID=${brdid}&sprintName=${sprintnm}` );
//    const resData= await reqData.json();
//     sHours.push(resData.hoursWorked);

//   sethours(sHours);

//   console.log("Hours"+ hours);

//    }
//    getHoursWorked();
// });
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 h-60 bg-white shadow-2xl rounded-3xl border border-slate-200 scrollTable4">
      <div className="px-5 pt-5 scrollTable4" >
        <header className="flex justify-between items-start mb-2">
        <div className = "container">
                        <div className = "row">
                        {/* <ToastContainer autoClose={2000} pauseOnFocusLoss={false} draggablePercent={50}/> */}
                           
                                <div className = "card-body">
                                <button onClick={handleOpenModal}>Add City</button>
                                 {modalOpen && (
                                  <div className="modal">
                                    <form onSubmit={handleSubmit}>
                                        <div className = "form-group">
                                            <label> City: </label>
                                            <input type="text" placeholder="City" name="city" className="form-control" 
                                                value={city} onChange={(e) =>
                                                    setCity(e.target.value)
                                                  }/>
                                        </div>
                                        <div className = "form-group">
                                            <label> State: </label>
                                            <input type="text" placeholder="State" name="state" className="form-control" 
                                                value={state} onChange={(e) =>
                                                    setState(e.target.value)
                                                  }/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Alias: </label>
                                            <input type="text" placeholder="Alias" name="alias" className="form-control" 
                                                value={alias} onChange={(e) =>{
                                                    setAlias(e.target.value),console.log(e.target.value)}
                                                  }/>
                                        </div>
                                        <button type="submit">Save</button>
                                         <button onClick={handleCloseModal}>Cancel</button>
                                        {/* <button className="btn btn-success" onClick={handleSubmit}>Save</button> */}
                                        {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button> */}
                                    </form>
                                    </div>
      )}
                                </div>
                            </div>
                        </div>
                   {/* </div> */}
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        {/* <h2  className="text-lg font-semibold text-slate-800 mb-2">Total Hours Worked in ({sprintnm})</h2> */}
         {/* <div className='status' style={{textAlign:'center',height:'60%', width:'90%', margin:'auto'}}> */}
            {/* <h1 style={{padding:'5%',textAlign:'center',fontSize:'34px',color:'white', fontWeight:'600', fontFamily:'Orbitron' }}>{hours} Hrs</h1> */}
            {/* <p style={{justifyContent:'center',fontWeight:'700', color:'white', fontSize:'20px'}}>Total Worked Hours</p> */}
        {/* </div>  */}


        
      </div>
    </div>
  );
}
export default LocationDetails01;