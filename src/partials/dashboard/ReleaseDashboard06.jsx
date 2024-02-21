import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReleaseDashboard06 = () => {
  const [createdDate, setCreatedDate] = useState(null);

  async function fetchProjectCreatedDate() {
    const url = 'http://ec2-54-205-52-32.compute-1.amazonaws.com:8080/rest/api/2/auditing/record';
    const bearerToken = 'NTg2MDE2MjA1MTc2OkN+xZK8g/DNZ/X6EUZ7ppZZkwOt';
    
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const auditRecords = response.data;
      console.log(auditRecords)
      const projectCreatedRecord = auditRecords.find(record => record.summary === 'Project created');

      if (projectCreatedRecord) {
        const creationDate = projectCreatedRecord.created; // This line extracts the creation date
        return creationDate;
      } else {
        console.error('Project created record not found in audit log.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching project created date:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchDate = async () => {
      const date = await fetchProjectCreatedDate();
      setCreatedDate(date);
    };

    fetchDate();
  }, []);

  return (
    <div>
      <h2>Project Created Date:</h2>
      {createdDate ? <p>{createdDate}</p> : <p>Loading...</p>}
    </div>
  );
};

export default ReleaseDashboard06;
