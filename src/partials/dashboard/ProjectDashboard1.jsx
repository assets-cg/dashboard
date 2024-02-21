// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

function ProjectDashboard1() {
  const [values, setValues] = useState([]);
  const [userId, setUserId] = useState(null);
  const [val, setVal] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageNumber2, setPageNumber2] = useState(0);
  const [work, setWork] = useState();
  // const [projectName,setProjectName]=useState([0]);
  const [boardId, setBoardId] = useState([0]);
  const valuesPerPage = 3;
  const pagesVisited = pageNumber * valuesPerPage;
  const pagesVisited2 = pageNumber2 * valuesPerPage;
  const pageCount = Math.ceil(values.length / valuesPerPage);
  const pageCount2 = Math.ceil(val.length / valuesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const changePage2 = ({ selected }) => {
    setPageNumber2(selected);
  };

  useEffect(() => {
    const getProjects = async () => {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          localStorage.setItem("projectUser", user.attributes.email);
          // setUserId(user.attributes.email);
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
        });

      const reqData = await fetch(
        `${API_URL}projects?userName=${localStorage.getItem("projectUser")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resData = await reqData.json();

      const data = await fetch(
        `${API_URL}boards?projectName=${localStorage.getItem("projectName")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const velocityData = await fetch(
        `${API_URL}sprintvelocity?projectName=DashboardProject&BoardId=2`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const apidata = await data.json();
      const velocity = await velocityData.json();
      console.log(velocity);
      console.log(apidata)
      setWork(velocity.sprintVelocity);
      setValues(resData.projects);
      setVal(apidata.boardDetails);
    };
    getProjects();
  }, [localStorage.getItem("projectName")]);

  function getVelocityColor(percentCompleted) {
    if (100 - percentCompleted > 80) {
      return "text-red-500";
    } else if (100 - percentCompleted > 50) {
      return "text-orange-400";
    } else {
      return "text-green-500";
    }
  }

  console.log(work);

  return (
    // <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
    <div className="col-span-full xl:col-span-7 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable1">
      <header className="px-5 py-4">
        <h3 className="font-semibold text-black">Project Details</h3>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full projecttable">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Project Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Project Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Project Status
                  </div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-center">Sprint Status</div>
                </th> */}
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium ">
              {work &&
                values
                  .slice(pagesVisited, pagesVisited + valuesPerPage)
                  .map((projects, key) => (
                    <tr key={key}>
                      <td className="p-2 text-white" data-testid="column1-cell">
                        <div className="flex items-center ">
                          <Link>
                            <div
                              className="text-white underline getboards text-center"
                              onClick={() =>
                                localStorage.setItem(
                                  "projectName",
                                  projects.projectName
                                )
                              }
                            >
                              {projects.id}
                            </div>
                          </Link>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-white text-center">
                          {projects.projectName}
                        </div>
                      </td>
                      <td className="p-2">
                        <div
                          className="text-center"
                          style={{
                            border: "2px solid",
                            borderRadius: "4px",
                            color:
                              projects.projectStatus >= 0 &&
                              projects.projectStatus <= 25
                                ? "yellow"
                                : projects.projectStatus > 25 &&
                                  projects.projectStatus <= 75
                                ? "orange"
                                : projects.projectStatus > 75 &&
                                  projects.projectStatus <= 100
                                ? "green"
                                : "white", // Default color if status is invalid
                          }}
                        >
                          {projects.projectStatus >= 0 &&
                          projects.projectStatus <= 25
                            ? "Just Started"
                            : projects.projectStatus > 25 &&
                              projects.projectStatus <= 75
                            ? "In Progress"
                            : projects.projectStatus > 75 &&
                              projects.projectStatus <= 100
                            ? "Near to Completion"
                            : "Invalid status"}
                        </div>
                      </td>
                      {/* <td className="text-center p-2">
          {work.map((velocity, index) => (
            <div key={index} className="relative inline-block">
            <FontAwesomeIcon
              icon={faChartLine}
              className={`ml-3 mr-2 text-2xl ${getVelocityColor(velocity.percentCompleted)}`}
            />
            <div className="absolute left-9 -top-8 transform -translate-x-1/2">
                <div className=" bg-gray-900 text-white rounded px-1 py-1  opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div style={{fontSize:'10px'}}>{velocity.sprintName}</div>
                  <div style={{fontSize:'10px'}}>Pending:{100-velocity.percentCompleted}%</div>
                </div>
              </div>
            </div>
          ))}
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
          <header className="px-5 py-4">
            <h3 className="font-semibold text-black">Board Details</h3>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full boardtable">
                {/* Table header */}
                <thead className="text-xs text-black bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-center">Board Id</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Board Name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Project Name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Board Type
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* Upto table columns */}
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100">
                  {val
                    .slice(pagesVisited2, pagesVisited2 + valuesPerPage)
                    .map((boards, key) => (
                      <tr key={key}>
                        <td className="p-2 text-white">
                          <div
                            style={{ textDecoration: "underline" }}
                            className="flex items-center"
                          >
                            <Link
                              to={"/projectdetails"}
                              onClick={() =>
                                localStorage.setItem("boardId", boards.id)
                              }
                            >
                              <div className="text-center text-white">
                                {boards.id}
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-white text-center">
                            {boards.name
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join("_")}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className=" text-white text-center">
                            {boards.projectName}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-green-700">
                            {boards.type}
                          </div>
                        </td>
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
                  pageCount={pageCount2}
                  onPageChange={changePage2}
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
      </div>
    </div>
  );
}
export default ProjectDashboard1;
