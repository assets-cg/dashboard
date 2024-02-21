// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import { NovuProvider, PopoverNotificationCenter, NotificationCenter, NotificationBell } from '@novu/notification-center';
import { Novu_Url } from '../../config';

function NotificationWidget({ theme, colorScheme, unseenCount }) {

  const style = {
    boxShadow: 'none',
    border: 'none'
  }; 

  return (
    <div className="col-span-full xl:col-span-7 bg-custom2 rounded-3xl bg-custom2 shadow-2xl border-solid border-2 border-green-600">
      <div style={style} className="p-5 ml-20 border-solid border-2 border-green-600 ">

      <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'zDm_IZTxT00Q'}>
    <NotificationCenter theme={'light'} colorScheme={'light'}/>
    </NovuProvider>










      {/* <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'ZF7HAParNARp'}>
      <NotificationCenter theme={'light'} colorScheme={'light'}/> */}
      {/* <PopoverNotificationCenter allowedNotificationActions={false}>
         {({ unseenCount }) => <NotificationCenter theme={'light'} colorScheme={'light'} unseenCount={unseenCount} />} 
          </PopoverNotificationCenter>  */}
       {/* </NovuProvider> */}



        
      </div>
    </div>
  );
}

export default NotificationWidget;













// import { useState, useEffect } from 'react';
// import { NovuProvider, PopoverNotificationCenter, NotificationBell, } from '@novu/notification-center';


// function NotificationBell() {

    
//     return (
// <div className="col-span-full xl:col-span-5 bg-custom2 shadow-2xl p-8 border-solid border-2 border-green-600  h-96 rounded-3xl ">
//       <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'WnKQdh6P2SKH'}>
//       <PopoverNotificationCenter colorScheme={'light'}>
//          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />} 
//          </PopoverNotificationCenter> 
//       </NovuProvider>
//       </div>
//     );
//   }
  
  
//   export default NotificationBell;
