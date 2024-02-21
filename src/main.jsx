// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Header2 from './partials/Header2';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import Sidebar from './partials/Sidebar';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      {/* <MainPage/> */}
      {/* <Header2/> */}
      <App />
      {/* <footer style={{textAlign:'center', fontWeight:'600', backgroundColor:'grey', color:'white'}}>Copyright 2023 @Capgemini.com</footer> */}
    </Router>
  </React.StrictMode>
);
