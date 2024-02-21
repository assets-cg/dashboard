// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { API_URL, Bearer_Token } from "../../config";

function AdminCard02() {
  const location = useLocation();

  const [values, setValues] = useState([]);
  const [val, setVal] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [graphName, setGraphName] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [unit, setUnit] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [thresholdData, setThresholdData] = useState([]);

  const valuesPerPage = 3;
  const pagesVisited = pageNumber * valuesPerPage;
  const pageCount = Math.ceil(values.length / valuesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    const getThresholds = async () => {
      const timeSlotData = [];
      const reqData = await fetch(`${API_URL}allthresholds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const resData = await reqData.json();
      setValues(resData);

      setThresholdData(timeSlotData);
    };
    getThresholds();
  }, [values]);

  // console.log(values)

  function handleOpenModal() {
    setModalOpen(true);
    setModalOpen2(false);
  }
  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleOpenModal2() {
    setModalOpen2(true);
    setModalOpen(false);
  }
  function handleCloseModal2() {
    setModalOpen2(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}addthresholddetails`,
        {
          graphName: graphName,
          minVal: min,
          maxVal: max,
          unit: unit,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await updateHeatmapThresholds();
      console.log("Thresholds updated successfully.");
    } catch (error) {
      console.error("Error updating thresholds:", error);
    }
    setRefreshing(false);
  };

  async function handleSubmit2(e) {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}updatethreshold`,
        {
          graphName: graphName,
          minVal: min,
          maxVal: max,
          unit: unit,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setModalOpen2(false);
    } catch (error) {
      <p className="text-red-600">{error}</p>;
      console.error(error);
    }
  }
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
    <div className="col-span-full xl:col-span-7 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable1">
      <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-black">Threshold Details</h3>
        <button
          type="addthreshold"
          onClick={handleOpenModal}
          className="btn bg-green-500 hover:bg-green-700 text-white"
        >
          Add Threshold{" "}
        </button>{" "}
        <span>
          <button
            onClick={handleOpenModal2}
            className="btn bg-green-500 hover:bg-green-700 text-white"
          >
            Update Threshold{" "}
          </button>
        </span>
      </header>
      <div className="p-3 ">
        {modalOpen && (
          <div className="absolute w-72 h-52 -mt-6 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600  scrollTable7">
            <form onSubmit={handleSubmit}>
              <div className="form-group no-outline">
                <label> GraphName: </label>
                <input
                  type="graphname"
                  required="true"
                  placeholder="Enter Graph Name"
                  name="graphName"
                  className="w-40 px-2 py-1 mt-0 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={graphName}
                  onChange={(e) => setGraphName(e.target.value)}
                />
              </div>
              <div className="form-group no-outline">
                <label> Minimum Value: </label>
                <input
                  type="minval"
                  required="true"
                  placeholder="Enter Min Value"
                  name="minVal"
                  className="text-sm w-32 px-2 ml-1 py-0 mt-2 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm form-control form01"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="form-group no-outline">
                <label> Maximum Value: </label>
                <input
                  type="maxval"
                  required="true"
                  placeholder="Enter Max Value"
                  name="maxVal"
                  className="text-sm w-32 px-2 py-0 mt-2 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm form-control form01"
                  value={max}
                  onChange={(e) => {
                    setMax(e.target.value), console.log(e.target.value);
                  }}
                />
              </div>
              <div className="form-group no-outline">
                <label> Threshold Unit: </label>
                <input
                  type="unit"
                  required="true"
                  placeholder="Enter unit"
                  name="unit"
                  className="text-sm w-32 px-2 py-0 mt-2 ml-2 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm form-control form01"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value), console.log(e.target.value);
                  }}
                />
              </div>
              <button
                type="thresholdsubmit"
                className="btn mt-3 bg-green-500 hover:bg-green-700 text-white"
              >
                Save
              </button>{" "}
              &nbsp;
              <button
                onClick={handleCloseModal}
                className="btn mt-3 bg-green-500 hover:bg-green-700 text-white"
              >
                Cancel
              </button>
              {/* <button className="btn btn-success" onClick={handleSubmit}>Save</button> */}
              {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button> */}
            </form>
          </div>
        )}

        {modalOpen2 && (
          <div className="absolute w-72 h-52 -mt-6 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable7">
            <form onSubmit={handleSubmit2}>
              <div className="text-sm form-group no-outline">
                <label> GraphName: </label>
                <select
                  className=" w-44 px-2 py-1 mt-0 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={graphName}
                  onChange={(e) => setGraphName(e.target.value)}
                >
                  <option>Select Graph Name:</option>
                  {values.map((name) => (
                    <option key={name.graphName} value={name.graphName}>
                      {name.graphName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm form-group no-outline">
                <label> Minimum Value: </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Min Value"
                  name="minVal"
                  className="text-sm w-32 px-2 py-0 mt-2 ml-1 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm form-control form01"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className=" text-sm form-group no-outline">
                <label> Maximum Value: </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Max Value"
                  name="maxVal"
                  className="text-sm w-32 px-2 py-0 mt-2 bg-white border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm form-control form01"
                  value={max}
                  onChange={(e) => {
                    setMax(e.target.value), console.log(e.target.value);
                  }}
                />
              </div>
              <div className="text-sm form-group no-outline">
                <label> Threshold Unit: </label>
                <input
                  type="text"
                  required
                  placeholder="Enter unit"
                  name="maxVal"
                  className="text-sm w-32 px-2 py-0 mt-2 bg-white ml-2 border-2 border-gray-300 border-solid rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm form-control form01"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value), console.log(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className=" mt-3 btn bg-green-500 hover:bg-green-700 text-white"
              >
                Save
              </button>{" "}
              &nbsp;
              <button
                onClick={handleCloseModal2}
                className="mt-3 btn bg-green-500 hover:bg-green-700 text-white"
              >
                Cancel
              </button>
              {/* <button className="btn btn-success" onClick={handleSubmit}>Save</button> */}
              {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button> */}
            </form>
          </div>
        )}
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full thresholdtable ">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Graph Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Min Value</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Max Value</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Unit</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {values
                .slice(pagesVisited, pagesVisited + valuesPerPage)
                .map((threshold, key) => (
                  <tr key={key}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-white">{threshold.id}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-white">
                        {threshold.graphName}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-700">
                        {threshold.minVal}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-red-500">
                        {threshold.maxVal}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-slate-700">
                        {threshold.unit}
                      </div>
                    </td>
                    {/* <td className="p-2">
                  <div className="text-center text-sky-500">{storyDetails.status}</div>
                </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
          <div
            style={{
              textAlign: "center",
              margin: "auto",
              fontWeight: "bold",
              display: "inline",
            }}
          >
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
      </div>
    </div>
  );
}
export default AdminCard02;
