import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_URL } from '../../config';
import { Auth } from 'aws-amplify';

const DashboardCard37 = () => {
  const [chartData, setChartData] = useState(null);
  const [jenkinsProjectsList, setJenkinsProjectsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("MavenPipeline");
  const [selectedUnit, setSelectedUnit] = useState('timeinDays');
  const [selectedEnvironment, setSelectedEnvironment] = useState('QA');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        localStorage.setItem('projectUser', user.attributes.email);

        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };

        const response1 = await fetch(`${API_URL}meandeploymenttimemonthwise?jenkinsProjectName=${selectedOption}&environment=${selectedEnvironment}`, { headers });

        const reqData= await fetch(`${API_URL}meandeploymenttime?jenkinsProjectName=MavenPipeline&environment=QA`,{
          headers: {
           'Authorization':   `Bearer ${localStorage.getItem("token")}`,
        }
       
       });

       const resData= await reqData.json();
       console.log(resData.jenkinsProjectsList)
       setJenkinsProjectsList(resData.jenkinsProjectsList);
        const data1 = await response1.json();

        const labels = data1.details.map(item => item.date);
        const deploymentTime = data1.details.map(item => item[selectedUnit]);

        const chartData = {
          labels: labels.sort((a, b) => new Date(a) - new Date(b)),
          datasets: [
            {
                label: `Deployment Time (${unitName})`,
              data: deploymentTime,
              fill: false,
              borderColor: 'rgba(219, 11, 18)',
              lineTension: 0.1
            }
          ]
        };

        setChartData(chartData);
        // setEnvironmentValues(environmentValues);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedUnit, selectedEnvironment, selectedOption]);

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleEnvironmentChange = (event) => {
    setSelectedEnvironment(event.target.value);
  };

  function handleOptionChange(event) {
    const optionValue = event.target.value;
    if (optionValue === 'project') {
      // Handle the case when the Jenkins project list is selected
      setAnchorEl(event.currentTarget);
    } else {
      setSelectedOption(optionValue);
    }
  }

  const unitName = selectedUnit.substring(6);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl p-2">
      <div className="px-3 pt-2">
        <header className="flex justify-between items-start"></header>
        <h3 className="font-semibold text-black">Mean Deployment Time Month Wise</h3>
      </div>
      

      <div className='mt-5'>
        <div className="mb-3">
        <lable className='text-sm ml-2 font-medium'>Select Project: </lable>
          <select
            className="w-56 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            {/* <option value="">Select Project</option> */}
            {jenkinsProjectsList.map((projectName) => (
              <option key={projectName} value={projectName}>
                {projectName}
              </option>
            ))}
          </select>
          <lable className='text-sm ml-2 font-medium'>Select Environment: </lable>
          <select 
          className="w-20 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-1 py-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="environmentSelect" 
          value={selectedEnvironment} 
          onChange={handleEnvironmentChange}>
            <option value="QA">QA</option>
            <option value="PROD">PROD</option>
            <option value="DEV">DEV</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                    padding: 10,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: `Time`,
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return Number(value).toLocaleString();
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: false,

                  },
                  
                },
              },
            }}
            height={90}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard37;
