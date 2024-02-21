// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useRef, useEffect } from 'react';
import { useState} from "react";
import { Link, useLocation} from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import ReactApexChart from 'react-apexcharts';
import EditMenu from '../EditMenu';
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
// import HorizontalBarChart from '../../charts/HorizontalBarChart';

function DashboardCard02() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const data = location.state?.data;
  const data2 = location.state?.data2;
  console.log(data)
  console.log(data2)

  const [modalOpen, setModalOpen] = useState(true);

  const [ticketsperEpic, setticketsperEpic]= useState([]);
  const [epicName,setepicName]=useState([]);
  const [value, setValue] = useState();
 useEffect( ()=>{
   const sEpicId=[];
   const sTickets=[];
//    const sPercentage=[];
   const getTicketsPerEpic= async()=>{
   const reqData= await fetch(`${API_URL}ticketsperepic?project=${data2}&boardID=${data}`,{
    headers: {
     'Authorization':   `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();   
   for(var i=0;i<resData.tickets.length;i++){
    sEpicId.push(resData.tickets[i].epic);
    
    sTickets.push(resData.tickets[i].numberOfTickets);
   }   
   
 setepicName(sEpicId);
 setticketsperEpic(sTickets);
   }
   
getTicketsPerEpic();
},[]);

console.log(ticketsperEpic);
console.log(epicName);
  
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 border-solid border-2 border-green-600  bg-custom2 shadow-2xl rounded-3xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 02" /> */}
          
        </header>
        <h2 className="text-lg font-semibold text-black mb-2">No. of Tickets Per Epic</h2>
        
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
     {ticketsperEpic ?
        <ReactApexChart

      series={[{
        name: "Tickets",
        data: ticketsperEpic
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
          borderRadius: 4,
          horizontal: true,
          barHeight:'65%'
        },
        
      },
      colors:['#4d83ff'],
      // fill: {

      //   type: 'gradient',

      //   gradient: {

      //     shade: 'light',

      //     shadeIntensity: 0.5,

      //     inverseColors: false,

      //     opacityFrom: 1,

      //     opacityTo: 1,

      //     stops: [0, 50, 53, 91]

      //   }
      // },
      title: {
        text: "Epics",
        offsetX: 10,
        offsetY: 15,
        style: {
            color: "black",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-xaxis-title',
        },
        
    },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return val + "  Ticket(s)"
      },
      style:{
        // fontWeight:"bold",
        color: "black"
      },
      offsetX: 25,
      },
      legend: {
        show: true,
           },
      xaxis: {
        categories: epicName,
        title:{
text: "No of Tickets",
style:{
  color:'black'
}

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
        },
      }
    } }
    type='bar'  height={250} />
     : <div className='absolute right-12 mt-0'>
            {modalOpen && (
        <Stack sx={{ width: '100%'}} spacing={2}>
     
        <Alert severity="success"> No tickets ! — <strong>No Tickets available</strong></Alert>
      </Stack>     )}
      </div>}
      </div>
    </div>
  );
}

export default DashboardCard02;
