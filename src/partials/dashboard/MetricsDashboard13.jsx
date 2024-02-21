// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {Prom_Url, API_URL} from '../../config';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import { Novu } from '@novu/node';
import { Novu_Url, Novu_Api } from '../../config';
import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import ReactApexChart from 'react-apexcharts';


Chart.register(CategoryScale);

const MetricsDashboard13 = ({startDate, endDate, interval}) => {

    //   const config = { 
//     backendUrl: `${Novu_Url}`,
//  };

  const novu = new Novu(`${Novu_Api}`);
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const api = location.state?.api;
  // const jobName = location.state?.data2
  const [jobName,setJobname]=useState(localStorage.getItem('jobName'));

  console.log(startDate);
  console.log(endDate);

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  // const [jobs, setJobs] = useState(jobName);
  const [modalOpen, setModalOpen] = useState(true);
  const [response, setResponse] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [currentValue, setCurrentValue] = useState();
  const [limit, setLimit] =useState([]);
  const [lab,setLab]=useState([]);
  const [selectedOption, setSelectedOption]= useState(10);
  const [api2, setApi2] = useState([]);
  const [values, setValues] = useState([]);
  

  function handleOptionChange(event) {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      const sCom=[];
      const sCom2=[];
      const result = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=http_server_requests_seconds_sum{job="${jobName}" , exception="None"}`);
      const result2 = await fetch(`https://${localStorage.getItem("PromUrl")}:9090/api/v1/query?query=http_server_requests_seconds_count{job="${jobName}" , exception="None"}`);
      // console.log(result)
      const allThresholds = await fetch(`${API_URL}allthresholds`,{
        headers: {
         'Authorization':   `Bearer ${localStorage.getItem("token")}`,
      }
     
     });
      const data2 = await result.json();
      const data3 = await result2.json();
      const thresholds = await allThresholds.json();
      console.log(data2);
      
      console.log(data3);
      setLimit(thresholds)
      // console.log(data2.data.result)
    
      const results = data2.data.result;
      const results2 = data3.data.result;

      console.log(results[results.length-1].value[1])
      console.log(results2)
    //  console.log(filteredData)
    const filteredResults = results.filter((results) => {
      const value = parseFloat(results.value[1]);
      const uri = results.metric.uri;
      return uri !== "root" && !uri.includes("**");
    });

    const filteredResults2 = results2.filter((results2) => {
      const value = parseFloat(results2.value[1]);
      const uri = results2.metric.uri;
      return uri !== "root" && !uri.includes("**");
    });

    console.log(filteredResults);
    console.log(filteredResults2);

    const divisionData = [];
    let i = 0;
    let j = 0;
    
    while (i < filteredResults.length && j < filteredResults2.length) {
    if(filteredResults[i].metric.uri===filteredResults2[j].metric.uri){
      divisionData.push({ 
        api: filteredResults[i].metric.uri,
        val: (filteredResults[i].value[1] / filteredResults2[j].value[1] )*1000
      });
      i++;
      j++;}

   
    }

 
    const apiNames = divisionData.map((result) => {
      const uri = result.api;
      const lastIndex = uri.lastIndexOf('/');
      return uri.substring(lastIndex + 1);
    });
    const yValues = divisionData.map((result) => parseFloat(result.val.toFixed(2)));

// setResponse(divisionData);
setApi2(apiNames);
setValues(yValues);
const counts = divisionData.map(({ count }) => count); 
     setCurrentValue(counts[counts.length - 1]);

     const miniVal = [];
     const mxVal = [];

     for(let i=0; i<limit.length; i++){
      if(limit[i].graphName.includes("Response Time")){
         miniVal.push( limit[i].minVal)
         mxVal.push(limit[i].maxVal)
    }
  }
      setMinVal(miniVal)
      setMaxVal(mxVal)

    };
    fetchData();
  }, [data, data1, api, response, jobName, startDate,endDate, interval, minVal, maxVal, currentValue, limit,values]);
  console.log(response)

  console.log(values)

  if ( currentValue >= maxVal[0]) {
    novu.trigger('dashboardkpi-notifications',
     { to:
       { subscriberId: "on-boarding-subscriber-id-123" }, 
      payload:{ 
        GraphName:`HTTP Response Time (${api})`,
        limit : "max value",
        value:`${maxVal[0]}` },
       });
    }
  else if ( currentValue >= minVal[0]) {
    novu.trigger('dashboardkpi-notifications',
     { to:
       { subscriberId: "on-boarding-subscriber-id-123" }, 
      payload:{ 
        GraphName:`HTTP Response Time (${api})`,
        limit : "min value",
        value: `${minVal[0]}` },
       });
      } 

  const getStepSize = () => {
    switch (interval) {
      case "5":
        return 5 // 5 in milliseconds
      case "15":
        return 15 // 15 in milliseconds
      case "30":
        return 30 // 30 in milliseconds
      case "60":
        return 60 // 1 hour in milliseconds
      default:
        return 15 // default step size is 15 minutes
    }
  };
  console.log(getStepSize(5))
  // };
  return (
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable10 ">
    <div className="px-3 py-3 flex items-center">
<h2 className="text-lg font-semibold text-black mr-2">Response Time (All APIs)</h2>
<Link className='absolute right-14 text-sm text-blue-700 underline' to={'/httpstatsdetails'}>view details..</Link>

</div>
    <div className="relative p-2">
      <ReactApexChart
        series={[{ data:values, name: 'milliseconds' }]}
        options={{
          chart: {
            height: 500,
            events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              },
            },
          },
          background: 'black',
          plotOptions: {
            bar: {
              columnWidth: '30%',
              distributed: true,
              colors: {
                ranges: [
                  {
                    from: minVal,
                    to: maxVal,
                    color: '#f27311',
                  },
                  {
                    from: maxVal,
                    to: Infinity,
                    color: '#c90f08',
                  },
                  {
                    from: -Infinity,
                    to: minVal,
                    color: '#0fa63a',
                  },
                ],
              },
            },
          },
          title: {
            text: 'Miliseconds',
            offsetX: 0,
            offsetY: 5,
            style: {
              color: 'black',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            },
          },
          dataLabels: { enabled: false, orientation: 'horizontal' },
          legend: { show: false, labels: { colors: 'black' } },
          xaxis: {
            categories:api2,
            // title: {
            //   text: 'APIs',
            //   offsetX: 0,
            //   offsetY: 220,
            //   style: {
            //     color: 'black',
            //     fontSize: '13px',
            //     fontFamily: 'Helvetica, Arial, sans-serif',
            //     fontWeight: 600,
            //     cssClass: 'apexcharts-xaxis-title',
            //   },
            // },
            labels: { style: { colors: 'black', fontSize: '12px' } },
          },
          yaxis: { labels: { style: { colors: 'green' } } },
        }}
        type="bar"
        height={400}
        /><span style={{marginLeft:'450px'}} className='flex font-semibold text-sm -mt-2'>APIs</span>
      </div>
    </div>
);
};
export default MetricsDashboard13;