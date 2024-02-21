// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{useState,useEffect} from 'react';
import PieChart from '../../charts/PieChart';
import Icon from '../../images/icon-01.svg';
import Chart from 'react-apexcharts';
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';


function ReleaseDashboard01(props) {
  const location = useLocation();
  // console.log(location, " useLocation Hook");
  const data = location.state?.boardid;//for boaardid
  const data2 = location.state?.projectname;//for projectname
//   const data1 = location.state?.data1;//for sprintname  

// // console.log(data)
// // console.log(data1)
// // console.log(data2)
//   // const theme = useTheme();

  // const colors = tokens(theme.palette.mode);
  const [completed, setCompleted] = useState(0);
  const [assigned, setAssigned] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [value, setValue] = useState();
  const [sprintId, setsprintId] = useState();
  const [text, settext] =useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqData = await fetch(`${API_URL}taskcompletionofrelease?projectName=${localStorage.getItem('releaseProject')}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const resData = await reqData.json();
        
        setCompleted(resData.completed);
        setAssigned(resData.assigned);
        setPercentage(resData.percentage)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [localStorage.getItem('releaseProject'), assigned, completed, percentage]);


// console.log(defectByType);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
      <div className="px-5 pt-5">
        {/* <header className="flex justify-between items-start mb-2">
         
        </header> */}
        <p className='text-xl font-bold text-center'>{percentage.toFixed(2)}%</p>

        <p className='text-lg font-medium text-center'>Tasks</p>

        <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span style={{ marginTop: '10px' }} className="text-lg font-bold">
      {completed}
    </span>
    <p>Completed</p>
  </div>
  
  <div style={{ margin: '0 16px' }}>
    <hr className="w-px h-6 bg-slate-400 dark:bg-slate-700 border-none" />
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <span style={{ marginTop: '10px' }} className="text-lg font-bold">
      {assigned}
    </span>
    <p>Assigned</p>
  </div>
</div>
        
      </div>
        {/* <div className='mt-10 .legend-item defectbytype'>

          {countPercent ? 

             <Chart

                 type="pie"

                 width={390}

                height={220}


                 series={countPercent}                


            options={{

         

                  // noData:{text:"Empty Data"},                        

                  labels:defectByType,
                
                  legend:{
                    show: true,
                    labels:{
                      colors: ['#030303']
                    }
                
                  }
           



  }}

 >

 </Chart>
 : <div className='absolute mt-0'>
 {modalOpen && (
<Stack sx={{ width: '100%'}} spacing={2}>

<Alert severity="error"> Alert — <strong>No data available</strong></Alert>
</Stack>     )}
</div>
}

             </div> */}
    </div>
  );
}

export default ReleaseDashboard01;
