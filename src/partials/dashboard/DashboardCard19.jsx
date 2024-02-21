// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import RealtimeChart from '../../charts/RealtimeChart';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

function DashboardCard19() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;
  const [selectedOption, setSelectedOption] = useState(365);
  const [modalOpen, setModalOpen] = useState(true);


  const [featureId, setfeatureId]= useState([]);
  const [featureStabilityIndex,setfeatureStabilityIndex]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sId=[];
   const sIndex=[];
//    const sPercentage=[];
   const getfeatureStabilityIndex= async()=>{
   const reqData= await fetch(`${API_URL}featurestabilityindex?projectName=${localStorage.getItem("projectName")}&days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.featureStability.length;i++){
    sId.push(resData.featureStability[i].featureId);
    
    sIndex.push(resData.featureStability[i].featureStabilityIndex);
   }   
  
   console.log(resData);

   setfeatureId(sId);
   setfeatureStabilityIndex(sIndex);

   }
  

   getfeatureStabilityIndex();
},[localStorage.getItem("boardId"), localStorage.getItem("projectName"), selectedOption]);




function handleOptionChange(event) {
  const optionValue = event.target.value;
  setSelectedOption(optionValue);
}

// console.log(featureId);

  return (
    <div className="bar-chart flex flex-col col-span-full sm:col-span-6 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl">
      <header className="px-5 py-3 ">
      <div className="flex items-center">
        <h2 className="font-semibold text-black">Feature Stability Index</h2>
        <select
    className=" w-36 bg-gray-100 border border-gray-300 text-gray-700 ml-3 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 featureIndexDropdown"
    value={selectedOption}
    onChange={handleOptionChange}
  >
    <option value="90">3 Months</option>
    <option value="180">6 Months</option>
    <option value="365">1 Year</option>
  </select>
  </div>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow featureIndex">
      {/* Change the height attribute to adjust the chart height */}
      { featureStabilityIndex.length ?
      <ReactApexChart
      
      series={[{
        data: featureStabilityIndex,
        name: "index"
      }]}

    options={{
      chart: {
        height: 350,
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
    //   colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '20%',
          distributed: true,
        }
      },
      title: {
        text: "Index",
        offsetX: 0,
        offsetY: 5,
        style: {
            color: "black",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: true,
        labels:{colors:'black'}
      },
      xaxis: {
        categories: featureId,
        title:{
          text: "Feature",
          offsetX: 0,
          offsetY: 80,
          style:{
            color:'black'

          },

                  },
        labels: {
          style: {
            colors: 'black',
            fontSize: '12px'
          }
        }
      },
      yaxis:{
        labels:{
          style:{
            colors:'black'
          }
        }
      }
    } }
    type='bar'  height={250} /> : <div className='absolute mt-20 ml-20'>
    {modalOpen && (
<Stack sx={{ width: '100%'}} spacing={2}>

<Alert severity="error"> Alert — <strong>No data available for {selectedOption} days</strong></Alert>
</Stack>     )}
</div>}
    </div>
    </div>
  );
}
export default DashboardCard19;
