// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation} from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import { API_URL, Bearer_Token } from '../../config';
// import BarChart from '../../charts/BarChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import ReactApexChart from 'react-apexcharts';
import { Alert, Stack } from '@mui/material';

function DashboardCard04() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [daywiseTickets, setdaywiseTickets]= useState([]);
  const [day,setDay]=useState([]);
  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState(365);


  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }
  
 useEffect( ()=>{
   const sTickets=[];
   const sDay=[];
//    const sPercentage=[];
   const getdaywiseTickets= async()=>{
   const reqData= await fetch(`${API_URL}servicedeliveryticketsdaywise?project=${data2}&boardID=${data}&days=${selectedOption}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.tickets.length;i++){
    sTickets.push(resData.tickets[i].tickets);
    
    sDay.push(resData.tickets[i].day);
   }   
  
   

 setdaywiseTickets(sTickets);
 setDay(sDay);

   }

  

getdaywiseTickets();
},[selectedOption]);

console.log(daywiseTickets);
console.log(day);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-custom2 border-solid border-2 border-green-600  shadow-2xl rounded-3xl h-80">
      <header className="px-5 py-3 ">
      <div className="flex items-center">
        <h2 className="font-semibold text-black">Service Delivery Tickets Daywise</h2>
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
  </div>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
      {/* Change the height attribute to adjust the chart height */}
      {daywiseTickets ? (
      <ReactApexChart

      series={[{
        data: daywiseTickets
      }]}

    options={{
      chart: {
        height: 300,
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
    //   colors: "#9999",
      plotOptions: {
        bar: {
          columnWidth: '25%',
          distributed: true,
          barHeight: '50%',
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
      },
      title: {
        text: "Tickets",
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
        categories: day,
        title:{
          text: "Days",
          style:{
            color:'black'
          },
          offsetX: 0,
          offsetY: 80,

                  },
        labels: {
          style: {
            colors: 'black',
            fontSize: '12px'
          }
        }
      },
      yaxis:{
        labels: {
          style: {
            colors: ["black"], // replace with your desired colors
          },
      }
      }
    } }
    type='bar'  height={240} />
    ): (
    
      <div style={{paddingLeft: '40px', marginTop:'80px'}}className='center'>
      <Stack sx={{ width: '90%' }} spacing={2}>   
           <Alert severity="success"><strong>No Tickets in last {selectedOption} Days</strong></Alert>   
              </Stack>
        </div>
      
      )}
    </div>
    </div>
  );
}

export default DashboardCard04;
