// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from "react";
import lockedDoor from "../images/lockedDoor.png";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import AdminCard01 from "../partials/dashboard/AdminCard01";
import CreateAccountForm from "./CreateAccountForm";
// import UserTable from './UserTable';
import { Auth, Hub } from "aws-amplify";
import AdminCard02 from "../partials/dashboard/AdminCard02";
import { EuiDatePicker, EuiDatePickerRange } from "@elastic/eui";
import moment from "moment";
import DateSelector from "../partials/dashboard/DateSelector";
import IntervalSet from "../partials/dashboard/IntervalSet";
import GenerateToken from "../partials/dashboard/GenerateToken";
import NotificationWidget from "../partials/dashboard/NotificationWidget";
import { API_URL } from "../config";
import { Alert, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import UserTable from "./UserTable";
import NotificationBell2 from "../partials/dashboard/NotificationBell2";
import MetricsDashboard53 from "../partials/dashboard/MetricsDashboard53";
import MetricsDashboard50 from "../partials/dashboard/MetricsDashboard50";
import DashboardCard25 from "../partials/dashboard/DashboardCard25";
import DiscussionWidget from "../partials/dashboard/DiscussionWidget";
import DashboardCard35 from "../partials/dashboard/DashboardCard35";
// import Banner from '../partials/Banner';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(1, "hour"));
  const [endDate, setEndDate] = useState(moment());
  const [tokenExpiry, setTokenExpiry] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expireAfterHours, setExpireAfterHours] = useState();
  const [expireAfterMinutes, setExpireAfterMinutes] = useState();
  const [expireAfter, setExpireAfter] = useState();
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [url, setUrl] = useState(false);
  const [tokenInvalidated, setTokenInvalidated] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myValue, setMyValue] = useState(token);
  const [comment, setComment] = useState("");

  function handleOpenModal() {
    setModalOpen(true);
    setModalOpen2(false);
    setModalOpen3(false);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    // Handle logic to close the modal
  };

  function handleOpenModal2() {
    setModalOpen2(true);
    setModalOpen(false);
    setModalOpen3(false);
  }

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  function handleOpenModal3() {
    setModalOpen3(true);
    setModalOpen2(false);
    setModalOpen(false);
  }

  const handleCloseModal3 = () => {
    setModalOpen3(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   // do something with myValue // ...
  //    // Update the global variable when myValue changes u
  //    updateToken(myValue); }, [myValue]);

  async function handleSubmit2(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}postprometheusurl`,
        {
          prometheusUrl: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.setItem("PromUrl", comment);
      setUrl(true);
      //  console.log(localStorage.getItem("PromUrl"));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit3(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}postkibanaurl`,
        {
          kibanaurl: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.setItem("ELKUrl", comment);
      setUrl(true);
      console.log(localStorage.getItem("ELKUrl"));
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = await fetch(
      `${API_URL}generatetoken?username=${username}&password=${password}`,
      {
        method: "POST",
      }
    );

    const tokenData = await fetch(`${API_URL}tokens`);
    const Tdata = await tokenData.json();
    localStorage.setItem("token", Tdata[Tdata.length - 1].token);
    console.log(localStorage.getItem("token") + " is your local token");

    const resData = await reqData.text();

    setToken(resData);
    setShowToken(false);

    if (resData === "Invalid username or password") {
      setErrorMsg("Invalid username or password");
      setTokenGenerated(false);
      setTokenInvalidated(false);
    } else {
      setTokenGenerated(true);
      setTokenInvalidated(false);
      console.log("Generating token...");
      setErrorMsg(false);
      // setExpireAfter(`${expireAfterHours}:${expireAfterMinutes}`);
      navigate("/businessownerview"); // navigate to page after token generation
    }
    // updateToken(token);
  };

  function handleToggleTokenVisibility() {
    setShowToken(!showToken);
  }

  const handleInvalidate = async () => {
    try {
      await fetch(
        `${API_URL}deletetoken?token=${localStorage.getItem("token")}`,
        {
          method: "DELETE",
        }
      );
      setTokenInvalidated(true);
      setTokenGenerated(false);
      setErrorMsg(false);
      localStorage.removeItem("token");
      console.log("Invalidating token...");
      navigate("/businessownerview");
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user
      console.error(error);
    }
  };

  const handleExpireAfterChange = (e) => {
    const input = e.target.value;
  };

  const handleExpireAfterHoursChange = (event) => {
    setExpireAfterHours(parseInt(event.target.value));
    // console.log(expireAfterHours)
  };

  const handleExpireAfterMinutesChange = (event) => {
    setExpireAfterMinutes(parseInt(event.target.value));
    // console.log(expireAfterMinutes)
  };

  useEffect(() => {
    const checkTokenExpiry = async () => {
      try {
        const reqData = await fetch(
          `${API_URL}projects?userName=${localStorage.getItem("projectUser")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const resData = await reqData.text();
        setTokenExpiry(resData);
      } catch (error) {
        console.log("Error in Token");
      }
    };
    checkTokenExpiry();
  }, [tokenExpiry]);

  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const groups =
        user.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups && groups.includes("Admin")) {
        setIsAdmin(true);
      }
    };

    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "signIn") {
        checkIfAdmin();
      }
    });

    checkIfAdmin();
  }, []);

  if (!isAdmin) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            src={lockedDoor}
            alt="Access Denied"
            className="h-64 mb-8 shake-rotate"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Access to this page is restricted
            </h1>
            <p className="text-xl mt-4">
              Only <b>Admin</b> access accepted
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-custom">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <span>
                  <label style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Admin Dashboard <NotificationBell2 />{" "}
                    <div className="absolute right-10 -mt-8">
                      {tokenExpiry === "Expired JWT token" ||
                        (tokenExpiry === "Invalid JWT token" && (
                          <Stack sx={{ width: "100%" }} spacing={2}>
                            <Alert severity="error">
                              Alert :{" "}
                              <strong>JWT Token Expired / Invalid</strong>
                            </Alert>
                          </Stack>
                        ))}
                    </div>
                  </label>
                  <button
                    onClick={handleOpenModal}
                    className=" absolute left-60 btn bg-green-500 hover:bg-green-700 text-white"
                  >
                    Generate Token
                  </button>
                  {modalOpen && (
                    <div className="absolute w-72 -left-28 h-auto bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 mt-3 ml-48 scrollTable7">
                      <div className="w-60 mx-auto">
                        <div className="flex items-center justify-end pt-0">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 01-.707-.707L9.293 10 5.652 6.36a.5.5 0 11.707-.707L10 9.293l3.64-3.64a.5.5 0 01.707 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <form
                          onSubmit={handleSubmit}
                          className=" rounded pb-1 mb-1"
                        >
                          <div className="mb-4 ">
                            <label
                              className="block font-bold mb-2"
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <div className="rounded border border-gray-300">
                              <input
                                className="rounded py-1 px-2 text-gray-700 leading-tight focus:shadow-outline border border-gray-300"
                                id="username"
                                type="text"
                                required
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <label
                              className="block font-bold mb-2"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <div className=" rounded border border-gray-300">
                              <input
                                className="rounded  py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                required
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* <div className="mb-4 ">
        <label className="block font-bold mb-2" htmlFor="expire-after">
          Expire After
        </label>
        <div className="flex">
            <p className="text-black mr-1">Hours:</p>
            <div className=" rounded border border-gray-300">
            <input
  type="number"
  className="w-16 rounded border border-gray-400 bg-white text-gray-700 py-0 leading-tight focus:outline-none"
  value={expireAfterHours}
  placeholder="--"
  required
  min="0"
  max="24"
  onChange={(e) => setExpireAfterHours(e.target.value)}
/></div>

          <p className="text-black ml-1 mr-1">Minutes:</p>
          <div className=" rounded border border-gray-300">
          <input
  type="number"
  className=" w-16 rounded border border-gray-400 bg-white text-gray-700 py-0 leading-tight focus:outline-none"
  value={expireAfterMinutes}
  placeholder="--"
  required
  min="0"
  max="59"
  onChange={(e) => setExpireAfterMinutes(e.target.value)}
/></div>

        </div>
      </div> */}
                          <div className="flex items-center justify-between">
                            <button
                              style={{ fontSize: "15px" }}
                              className=" w-32 bg-green-600 hover:bg-green-500 text-white font-bold py-2 mr-2 rounded "
                              type="submit"
                            >
                              Generate
                            </button>
                            <button
                              style={{ fontSize: "15px" }}
                              className=" w-32 bg-red-600 hover:bg-red-500 text-white font-bold ml-2 py-2 rounded "
                              type="button"
                              onClick={handleInvalidate}
                            >
                              Invalidate
                            </button>

                            <FontAwesomeIcon
                              icon={showToken ? faEyeSlash : faEye}
                              title={showToken ? "Hide Token" : "Show Token"}
                              style={{ marginLeft: "10px" }}
                              onClick={handleToggleTokenVisibility}
                            />
                          </div>
                          {tokenGenerated && (
                            <div>
                              <p
                                style={{ fontSize: "13px", marginTop: "5px" }}
                                className="text-green-300"
                              >
                                Token generated successfully!!
                              </p>
                            </div>
                          )}

                          {tokenInvalidated && (
                            <p
                              style={{ fontSize: "13px", marginTop: "5px" }}
                              className="text-white"
                            >
                              Token Invalidated!
                            </p>
                          )}
                          {errorMsg && (
                            <p
                              style={{ fontSize: "13px", marginTop: "5px" }}
                              className="text-white"
                            >
                              Invalid Username or Password
                            </p>
                          )}
                        </form>
                        <div className="flex -ml-14">
                          {showToken && (
                            <div>
                              <p className="text-sm ml-10">
                                <b>Here's your token:</b>
                              </p>
                              <textarea
                                readOnly
                                className="resize-none w-64 ml-12 text-xs bg-white border-none"
                                value={localStorage.getItem("token")}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleOpenModal2}
                    className=" absolute left-96 btn bg-green-500 hover:bg-green-700 text-white"
                  >
                    Set Prometheus URL
                  </button>
                  {modalOpen2 && (
                    <div className="absolute w-72 h-auto mt-3 left-64 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable7">
                      <div className="w-60 mx-auto">
                        <div className="flex items-center justify-end pt-0">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal2}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 01-.707-.707L9.293 10 5.652 6.36a.5.5 0 11.707-.707L10 9.293l3.64-3.64a.5.5 0 01.707 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <form
                          onSubmit={handleSubmit2}
                          className="rounded pb-1 mb-1"
                        >
                          <header className="py-2">
                            <h2 className="font-semibold text-black mb-2">
                              Set Prometheus URL
                            </h2>
                          </header>
                          <input
                            id="comment"
                            name="comment"
                            value={comment}
                            required
                            onChange={(event) => setComment(event.target.value)}
                            className="rounded mb-2 py-1 px-2 text-gray-700 leading-tight border-2 border-solid border-gray-300"
                            placeholder="e.g. ec2-44-200-131-926.compute-1.amazonaws.com"
                          />

                          <div className="flex items-center justify-end">
                            <button
                              type="submit"
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Submit
                            </button>
                          </div>

                          {url && (
                            <p
                              style={{ fontSize: "13px", marginTop: "5px" }}
                              className="text-green-600 font-medium"
                            >
                              Prometheus URL set successfully!
                            </p>
                          )}
                        </form>
                      </div>
                    </div>
                  )}
                  <button
                    style={{ marginLeft: "355px" }}
                    onClick={handleOpenModal3}
                    className=" absolute btn bg-green-500 hover:bg-green-700 text-white"
                  >
                    Set Kibana URL
                  </button>
                  {modalOpen3 && (
                    <div className="absolute w-72 h-auto mt-3 left-96 bg-custom2 shadow-2xl rounded-3xl border-solid border-2 border-green-600 scrollTable7">
                      <div className="w-60 mx-auto">
                        <div className="flex items-center justify-end pt-0">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal3}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 01-.707-.707L9.293 10 5.652 6.36a.5.5 0 11.707-.707L10 9.293l3.64-3.64a.5.5 0 01.707 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <form
                          onSubmit={handleSubmit3}
                          className="rounded pb-1 mb-1"
                        >
                          <header className="py-2">
                            <h2 className="font-semibold text-black mb-2">
                              Set Kibana URL
                            </h2>
                          </header>
                          <input
                            id="comment"
                            name="comment"
                            value={comment}
                            required
                            onChange={(event) => setComment(event.target.value)}
                            className="rounded mb-2 py-1 px-2 text-gray-700 leading-tight border-2 border-solid border-gray-300"
                            placeholder="e.g. ec2-44-200-131-926.compute-1.amazonaws.com"
                          />

                          <div className="flex items-center justify-end">
                            <button
                              type="submit"
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Submit
                            </button>
                          </div>

                          {url && (
                            <p
                              style={{ fontSize: "13px", marginTop: "5px" }}
                              className="text-green-600 font-medium"
                            >
                              Kibana URL set successfully!
                            </p>
                          )}
                        </form>
                      </div>
                    </div>
                  )}
                </span>
                <div className="inline-block absolute right-10 w-51"></div>

                <br></br>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-3">
              <AdminCard01 />
              <CreateAccountForm />
              <AdminCard02 />
              <IntervalSet />

              <DiscussionWidget />

              {/* <DashboardCard25/> */}

              {/* <GenerateToken/> */}
              {/* <NotificationWidget/> */}
            </div>
          </div>
          <footer class="p-2 md:px-4 md:py-4 z-10 left-20 bottom-0 w-full bg-custom3">
            <span
              style={{ fontWeight: "600" }}
              class="block text-sm text-white sm:text-center dark:text-white bg-custom3"
            >
              DAAS (Dashboard As A Service) ©
              <a
                href="https://www.capgemini.com/"
                target="_blank"
                class="hover:underline"
              >
                Capgemini 2023
              </a>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
