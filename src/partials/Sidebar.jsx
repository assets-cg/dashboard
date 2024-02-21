// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link} from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';
import user0 from '../images/user0.svg';
import user12 from '../images/user8.avif';
import user1 from '../images/user5.avif';
import user2 from '../images/user6.avif';
import user3 from '../images/user7.avif';
import UserAvatar from '../images/KPI-dashboard.png';
import metrics from '../images/metrics.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import caplogo from '../images/CAP.PA-9b4110b0.png';
import axios from 'axios';
import { API_URL } from '../config';


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [kibanaURL, setKibanaURL] = useState('');

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    const fetchAndSetKibanaURL = async () => {
      try {
        const response = await axios.get(`${API_URL}kibanaurls`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response)
        const { kibanaurl } = response.data;
  
        // Save the Kibana URL to localStorage
      localStorage.setItem('ELKUrl', kibanaurl)
      } catch (error) {
        console.error('Error fetching Kibana URL:', error);
      }
    };
  
    fetchAndSetKibanaURL();
  }, [kibanaURL, localStorage.getItem('ELKUrl')]);
  console.log(localStorage.getItem('ELKUrl'))

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const icon = isDropdownOpen ? faTimes : faChevronDown ;

  const handleURLClick = () => {
    setKibanaURL(localStorage.getItem('ELKUrl'));
  };

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-custom3 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          {/* <NavLink end to="#" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#2dad31" stopOpacity="0" offset="0%" />
                  <stop stopColor="#2dad31" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38f892" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38f892" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#2dad31" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#46e56e" />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
            {/* <img className="w-12 h-12 rounded-full" src={UserAvatar} width="32" height="32" alt="User" /> */}
            
          {/*</NavLink>  */}
          <img src={caplogo} alt="Image Description" className="w-8 h-8 rounded-full mt-4 -ml-1"/>
          
          <NavLink to='#'>
          <span className=" text-xs font-medium hover:text-green-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
           <h1 style={{fontSize:'14px', marginTop:'0px', color:'lightgreen',marginLeft:'1px'}}>Agile<lable className='text-white'> Delivery Dashboard</lable></h1> </span></NavLink>
          
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Dashboards</span>
            </h3>
            <ul className="mt-3" >
              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === '/' || '/jenkinsview' }>
                {(handleClick, open) => {
                  return (
                    <React.Fragment >
                      <a
                        href="#0"
                        
                        className={`block text-slate-200 hover:text-white truncate transition duration-150  ${
                          (pathname === '/' || pathname.includes('dashboard')) && 'hover:text-slate-200'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center">
                            <NavLink
                              end
                              to="/businessownerview"
                              style={{display:'flex'}}
                              className={({ isActive }) =>
                              'block text-slate-200 hover:text-slate-50 transition duration-150 truncate ' + (isActive ? '!text-green-500' : '')
                            }                            >
                          <img src={user1} style={{width: '25px', height:'30px'}} />

                              <span className="text-xs font-medium hover:text-green-500 ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Business Owner
                            </span>
                            </NavLink>      
                          </div>
                          
                          {/* Icon */}
                        </div>

                        <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('jenkins') || pathname.includes('assignee') || pathname.includes('projects')|| pathname.includes('release')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#"
                        className={` text-slate-200 truncate transition duration-150 ${
                          pathname === '/' || pathname.includes('jenkins') || pathname.includes('assignee') || pathname.includes('projects') || pathname.includes('releasemanagementview')  ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between mt-3" >
                          <div className="flex items-center "  >     
                          <img src={user12} style={{ width: "25px", height: "30px", marginLeft:'-10px' }} />
                          <span className="text-xs ml-2 font-medium hover:text-green-500 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ">
                              Program Manager
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-0 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/projects"
                              className={({ isActive }) =>
                                ' programmanager block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200 ')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200  ">
                              Program Manager Dashboard
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/assigneeview"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                  
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Assignee View 
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/jenkinsview"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Jenkins View
                              </span>
                            </NavLink>
                          </li>
                          {/* <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/releasemanagementview"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Release Management View
                              </span>
                            </NavLink>
                          </li> */}
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>


                        

                        <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('servicedelivery')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#"
                        className={` text-slate-200 truncate transition duration-150 ${
                          pathname === '/' || pathname.includes('servicedelivery') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between mt-3" >
                          <div className="flex items-center"  >     
                          <img src={user2} style={{ width: "25px", height: "30px", marginLeft:'-10px' }} />
                          <span className="text-xs ml-2 font-medium hover:text-green-500 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Service Delivery Manager
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            {/* <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg> */}
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-0 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/servicedeliverydashboard"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Service Delivery Dashboard
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/servicedeliverydashboard2"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Service Now Ticket Details
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <SidebarLinkGroup activecondition={pathname === '/' || pathname.includes('basic') || pathname.includes('kibana-dashboard')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#"
                        className={` text-slate-200 truncate transition duration-150 ${
                          pathname === '/' || pathname.includes('basic') || pathname.includes('kibana-dashboard') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between mt-3" >
                          <div className="flex items-center"  >     
                          <img src={metrics} style={{width: '24px', height:'25px'}} className="-ml-3" />
                          <span className="text-xs ml-2 font-medium hover:text-green-500 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              API Monitoring
                            </span>
                          </div> */}
                          {/* Icon */}
                          {/* <div className="flex shrink-0 ml-2">
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-0 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/basicstats"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Monitoring Stats
                              </span>
                            </NavLink>
                          </li> */}
                          {/* <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/kibana-dashboard"
                              onClick={handleURLClick()}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-green-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-xs font-bold lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Kibana Dashboard
                              </span>
                            </NavLink>
                          </li> */}
                        {/* </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}

                        
                        {/* <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center">
                            
                            
                            <NavLink
                              end
                              to="/basicstats"
                              style={{display:'flex'}}
                              className={({ isActive }) =>
                              'block text-slate-200 hover:text-slate-50 transition duration-150 truncate ' + (isActive ? '!text-green-500' : '')
                            }                            >
                          <img src={metrics} style={{width: '24px', height:'25px'}} className="ml-0" />

                              <span className="text-xs font-medium hover:text-green-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ">
                              API Monitoring
                            </span>
                            </NavLink>      
                          </div>
                        </div> */}
                         <div className="flex items-center justify-between mt-7">
                          <div className="flex items-center">
                            <NavLink
                              end
                              to="/basicstats"
                              style={{display:'flex'}}
                              className={({ isActive }) =>
                              'block text-slate-200 hover:text-slate-50 transition duration-150 truncate ' + (isActive ? '!text-green-500' : '')
                            }                            >
                          <img src={metrics} style={{width: '24px', height:'25px'}} />

                              <span className="text-xs font-medium hover:text-green-500 ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              API Monitoring
                            </span>
                            </NavLink>      
                          </div>
                          
                          {/* Icon */}
                        </div>

                        <div className="flex items-center justify-between mt-7">
                          <div className="flex items-center">
                            <NavLink
                              end
                              to="/admin"
                              style={{display:'flex'}}
                              className={({ isActive }) =>
                              'admindash block text-slate-200 hover:text-slate-50 transition duration-150 truncate ' + (isActive ? '!text-green-500' : '')
                            }                            >
                          <img src={user1} style={{width: '25px', height:'30px'}} />

                              <span className="text-xs font-medium hover:text-green-500 ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Admin
                            </span>
                            </NavLink>      
                          </div>
                          
                          {/* Icon */}
                        </div>

                      </a>

                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>
          </div>
          {/* More group
          <div>
            <h3 className="text-xs uppercase text-slate-800 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
            </h3>
            <ul className="mt-3">
              Authentication
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${open && 'hover:text-slate-200'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className="fill-current text-slate-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z" />
                              <path className="fill-current text-slate-400" d="M15 12L8 6v5H0v2h8v5z" />
                            </svg>
                            <span className="text-xs font-medium hover:text-green-500 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Authentication
                            </span>
                          </div>
                          Icon
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/signin" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-xs font-medium hover:text-green-500 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign in
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-xs font-medium hover:text-green-500 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign up
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-xs font-medium hover:text-green-500 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Reset Password
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div> */}
        </div>

        
      </div>
    </div>

  );
}

export default Sidebar;

