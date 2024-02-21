// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddThresholds = ({ onSubmit }) => {
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(100);

  const handleMinThresholdChange = (event) => {
    setMinThreshold(event.target.value);
  };

  const handleMaxThresholdChange = (event) => {
    setMaxThreshold(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      minThreshold,
      maxThreshold,
    });
  };

  return (
    <div className="col-span-full xl:col-span-4 bg-white shadow-2xl rounded-3xl h-80 border border-slate-200 scrollTable4 ">
        <div className="flex flex-row">
        <header className="px-5 py-4 border-b border-slate-100">
         <h3 className="font-semibold text-slate-800">Set Up Memory Thresholds (MB)</h3>
         </header>
          </div> 
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
    <label className="inline-block w-40 mb-1">Minimum Threshold:</label>
      <div>
        <input
        style={{border:'1px solid black'}}
        className="w-40 h-8 px-3 text-base rounded-lg border border-gray-300 mb-5"
          id="minThreshold"
          type="number"
          placeholder='min threshold'
          onChange={handleMinThresholdChange}
        />
        
      </div>
      <div>
      <label className="inline-block w-40 mt-1 mb-1">Maximum Threshold:</label>
      <div>
        <input
        style={{border:'1px solid black'}}
        className="w-40 h-8 px-3 text-base rounded-lg border border-gray-300 mb-5"
          id="maxThreshold"
          type="number"
          placeholder='max threshold'
          onChange={handleMaxThresholdChange}
        />
      </div>
      <Link to={'/apiviews'} state={{min:minThreshold, max:maxThreshold}}>
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white input-submit rounded-lg p-1.5 ml-12"
        type="submit"
      >
        Submit
      </button>
      </Link>
      </div>
    </form>
    </div>
  );
};

export default AddThresholds;
