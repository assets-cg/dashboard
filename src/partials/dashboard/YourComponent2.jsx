import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { useLocation } from 'react-router-dom';

const YourComponent2 = () => {
    const location = useLocation();
  const sprintnm = location.state?.sprintnm;
  const [sprintIssues, setSprintIssues] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_URL}sprintstoriesstatuswise?projectName=${localStorage.getItem("projectName")}&BoardId=${localStorage.getItem("boardId")}&sprintName=${sprintnm}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((response) => response.json())
      .then((data) => {
        // Extract the sprint issues from the API response
        const { statusdetails } = data;
        setSprintIssues(statusdetails);
      })
      .catch((error) => {
        console.log('Error fetching data from the API:', error);
      });
  }, []);
console.log(sprintIssues)
return (
  <div className="flex justify-center col-span-12 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl">
    <div className="px-4 py-4">
      <header className="absolute ">
        <h3 className="font-semibold text-black mb-10">Status wise Sprint Stories</h3>
      </header>
    </div>

    {/* Backlog */}
    <div className="px-4 bg-white-300 mt-16 shadow-xl ml-10 border-2 border-gray-300 mr-4 h-96 w-60 overflow-y-auto m-4 rounded">
      <h2 className="mb-4 bg-white shadow-md p-2 sticky top-0 -ml-4 -mr-4 text-center font-bold border-t-3 border-yellow-300">Backlog</h2>
      {sprintIssues.filter((status) => status.status === 'To Do').flatMap((status) => status.details).length === 0 ? (
        <div className="bg-yellow-100 border-l-3 text-md font-bold text-yellow-500 border-yellow-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
          No Backlog Issues
        </div>
      ) : (
        sprintIssues
          .filter((status) => status.status === 'To Do')
          .flatMap((status) => status.details)
          .map((issue) => (
            <div key={issue.storyKey} className="bg-yellow-100 border-l-3 border-yellow-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
              <div><span className='text-md font-bold text-blue-500'>{issue.storyKey} - </span><span className='text-sm font-bold text-yellow-500'>{issue.summary}</span></div>
              <div><span className='text-xs font-bold'>Story Points:</span><span className='text-md font-bold text-gray-500'> {issue.storyPoints}</span></div>
            </div>
          ))
      )}
    </div>

    {/* In Progress */}
    <div className="px-4 bg-white-300 mt-16 shadow-xl ml-0 border-2 border-gray-300 mr-4 h-96 w-60 overflow-y-auto m-4 rounded">
      <h2 className="mb-4 bg-white shadow-md p-2 sticky -ml-4 -mr-4 top-0 text-center font-bold border-t-3 border-orange-400">In Progress</h2>
      {sprintIssues.filter((status) => status.status === 'In Progress').flatMap((status) => status.details).length === 0 ? (
        <div className="bg-orange-100 border-l-3 text-md font-bold text-orange-600 border-orange-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
          No Issues In Progress
        </div>
      ) : (
        sprintIssues
          .filter((status) => status.status === 'In Progress')
          .flatMap((status) => status.details)
          .map((issue) => (
            <div key={issue.storyKey} className="bg-orange-100 border-l-3 border-orange-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
              <div><span className='text-md font-bold text-blue-500'>{issue.storyKey} - </span><span className='text-sm font-bold text-orange-500'>{issue.summary}</span></div>
              <div><span className='text-xs font-bold'>Story Points:</span><span className='text-md font-bold text-gray-500'> {issue.storyPoints}</span></div>
            </div>
          ))
      )}
    </div>

    {/* Blocked */}
    <div className="px-4 bg-white-300 mt-16 shadow-xl border-2 border-gray-300 ml-0 mr-4 h-96 w-60 overflow-y-auto m-4 rounded">
      <h2 className="mb-4 bg-white shadow-md p-2 -ml-4 -mr-4 sticky top-0 text-center font-bold border-t-3 border-red-500">Blocked</h2>
      {sprintIssues.filter((status) => status.status === 'Blocked').flatMap((status) => status.details).length === 0 ? (
        <div className="bg-red-100 border-l-3 text-md font-bold text-red-600 border-red-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
          No Issues Blocked
        </div>
      ) : (
        sprintIssues
          .filter((status) => status.status === 'Blocked')
          .flatMap((status) => status.details)
          .map((issue) => (
            <div key={issue.storyKey} className="bg-red-100 border-l-3 border-red-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
              <div><span className='text-md font-bold text-blue-500'>{issue.storyKey} - </span><span className='text-sm font-bold text-red-500'>{issue.summary}</span></div>
              <div><span className='text-xs font-bold'>Story Points:</span><span className='text-md font-bold text-gray-500'> {issue.storyPoints}</span></div>
            </div>
          ))
      )}
    </div>

    {/* Done */}
    <div className="px-4 bg-white-300 mt-16 shadow-xl ml-0 border-2 border-gray-300 mr-4 h-96 w-60 overflow-y-auto m-4 rounded">
      <h2 className="mb-4 bg-white p-2 -ml-4 -mr-4 sticky top-0 text-center font-bold border-t-3 border-green-400 shadow-md">Done</h2>
      {sprintIssues.filter((status) => status.status === 'Done').flatMap((status) => status.details).length === 0 ? (
        <div className="bg-green-100 border-l-3 text-md font-bold text-green-600 border-green-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
          No Completed Issues
        </div>
      ) : (
        sprintIssues
          .filter((status) => status.status === 'Done')
          .flatMap((status) => status.details)
          .map((issue) => (
            <div key={issue.storyKey} className="bg-green-100 border-l-3 border-green-600 shadow-2xl h-auto w-auto p-4 mb-2 rounded-md rounded-tl rounded-bl">
              <div><span className='text-md font-bold text-blue-500'>{issue.storyKey} - </span><span className='text-sm font-bold text-green-600'>{issue.summary}</span></div>
              <div><span className='text-xs font-bold'>Story Points:</span><span className='text-md font-bold text-gray-500'> {issue.storyPoints}</span></div>
            </div>
          ))
      )}
    </div>

  </div>
);
};

export default YourComponent2;
