import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../../config';
import { Alert, Stack } from '@mui/material';

function ReleaseDashboard07(props) {
  const location = useLocation();
//   const data2 = location.state?.projectName;

  const [taskStatuses, setTaskStatuses] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const getTaskStatuses = async () => {
      const reqData = await fetch(`${API_URL}releasetaskstatuses?projectName=${localStorage.getItem('releaseProject')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const resData = await reqData.json();

      setTaskStatuses([
        parseFloat(resData.done),
        parseFloat(resData.todo),
        parseFloat(resData.inprogress),
        parseFloat(resData.blocked),
      ]);
    };

    getTaskStatuses();
  }, [localStorage.getItem('releaseProject')]);

  const hasNaNValues = taskStatuses.some((status) => isNaN(status));

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-custom2 h-80 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-black mb-2">Task Status</h2>
      </div>
      <div className="mt-5 legend-item taskstatuses">
        {hasNaNValues ? (
          <div className="absolute mt-0">
            {modalOpen && (
              <Stack sx={{ width: '100%', marginLeft: '50%', marginTop: '25%' }} spacing={2}>
                <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
              </Stack>
            )}
          </div>
        ) : (
          <Chart
            type="donut"
            width={400}
            height={240}
            series={taskStatuses}
            options={{
              labels: ['Done', 'To Do', 'In Progress', 'Blocked'],
              legend: {
                show: true,
                labels: {
                  colors: ['#030303'],
                },
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '50%', // Change the inner radius here
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ReleaseDashboard07;