// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import { useState, useEffect } from 'react';
export const API_URL = "https://r9tttzmic3.us-east-1.awsapprunner.com/dashboardKPI/V1/"
export const Weather_API_KEY = "ee0b8cb4ccd0b58e4b6131c608477da5"
export const API_LINK = "https://ec2-54-144-118-216.compute-1.amazonaws.com:3000/"
export const Prom_Url = "https://ec2-52-205-250-54.compute-1.amazonaws.com:9090/"
export const Novu_Url = "http://ec2-54-211-190-35.compute-1.amazonaws.com:3000"
export const Novu_Api = '513472d29b8d00634097622524cb2825'
export const APPLITOOLS_API_KEY="kXsyIjvqdmskOlueg99C5WrT0G1M109i6zvo7DFYtK6bV4110"



export let Bearer_Token = '';


export const Config = () => {
  const [bearerToken, setBearerToken] = useState('');

  useEffect(() => {
    const fetchBearerToken = async () => {
      try {
        const response = await fetch('https://r9tttzmic3.us-east-1.awsapprunner.com/dashboardKPI/V1/getTokens');
        const data = await response.json();
        setBearerToken(data[0].token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBearerToken();
  }, []);

  return {
    bearerToken,
  };
};

export let Job_Name="default"