// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React,{ useState , useEffect} from 'react';
import WeatherDashboard from './WeatherDashboard';
import { useLocation, } from 'react-router-dom';
import { Auth } from "aws-amplify";
import bnner from '../../images/bnnr.png'

function WelcomeBanner() {


  const [userId, setUserId] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    retrieveGroups();
  }, []);
  const retrieveGroups = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const group = user.signInUserSession.accessToken.payload['cognito:groups'][0];
      console.log(user.signInUserSession.accessToken)
      setGroups(group);
      console.log(groups)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserId(user.attributes.email);
        console.log(user)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 

    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;
    if (hrs < 12){
     greet = 'Good Morning';
    }
    else if (hrs >= 12 && hrs <= 16){
     greet = 'Good Afternoon';}
    else if (hrs >= 17 && hrs <= 24){
      greet = 'Good Evening';
    }
     console.log(greet)

  return (
    <div className="relative mb-5"> 
    
      {/* Content */}
      <div className="relative shadow-2xl rounded-3xl p-5 mt-1 inline-block  welbanner">      
  
      {/* <img src={bnner}/> */}
      <h2 className="text-3xl md:text-2xl text-slate-800 font-bold mb-0 getHeading ">{greet}, {groups}👋🏻</h2>  
      <div>     
         {userId ? <p style={{fontSize:'12px', fontWeight:'600', color:'black'}}>Logged in as {userId} </p> : <p style={{fontSize:'12px', fontWeight:'500', color:'black'}}>Not logged in</p>}
      </div>  
      
            {/* <div>  
              <h1>User Groups</h1> 
                 <ul> 
                  {groups.map(group => (
                      <li key={group.groupName}>{group.groupName}</li>  
                      ))}
                  </ul>    
            </div> */}
       {/* <p>Have a nice Day</p> */}
       </div>      
      <div className="w-100 float-right p-1.5 mr-0 inline-block ">       
       <WeatherDashboard />     
        </div>     
         {/* <div class="elfsight-app-c4e913cb-808c-481b-9278-61fffacd9421"></div> */}
    </div>
      );
}
export default WelcomeBanner;