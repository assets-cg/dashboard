// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{useState,useEffect} from 'react';
import PieChart from '../../charts/PieChart';
import Icon from '../../images/icon-01.svg';
import Chart from 'react-apexcharts';
import { useLocation } from "react-router-dom";
import { API_URL, Bearer_Token } from '../../config';
import { Alert, Stack } from '@mui/material';


function ReleaseDashboard05(props) {
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
  const [defectByType, setdefectByType]= useState([]);
  const [countPercent, setcountPercent]= useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [value, setValue] = useState();
  const [sprintId, setsprintId] = useState();
  const [text, settext] =useState([]);
 useEffect( ()=>{
   const sDefect=[];
   const sCount=[];
   const sText=[];
//    const sPercentage=[];
   const getDefectsByType= async()=>{
   const reqData= await fetch(`${API_URL}defectsbytype?project=${data2}&boardID=${data}`,{
    headers: {
     'Authorization':  `Bearer ${localStorage.getItem("token")}`,
  }
 
 });
   const resData= await reqData.json();    
   for(var i=0;i<resData.length;i++){
    sDefect.push(resData[i].defectType); 
    sCount.push(resData[i].countPercentage);
   }  


   setdefectByType(sDefect);
   setcountPercent(sCount);
 // console.log(JSON.stringify(sCount)); 
 // console.log(resData);


//  for(var i=0;i<defectByType.length;i++){
   
//     sText.push(defectByType)
//    } 
//    settext(defectByType);
//    // console.log(text);
   }
   getDefectsByType();
},[data, data2]);


// console.log(defectByType);
  return (
    <div className="mb-44">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
         
        </header>
        
        <iframe src="http://ec2-52-87-175-159.compute-1.amazonaws.com:5601/app/dashboards#/view/4b531290-3779-11ee-85ff-515c798d3c8d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-time-filter=true&hide-filter-bar=true" height="3800" width="950">

        </iframe>
        
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

export default ReleaseDashboard05;
