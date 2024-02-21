import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';

const DashboardCard35 = () => {
  const location = useLocation();
  const sprintnm = location.state?.sprintnm;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}sprintevents?projectName=${localStorage.getItem(
          'projectName'
        )}&BoardId=${localStorage.getItem('boardId')}&sprintName=${sprintnm}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="flex flex-col col-span-full sm:col-span-12 bg-custom2 shadow-2xl border-solid border-2 h-60 border-green-600 rounded-3xl px-4 py-4 font-medium">Loading data...</div>;
  }

  const { details } = data;

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <header className="px-4 py-1">
        <h2 className="font-semibold text-black mt-2">Issues Done for <span className= "text-blue-700">{sprintnm}</span></h2>
      </header>
      <div className="flex justify-between p-5">
        {details.map((item) => (
          <div className="text-center" key={item.name} style={{ flex: 1 }}>
            <h2 className="text-xl mb-1 font-medium">{item.name}</h2>
            <h2 className="text-xl mb-1">
              <span className="text-3xl text-blue-500">{item.doneCount}</span><span className= "text-blue-500">/{item.total}</span> (
              {((item.doneCount / item.total) * 100).toFixed(1)}%)
            </h2>
            <h2 className="text-xl text-green-500 font-medium">Done</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard35;
