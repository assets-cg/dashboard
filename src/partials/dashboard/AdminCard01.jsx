// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { API_URL, Bearer_Token } from "../../config";

function AdminCard01() {
  const location = useLocation();
  console.log(location, " useLocation Hook");
  const brdid = location.state?.brdid;
  const sprintnm = location.state?.sprintnm;
  // console.log(data)
  // console.log(data2)
  const [values, setValues] = useState([]);
  const [val, setVal] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [alias, setAlias] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const valuesPerPage = 3;
  const pagesVisited = pageNumber * valuesPerPage;
  const pageCount = Math.ceil(values.length / valuesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  useEffect(() => {
    const getLocations = async () => {
      const reqData = await fetch(`${API_URL}locationdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await reqData.json();

      setValues(resData);
      setToken(localStorage.getItem("token"));
    };
    getLocations();
  }, [token, values]);
  console.log(Bearer_Token);

  function handleOpenModal() {
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}addlocationdetails`,
        {
          city: city,
          state: state,
          alias: alias,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("done");
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(localStorage.getItem("conatinerName"));
  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
    <div className="col-span-full xl:col-span-8 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable1">
      <header className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-black">Location Details</h3>
        <button
          onClick={handleOpenModal}
          className="btn bg-green-500 hover:bg-green-700 text-white"
        >
          Add City
        </button>
      </header>
      <div className="p-3 ">
        {modalOpen && (
          <div className="absolute w-64 h-52 -mt-6 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable7">
            <form onSubmit={handleSubmit}>
              <div className="form-group no-outline">
                <label> City: </label>
                <input
                  type="text"
                  required="true"
                  placeholder="Enter city name"
                  name="city"
                  className="w-40 px-2 py-1 mt-0 ml-2 bg-white border-2 border-solid border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group no-outline">
                <label> State: </label>
                <input
                  type="text"
                  required="true"
                  placeholder="Enter state name"
                  name="state"
                  className="w-40 px-2 py-1 mt-4 bg-white border-2 border-solid border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="form-group no-outline">
                <label> Alias: </label>
                <input
                  type="text"
                  required="true"
                  placeholder="Enter alias name"
                  name="alias"
                  className="w-40 px-2 py-1 mt-4 ml-1 bg-white border-2 border-solid border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={alias}
                  onChange={(e) => {
                    setAlias(e.target.value), console.log(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn mt-3 bg-green-500 hover:bg-green-700 text-white"
              >
                Save
              </button>{" "}
              &nbsp;
              <button
                onClick={handleCloseModal}
                className="btn bg-green-500 hover:bg-green-700 text-white"
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
          <table className="table-auto w-full location-table">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">City</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">State</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Alias</div>
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
                .map((location, key) => (
                  <tr key={key}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-white">{location.id}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-white">
                        {location.city}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-700">
                        {location.state}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-white">
                        {location.alias}
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
export default AdminCard01;
