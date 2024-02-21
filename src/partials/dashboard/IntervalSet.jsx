// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState } from "react";
import { Auth } from "aws-amplify";

const IntervalSet = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [interval, setInterval] = useState("");

  function handleIntervalSubmit(event) {
    event.preventDefault();
    const selectedInterval = event.target.elements.units.value;
    localStorage.setItem("intervals", selectedInterval);
    console.log(selectedInterval);
  }
  console.log(localStorage.getItem("interval"));
  const handleCustomInterval = (event) => {
    event.preventDefault();
    console.log(event.target.elements[0].valueAsNumber);
    localStorage.setItem(
      "intervals",
      parseInt(event.target.elements[0].valueAsNumber)
    );
  };

  return (
    <div className="flex flex-col col-span-full shadow-2xl sm:col-span-6 xl:col-span-5 h-80 bg-custom2 rounded-3xl border-solid border-2 border-green-600 scrollTable5">
      <main>
        <div className="grid grid-cols-6 gap-3 wrapper3">
          <div className="signUpForm">
            <h5 className="font-semibold text-black">Select Time Interval:</h5>
            <form
              className="flex items-center space-x-3 mt-2"
              onSubmit={handleIntervalSubmit}
            >
              <select
                id="units"
                name="units"
                className="w-28 rounded-md py-1 px-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                placeholder="select interval"
              >
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour </option>
              </select>
              <button
                type="submit"
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply
              </button>
            </form>

            <h5 className="font-semibold mt-4">Or</h5>

            <form onSubmit={handleCustomInterval}>
              <div className=" mt-5">
                <h5 className="font-semibold text-black">
                  Set Custom Time Interval (minutes):
                </h5>
                <br></br>
                <div className=" space-x-3">
                  <input
                    className=" mt-0 input-field2 w-32 py-1 px-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 addnewinterval"
                    type="number"
                    placeholder="Add Interval"
                    required
                  />
                  <button
                    type="submit"
                    id="interval"
                    className="items-center px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 applyinterval"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntervalSet;
