// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import { useState, useEffect } from 'react';
import { NovuProvider, PopoverNotificationCenter, NotificationBell, } from '@novu/notification-center';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';



function NotificationBell2() {

  const [animationActive, setAnimationActive] = useState(true);

  const handleAnimationEnd = () => {
    setAnimationActive(false);
  };

  const iconStyle = {
    color: '#fff280',
    fontSize: '25px',
    animation: animationActive ? 'shake 2s infinite' : 'none',
    marginLeft: '9px',
    marginTop:'5px',
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#1782b0',
    marginLeft:'5px',
  };

  const countStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'red',
    color: 'white',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const unseenCount = 3; // Replace with your actual unseen count
    
    return (
      <span className='absolute right-10'>
      <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'zDm_IZTxT00Q'}>
        <PopoverNotificationCenter theme={'light'} colorScheme={'light'}>
          {({ unseenCount }) => (
            <div style={containerStyle}>
              <FontAwesomeIcon 
               icon={faBell}
              style={iconStyle}
              onClick={handleAnimationEnd} />
              {unseenCount > 0 && (
                <span style={countStyle}>{unseenCount}</span>
              )}
            </div>
          )}
        </PopoverNotificationCenter>
      </NovuProvider>
    </span>
    );
  }
  
  
export default NotificationBell2;
