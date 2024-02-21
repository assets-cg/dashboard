// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##


import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';


const MetricsDashboard12 = ({ startDate, endDate }) => {
  const [apiData, setApiData] = useState([]);
  const [apiData3, setApiData3] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [limit, setLimit] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [apisPerPage] = useState(15);
  const [selectedAPI, setSelectedAPI] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(0);
  const [minVal, setMinVal] = useState();
  const [apiList, setApiList] = useState([]);
  const [maxVal, setMaxVal] = useState();
  const [val,setVal]=useState();
  const [containerUrl,setContainerUrl]=useState("r9tttzmic3.us-east-1.awsapprunner.com");
  const [heatmapThreshold,setHeatmapThreshold]=useState();
  const [threshcolor,setThreshcolor]=useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleOptionChange = (event) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
  };
  const indexOfLastApi = (currentPage + 1) * apisPerPage;
  const indexOfFirstApi = currentPage * apisPerPage;


  
  const handleCheckboxChange = (option) => {
    if (option === null) {
      setSelectedAPI([]); // Deselect all checkboxes
    } else if (option === "All APIs") {
      setSelectedAPI([...val]); // Select all checkboxes
    } else {
      const updatedSelection = [...selectedAPI];
      
      if (updatedSelection.includes("All APIs")) {
        updatedSelection.splice(updatedSelection.indexOf("All APIs"), 1); // Remove "All APIs" from selection
      }
  
      const optionIndex = updatedSelection.indexOf(option);
      
      if (optionIndex > -1) {
        updatedSelection.splice(optionIndex, 1); // Remove option if already selected
      } else {
        updatedSelection.push(option); // Add option if not selected
      }
  
      setSelectedAPI(updatedSelection);
    }
  };

  const handleApply = () => {
    const selectedOptions = val.filter(option => selectedAPI.includes(option));
    const selectedNames = selectedOptions.map(option => option);
    setApiList(selectedNames);
    setIsOpen(false);
  };


  const handleDeselectAll = () => {
    if (selectedAPI.length === 0) {
      // If all checkboxes are already deselected, select all checkboxes
      handleCheckboxChange(val);
    } else {
      // Deselect all checkboxes
      handleCheckboxChange([]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      
      
     

     
      try {
       
        const sApi =[];
        const response = await fetch(
          `https://${localStorage.getItem('PromUrl')}:9090/api/v1/query?query=http_server_requests_seconds_count{job="spring-actuator"}[1d]`
        );
        // const result2 = await fetch(`${API_URL}allthresholds`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   },
        // });
        const heatmapthresholds = await fetch(`${API_URL}heatmapthresholds`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        // const thresholds = await result2.json();

        const heatthreshold=await heatmapthresholds.json();
        setHeatmapThreshold(heatthreshold);
        // setLimit(thresholds);
        const results = data.data.result;

        const filteredResults = results.filter((result) => {
          const value = parseFloat(result.values[0][1]);
          const uri = result.metric.uri;
          return value > selectedOption && uri !== 'root' && !uri.includes('**');
        });
       
        const paginatedApis = filteredResults;
        const today = new Date(); // Get today's date

        const apiData2 = filteredResults.reduce((accumulator, result) => {
          const uri = result.metric.uri;
          const lastIndex = uri.lastIndexOf('/');
          const label = `${uri.substring(lastIndex + 1)}`;
          const existingData = accumulator.find((data) => data.name === label);
        
          if (existingData) {
            let prevTimestamp = null; // Initialize previous timestamp variable
            result.values.forEach((value) => {
              const time = new Date(parseFloat(value[0]) * 1000);
              const count = parseFloat(value[1]);
        
              if (
                !prevTimestamp ||
                (time.getTime() - prevTimestamp.getTime() >= 60 * 60 * 1000 &&
                  time.getDate() === today.getDate() &&
                  time.getMonth() === today.getMonth() &&
                  time.getFullYear() === today.getFullYear()) // Compare with today's date
              ) {
               
        
                existingData.data.push({ x: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }), y: count});
                prevTimestamp = time; // Update the previous timestamp
              }
            });
          } else {
            const newData = {
              name: label,
              data: [],
            };
            let prevTimestamp = null; // Initialize previous timestamp variable
            result.values.forEach((value) => {
              const time = new Date(parseFloat(value[0]) * 1000);
              const count = parseFloat(value[1]);
        
              if (
                !prevTimestamp ||
                (time.getTime() - prevTimestamp.getTime() >= 60 * 60 * 1000 &&
                  time.getDate() === today.getDate() &&
                  time.getMonth() === today.getMonth() &&
                  time.getFullYear() === today.getFullYear()) // Compare with today's date
              ) {
                
        
                newData.data.push({ x: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }), y: count});
                prevTimestamp = time; // Update the previous timestamp
              }
            });
        
            accumulator.push(newData);
          }
        
          return accumulator;
        }, []);
        

        for(let i=0;i<apiData2.length;i++){ 
    
          sApi.push(apiData2[i].name);         
       
            }  
            setVal(sApi)

        // Sort the timestamp in ascending order for each data series
        if (apiData2) {
          const today = new Date(); // Get today's date
          today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day
        
          apiData2.forEach((data) => {
        
            if (data.data.length !==0 ) {
              data.data = data.data.filter((point) => {
                const pointDate = new Date(point.x);
               
                return (
                  pointDate.getDate() === today.getDate() &&
                  pointDate.getMonth() === today.getMonth() &&
                  pointDate.getFullYear() === today.getFullYear() &&
                  point.y !== 0
                );
              });
        
               data.data.sort((a, b) => a.y - b.y);
            }
          });
        }

      
       
        // const promDataJson= await response.json();
       
     
      
        setApiData(apiData2);
        

        const colorRanges = [];
        const miniVal = [];
        const mxVal = [];

        for (let i = 0; i < heatthreshold.length; i++) {
          const minimum = parseInt(heatthreshold[i].minimum);
          const maximum = parseInt(heatthreshold[i].maximum);
          
          if (!isNaN(minimum) && !isNaN(maximum)) {
            miniVal.push(minimum);
            mxVal.push(maximum);
          }
        }
        const minAverage = (
          miniVal.reduce((total, value) => total + value, 0) / miniVal.length
        ).toFixed(2);
        
        const maxAverage = (
          mxVal.reduce((total, value) => total + value, 0) / mxVal.length
        ).toFixed(2);
        

        setMinVal(minAverage);
        setMaxVal(maxAverage);


      } catch (error) {
        console.error('Error fetching request data:', error);
      }
    };

    fetchData();
  }, [selectedOption, currentPage, apisPerPage,val,heatmapThreshold ,minVal,maxVal]);



  console.log("Min-"+minVal+",Max-"+maxVal)


  async function updateHeatmapThresholds() {
    const timeSlotData = [];
    const heatmapthresholds = await fetch(` https://${localStorage.getItem('PromUrl')}:9090/api/v1/query?query=http_server_requests_seconds_count{job="spring-actuator"}[1d]`);
    const promDataJson= await heatmapthresholds.json();
    const results3 = promDataJson.data.result;
     
    const filteredResults3 = results3.filter((result) => {
           const value = parseFloat(result.values[0][1]);
           const uri = result.metric.uri;
           return uri !== 'root' && !uri.includes('**');
         });
 
         const apiData3 = filteredResults3.reduce((accumulator, result) => {
           const uri = result.metric.uri;
           const lastIndex = uri.lastIndexOf('/');
           const label = `${uri.substring(lastIndex + 1)}`;
           const existingData = accumulator.find((data) => data.name === label);
         
           if (existingData) {
             let prevTimestamp = null; // Initialize previous timestamp variable
             result.values.forEach((value) => {
               const time = new Date(parseFloat(value[0]) * 1000);
               const count = parseFloat(value[1]);
         
               if (
                 !prevTimestamp ||
                 (time.getTime() - prevTimestamp.getTime() >= 1* 60 * 1000 ) // Compare with today's date
               ) {
                 existingData.data.push({ x: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }), y: count });
                 prevTimestamp = time; // Update the previous timestamp
               }
             });
           } else {
             const newData = {
               name: label,
               data: [],
             };
             let prevTimestamp = null; // Initialize previous timestamp variable
             result.values.forEach((value) => {
               const time = new Date(parseFloat(value[0]) * 1000);
               const count = parseFloat(value[1]);
         
               if (
                 !prevTimestamp ||
                 (time.getTime() - prevTimestamp.getTime() >= 1 * 60 * 1000 )// Compare with today's date
               ) {
                 newData.data.push({ x: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' }), y: count });
                 prevTimestamp = time; // Update the previous timestamp
               }
             });
         
             accumulator.push(newData);
           }
         
           return accumulator;
         }, []);
         
 
         if (apiData3) {
         
           apiData3.forEach((data) => {
               data.data.sort((a, b) => a.y - b.y);
         
           });
         }
 
         if (apiData3) {
           for (let i = 9; i <= 18; i++) {
             const timeSlots = {};
         
             const slotLabel = i >= 12 ? (i === 12 ? `${i} PM` : `${i - 12} PM`) : `${i} AM`;
             timeSlots[slotLabel] = { minValues: [], maxValues: [] };
         
             apiData3.forEach((data) => {
               const { name, data: timeData } = data;
               timeData.forEach((entry) => {
                 const time = new Date(entry.x);
                 const hour = time.getHours();
                 const minutes = time.getMinutes();
         
                 if(hour ===9 && minutes === 45){
                   timeSlots[slotLabel].minValues.push(entry.y);
                 }else if (hour === i && minutes < 10) {
                   timeSlots[slotLabel].minValues.push(entry.y);
                 } else if (hour === i && minutes >= 50) {
                   timeSlots[slotLabel].maxValues.push(entry.y);
                 }
               });
             });
         
             const slot = timeSlots[slotLabel];
             const minAverage = (
               slot.minValues.reduce((total, value) => total + value, 0) / slot.minValues.length
             ).toFixed(2);
             const maxAverage = (
               slot.maxValues.reduce((total, value) => total + value, 0) / slot.maxValues.length
             ).toFixed(2);
             timeSlotData.push({ slotLabel, minAverage, maxAverage });
           }
         }
    
    for (let j = 0; j < timeSlotData.length; j++) {
      console.log(timeSlotData[j].slotLabel);
      try {
        await axios.put(`${API_URL}updateheatmapthreshold`, {
          timing: timeSlotData[j].slotLabel,
          minimum: timeSlotData[j].minAverage,
          maximum: timeSlotData[j].maxAverage
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });

        console.log("gone to db");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }

  
const handleRefresh = async () => {
  setRefreshing(true);
  try {
    await updateHeatmapThresholds();
    console.log('Thresholds updated successfully.');
  } catch (error) {
    console.error('Error updating thresholds:', error);
  }
  setRefreshing(false);
};
  
  const sortAndFilterApiData = (apiData, apiList) => {
    const sortedData = [];
  
    apiList.forEach((apiName) => {
      const data = apiData.find((item) => item.name === apiName);
  
      if (data && data.data) { // Add a check for undefined data
        data.data = data.data.filter((point) => {
          const pointDate = new Date(point.x);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
  
          return (
            pointDate.getDate() === today.getDate() &&
            pointDate.getMonth() === today.getMonth() &&
            pointDate.getFullYear() === today.getFullYear() &&
            point.y !== 0
          );
        });
  
        sortedData.push(data);
      }
    });
  
    return sortedData;
  };
 
  
  
  
  
  const sortedApiData = sortAndFilterApiData(apiData, apiList);  


  const graphData = apiList.length > 0 ? sortedApiData : apiData;
  const pagApis = graphData.slice(indexOfFirstApi, indexOfLastApi);
  const pageCount = Math.ceil(graphData.length / apisPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };
  // const currentApis = apiData.slice(currentPage * apisPerPage, (currentPage + 1) * apisPerPage);
  
 
  return (
    <div className="col-span-full xl:col-span-12 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable10 relative">
  <div className="px-3 py-3 flex items-center">
    <h2 className="text-lg font-semibold text-black mr-2">HTTP Server Request Counts (All APIs)</h2>
    <button title="Update Threshold" type="button" onClick={handleRefresh} className="btn bg-white">
  {refreshing ? (
    <FontAwesomeIcon icon={faSync} className="fa-spin mr-0 h-5 w-5" />
  ) : (
    <FontAwesomeIcon icon={faSync} className="mr-0 h-5 w-5" />
  )}
</button>
    <button
      className="dropdown-toggle bg-green-500 text-white text-sm ml-3 font-bold py-1 px-2 rounded"
      type="button"
      onClick={() => setIsOpen(!isOpen)}
    >
      Select APIs
    </button>
    <Link className="absolute right-14 text-sm text-blue-700 underline" to={'/httpstatsdetails'}>
      view details..
    </Link>
  </div>
  {isOpen && (
        <div className="absolute left-96 z-10 text-gray-700 bg-white rounded shadow-lg w-auto max-h-48 overflow-y-auto mt-2">
          {/* Dropdown content */}
          <label className="flex items-center px-1 py-1">
            <input
              style={{border:'1px solid black'}}
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-500 rounded"
              checked={selectedAPI.length === 0}
              onChange={() => handleCheckboxChange(null)}
            />
            <span className="ml-2">All APIs</span>
          </label>
          {val.map((option, index) => (
            <label key={index} className="flex items-center px-1 py-1">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500"
                style={{border:'1px solid black'}}
                checked={selectedAPI.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
      <button
        className="apply-btn bg-green-500 text-white text-sm font-bold py-1 ml-2 mb-2 px-2 rounded mt-2"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  )}
  <div className="p-6">
    <ReactApexChart
      series={pagApis.map((seriesData, index) => ({
        ...seriesData,
        color: pagApis[index].color, // Assuming apiData contains colors for each seriesData
      }))}
      options={{
        chart: {
          height: 600,
          zoom: false,
        },
        plotOptions: {
          heatmap: {
            distributed: true,
            enableShades: false,
            colorScale: {
              ranges: [
                {
                  from: -Infinity,
                  to: minVal,
                  name: 'Low',
                  color: '#0fa63a',
                },
                {
                  from: minVal,
                  to: maxVal,
                  name: 'Medium',
                  color: '#f27311',
                },
                {
                  from: maxVal,
                  to: Infinity,
                  name: 'High',
                  color: '#c90f08',
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false, // Display time in local timezone
            format: 'HH:mm', // Display only hours and minutes
            style: {
              colors: 'black',
              fontSize: '12px',
            },
          },
        },
        yaxis: {
          type: 'category',
          labels: {
            style: {
              colors: 'green',
            },
          },
        },
      }}
      type="heatmap"
      height={300}
    />
  </div>
  <div className="ml-10 -mt-5 mb-2">
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

  );
};

export default MetricsDashboard12;