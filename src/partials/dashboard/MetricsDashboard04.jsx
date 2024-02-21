// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { API_LINK } from '../../config';

function MetricsDashboard04(){
  
      return (
        <>
        {/* <div className="col-span-full xl:col-span-3 bg-grey shadow-2xl rounded-3xl border border-slate-200">  
            <iframe style={{borderRadius:"20px"}} src="http://ec2-44-210-88-170.compute-1.amazonaws.com:3000/d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&from=1677125382350&to=1677146982350&theme=light&panelId=52" width="300" height="120" frameborder="0"></iframe>
        </div> */}

<div className="flex flex-col col-span-full sm:col-span-5 xl:col-span-4 bg-white shadow-2xl rounded-3xl border border-slate-200">
            <iframe style={{borderRadius:"20px"}} src={`${API_LINK}d-solo/X034JGT7Gz/springboot-apm-dashboard?orgId=1&from=now-6h&to=now&theme=light&panelId=60`} allow="insecure" width="100%" height="240" frameborder="0"></iframe>
        </div>
         </>
         );
  
     

};

export default MetricsDashboard04;