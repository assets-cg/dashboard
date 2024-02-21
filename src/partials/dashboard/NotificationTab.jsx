// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NotificationTab() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      <button
        className="relative z-10 rounded-full p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
        onClick={handleNotificationClick}
      >
        <FontAwesomeIcon icon={faBell} className="text-gray-600" />
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full p-1 text-xs">
          3
        </span>
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white">
          <div className="px-4 py-2 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-2 hover:bg-gray-50">
              <a href="#" className="block">
                Notification 1
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-50">
              <a href="#" className="block">
                Notification 2
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-50">
              <a href="#" className="block">
                Notification 3
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationTab;
