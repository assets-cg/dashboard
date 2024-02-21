// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import SprintDeepDive from './pages/SprintDeepDive';
import ProjectDetails from './pages/ProjectDetails';
import SprintDeepDive1 from './pages/SprintDeepDive1';
import SprintBoardView from './pages/SprintBoardView';
import FeatureDrillDown from './pages/FeatureDrillDown';
import StorySummary from './pages/StorySummary';
import JenkinsView from './pages/JenkinsView';
import TaskSummary from './pages/TaskSummary';
import BusinessOwnerDashboard from './pages/BusinessOwnerDashboard';
import AssigneeView from './pages/AssigneeView';
import AssigneeIssues from './pages/AssigneeIssues';
import ProjectDetails02 from './pages/ProjectDetails02';
import ProjectDetails03 from './pages/ProjectDetails03';
import AdminDashboard from './pages/AdminDashboard';
import LocationDetails from './pages/LocationDetails';
// import MyComponent from './pages/MyComponent';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import UserMenu from './partials/header/UserMenu';
import Header from './partials/Header';
import Login from './pages/Login';
import ForgotPasswordForm from './pages/ForgotPasswordForm';

import ServiceDeliveryManager from './pages/ServiceDeliveryManager';
import ServiceDeliveryManager2 from './pages/ServiceDeliveryManger2';
import DataMetrics from './pages/DataMetrics';
import DataMetrics2 from './pages/DataMetrics2';
import DataMetrics3 from './pages/DataMetrics3';
import DataMetrics4 from './pages/DataMetrics4';
import DataMetrics5 from './pages/DataMetrics5';
import DataMetrics6 from './pages/DataMetrics6';
import ApiViews from './pages/ApiViews';
import EditUsers from './pages/EditUsers';
import FeatureDrillDownForFeatureStatus from './pages/FeatureDrilldownForFeatureStatus';
import YourComponent from './partials/dashboard/YourComponent';
import ReleaseManagementView from './pages/ReleaseManagmentView';
import KibanaDashboardPage from './pages/KibanaDashboardPage';

// import { SignIn } from '@aws-amplify/ui-react/dist/types/components/Authenticator/SignIn';


Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function App({ signOut, user }) {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    {/* <button onClick={signOut}>Sign out</button> */}
      <Routes>
        
        <Route exact path="/" element={<Login />} />
        <Route exact path="/apiviews" element={<ApiViews/>} />
        <Route exact path="/newdiv" element={<YourComponent/> } />
        <Route exact path="/editusers" element={<EditUsers/>} />
        <Route exact path="/basicstats" element={<DataMetrics/>} />
        <Route exact path="/httpstats" element={<DataMetrics2/>} />
        <Route exact path="/httpstatsdetails" element={<DataMetrics3/>} />
        <Route exact path="/jvmstats-memory" element={<DataMetrics4/>} />
        <Route exact path="/jvmstats-gc" element={<DataMetrics5/>} />
        <Route exact path="/hikaristats" element={<DataMetrics6/>} />
        <Route exact path="/forgotpassword" element={<ForgotPasswordForm />} />
        <Route exact path="/servicedeliverydashboard" element={<ServiceDeliveryManager/>} />
        <Route exact path="/servicedeliverydashboard2" element={<ServiceDeliveryManager2/>} />
        <Route exact path="/projects" element={<Dashboard />} />
        {/* <Route exact path="/" element={<MainPage />} /> */}
        <Route exact path="/sprintdeepdive"element={<SprintDeepDive />} />
        <Route excat path ="/projectdetails" element={<ProjectDetails />} />
        <Route excat path ="/projectdetails2" element={<ProjectDetails02/>} />
        <Route excat path ="/projectdetails3" element={<ProjectDetails03/>} />
        <Route exact path="/sprintdeepdive1"element={<SprintDeepDive1 />} />
        <Route exact path ="/sprintboard" element={<SprintBoardView />} />
        <Route exact path ="/featuredrilldown" element={<FeatureDrillDown />} />
        <Route exact path="/featurestatusdrilldown" element={<FeatureDrillDownForFeatureStatus/>} />
        <Route exact path ="/storysummary" element={<StorySummary />} />
        <Route exact path ="/jenkinsview" element={<JenkinsView/>} />
        <Route exact path ="/tasksummary" element={<TaskSummary/>} />
        <Route excat path ="/businessownerview" element={<BusinessOwnerDashboard/>} />
        <Route excat path="/assigneeview" element={<AssigneeView/>} />
        <Route excat path="/assigneeissues" element={<AssigneeIssues />} />
        <Route exact path="/admin" element={<AdminDashboard/>}/>
        <Route exact path="/addLocationDetails" element={<LocationDetails/>}/>
        {/* <Route exact path="/releasemanagementview" element={<ReleaseManagementView/>}/> */}
        <Route exact path="/kibana-dashboard" element={<KibanaDashboardPage/>}/>
        {/* <Route exact path="/signin" element={<MyComponent/>}/> */}


      </Routes>

      
      
    </>
  );
}

export default App;