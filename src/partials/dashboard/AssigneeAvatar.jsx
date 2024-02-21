import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { API_URL, Bearer_Token } from '../../config';
import ReactApexChart from 'react-apexcharts';

const AssigneeAvatar = () => {
  const [assigneesData, setAssigneesData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}projectassigneecount?projectName=DashboardProject&BoardId=2`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const data = await response.json();

      setAssigneesData(data.assignee);
      setSelectedTeam(data.assignee[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTeamChange = (event) => {
    const selectedTeamName = event.target.value;
    const selectedTeamData = assigneesData.find((team) => team.teamName === selectedTeamName);
    setSelectedTeam(selectedTeamData);
  };

  const chartOptions = {
    labels: selectedTeam?.assignee.map((name) => name),
    colors: ['#2D8CFF', '#45FF33', '#FFB700', '#FF3780', '#FF0000'], // Example colors, customize as needed
    dataLabels: {
      enabled: false, // Disable data labels
    },
  };
  
  const chartSeries = selectedTeam?.assignee.map(() => 1); // All values set to 1, as it's a pie chart

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl">
      <div className="mb-2 px-5 pt-5">
        <h2 className="text-lg font-semibold text-black mb-2">Team Assignee Count</h2>
        <label htmlFor="teamSelect" className="font-bold mr-2">
          Select Team:
        </label>
        <select
          id="teamSelect"
          className="border border-gray-300 w-auto text-sm rounded-md py-1"
          onChange={handleTeamChange}
          value={selectedTeam ? selectedTeam.teamName : ''}
        >
          {assigneesData.map((team) => (
            <option key={team.teamName} value={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>
      </div>

      {selectedTeam && (
        <div className="ml-5">
          <div className="flex flex-wrap">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              width="380"
            />
          </div>
          <p className="mt-2 text-gray-600 font-bold">Assignee count: {selectedTeam.count}</p>
        </div>
      )}
    </div>
  );
};

export default AssigneeAvatar;
