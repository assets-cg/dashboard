// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { useState,useEffect} from "react";
import Chart from 'react-apexcharts';
import {Link} from "react-router-dom";
import { API_URL} from '../../config';
import { Auth } from "aws-amplify";

const DashboardCard24 = () => {
    const [projectName, setProjectName] = useState([]);
    const [workDone, setWorkDone] = useState([]);

    useEffect( ()=>{
        const getProjects= async()=>{
     
         Auth.currentAuthenticatedUser()
         .then((user) => {
           localStorage.setItem("projectUser", user.attributes.email)
           // setUserId(user.attributes.email);
           console.log(user)
         })
         .catch((error) => {
           console.error(error);
         });
        
        const reqData= await fetch(`${API_URL}projects?userName=${localStorage.getItem("projectUser")}`,{
         headers: {
          'Authorization':  `Bearer ${localStorage.getItem("token")}`,
       }
      
      });
        const resData= await reqData.json(); 
        console.log(resData.projects)

        const projects = resData.projects;

        // Extracting project names and work done into separate arrays
        const projectNames = projects.map((project) => project.projectName);
        const workDoneValues = projects.map((project) => project.projectStatus);
        console.log(workDoneValues)
        setProjectName(projectNames);
        setWorkDone(workDoneValues);
     
        }
     getProjects();
     },[localStorage.getItem("projectName")]);
console.log(workDone["NaN"])

  const chartOptions = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '15%',
        colors: {
          ranges: [
            {
              from: -Infinity,
              to: 25,
              color: '#FF0000', // Red
            },
            {
              from: 25,
              to: 30,
              color: '#FFA500', // Orange
            },
            {
              from: 31,
              to: Infinity,
              color: '#0ac90a', // Green
            },
          ],
        },
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['Projects'],
    },
    yaxis: {
      show: false,
      title: {
        // text: '% Completion',
      },
    },
    legend: {
      show: false, // Disable default legend
    },
  };

  const chartSeries = projectName.map((projectName, index) => {
    return {
      name: projectName,
      // data: [workDone[index] !== undefined && workDone[index].toFixed(2)],
    };
  });
  // Custom legend component
// Custom legend component
const CustomLegend = () => {
    return (
      <div className="flex mt-0">
        {chartSeries.map((series, index) => {
            console.log(series)
          // const color = chartOptions.plotOptions.bar.colors.ranges.find(
          //   (range) => series?.data[0] >= range.from && series?.data[0] <= range.to
          // ).color;
  
          return (
            <div key={series.name} className="flex items-center mr-2 ml-3 font-medium text-xs">
              <div
                className="w-2.5 h-2.5 mr-2 rounded"
                // style={{ backgroundColor: color }}
              ></div>
              <span>{series.name}={series?.data}%</span>
            </div>
          );
        })}
      </div>
    );
  };
  

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 border-solid border-2 border-green-600 bg-custom2 shadow-2xl rounded-3xl p-4">
       <div className="px-3 pt-2">
        <header className="flex justify-between items-start ">
        </header>
        <h3 className="font-semibold text-black"> Project Status</h3>
      </div>
      
      <Chart options={chartOptions} series={chartSeries} type="bar" height={280} />
      <CustomLegend />
      
    </div>
  );
};

export default DashboardCard24;
