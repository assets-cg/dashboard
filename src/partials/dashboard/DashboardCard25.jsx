import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_URL } from '../../config';
import { Auth } from 'aws-amplify';

const DashboardCard25 = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        localStorage.setItem('projectUser', user.attributes.email);

        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };

        const response1 = await fetch(`${API_URL}burndownchart?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`, { headers });
        const response2 = await fetch(`${API_URL}burndownexpected?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`, { headers });

        const data1 = await response1.json();
        const data2 = await response2.json();

        const labels = data1.burndownDetails.map(item => item.time);
        const workLeftData1 = data1.burndownDetails.map(item => item.workLeft);
        const workExpectedData2 = data2.burndownExpectedDetails.map(item => item.workExpected);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Work Remaining',
              data: workLeftData1,
              fill: false,
              borderColor: 'rgba(219, 11, 18)',
              lineTension: 0.1
            },
            {
              label: 'Work Expected',
              data: workExpectedData2,
              fill: false,
              borderColor: 'rgba(11, 230, 51)',
              lineTension: 0.1
            }
          ]
        };

        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl p-4">
      <div className="px-3 pt-2">
        <header className="flex justify-between items-start"></header>
        <h3 className="font-semibold text-black">Sprint Burndown Chart</h3>
      </div>

      <div className='mt-5'>
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
                    text: 'Story Points',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                  beginAtZero: true, // Add this line to start y-axis from 0
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
            height={220}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard25;
