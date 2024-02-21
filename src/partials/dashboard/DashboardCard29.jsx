import React, { useEffect, useState } from 'react';
import {Alert, Stack} from '@mui/material';
import ReactPaginate from 'react-paginate';
import { API_URL} from '../../config';

const DashboardCard29 = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [pageNumber,setPageNumber]=useState(0);

  const valuesPerPage=3
  const pagesVisited=pageNumber * valuesPerPage
  const pageCount=Math.ceil(data.length/valuesPerPage)
  const changePage=({selected})=>{
    setPageNumber(selected);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const reqData= await fetch(`${API_URL}projectstoriesstatus?projectName=DashboardProject&BoardId=2`,{
            headers: {
             'Authorization':   `Bearer ${localStorage.getItem("token")}`,
          }
         
         });
         const summary = await reqData.json();
         console.log(summary)
      setData(summary.details);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
console.log(data)
  return (
<div className="flex flex-col col-span-full sm:col-span-6 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl">
       <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
        {/* Icon */}
        {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
      </header>
        <h3 className="font-semibold text-black">Status wise Story Summary</h3>    
      
      <div className="p-3 mt-5">
        {/* Table */}
        <div className="overflow-x-auto">
          {data.length?
          <table className="table-auto w-full featuretable">
            {/* Table header */}
            <thead className="text-xs  text-black bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Teams</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Stories</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Stories Done</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Progress</div>
                </th>
               
              </tr>
            </thead>
            {/* Upto table columns */}
            {/* Table body */}
            <tbody className="text-sm font-medium">
              {
                data.map((item,key)=>
                <tr key={key}>
                  <td className="p-2">
                  <div className="flex items-center">
                    <div className=" text-white">{item.team}</div>
                  </div>
                </td>
                <td className="p-2">
                <div className=" text-white text-center">{item.total}</div>
                </td>
                <td className="p-2">
                <div className=" text-white text-center">{item.done}</div>
                </td>
                <td className="p-2">
                <span>{item.progress} %</span>
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${item.progress}%` }}>  
                    </div>
                    
                </div>
                
               </td>
                </tr>
                )
              }
            </tbody>
          </table>
           : <div className='absolute right-12 mt-0'>
           {modalOpen && (
       <Stack sx={{ width: '100%'}} spacing={2}>
    
       <Alert severity="error"> Alert — <strong>No data available</strong></Alert>
     </Stack>     )}
     </div>
     }
          <div style={{textAlign:'center', margin:'auto', fontWeight:'bold', display:'inline'}}>
          <ReactPaginate 
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previoustBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            /></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardCard29;
