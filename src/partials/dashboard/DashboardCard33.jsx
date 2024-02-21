import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { API_URL, Bearer_Token } from '../../config';

function DashboardCard33() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}projectcfd?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }

        });
        const jsonData = await response.json();
        setData(jsonData.details);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Extracting data for each count type
  const dates = data.map(entry => entry.date);
  const newCounts = data.map(entry => entry.newCount);
  const assignedCounts = data.map(entry => entry.assignedCount);
  const doneCounts = data.map(entry => entry.doneCount);
  const inProgressCounts = data.map(entry => entry.inProgressCount);
  const toDoCounts = data.map(entry => entry.toDoCount);
  const blockedCounts = data.map(entry => entry.blockedCount);

  const chartData = {
    labels: dates,
    datasets: [
      { label: 'New', data: newCounts, backgroundColor: 'rgba(69, 255, 51, 0.2)', borderColor: '#45FF33' },
      { label: 'Assigned', data: assignedCounts, backgroundColor: 'rgba(250, 228, 65, 0.2)', borderColor: '#fae441' },
      { label: 'Done', data: doneCounts, backgroundColor: 'rgba(255, 143, 45, 0.2)', borderColor: '#ff8f2d' },
      { label: 'In Progress', data: inProgressCounts, backgroundColor: 'rgba(255, 0, 0, 0.2)', borderColor: '#FF0000' },
      { label: 'To Do', data: toDoCounts, backgroundColor: 'rgba(0, 0, 255, 0.2)', borderColor: '#0000FF' },
      { label: 'Blocked', data: blockedCounts, backgroundColor: 'rgba(128, 0, 128, 0.2)', borderColor: '#800080' },
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Issues'
        }
      }
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        fill: '-1',
        tension: 0.2,
      }
    }
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <header className="px-5 py-3 ">
        <h2 className="font-semibold text-black">Cumulative Flow Diagram</h2>
      </header>
      <Line data={chartData} options={options} height={90} />
    </div>
  );
}

export default DashboardCard33;
