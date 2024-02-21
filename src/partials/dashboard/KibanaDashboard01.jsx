import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

function KibanaDashboard01(props) {
  const [iframeLoaded, setIframeLoaded] = useState(true);
  const [iframeWidth, setIframeWidth] = useState('100%'); // Initial width
  const iframeRef = useRef(null);

  // Function to update iframe width based on sidebar visibility
  const updateIframeWidth = () => {
    const sidebar = document.querySelector('.sidebar'); // Adjust this selector to target your sidebar
    const mainContent = document.querySelector('.main-content'); // Adjust this selector to target your main content
    if (sidebar && mainContent) {
      const newWidth = mainContent.offsetWidth - (sidebar.classList.contains('sidebar-closed') ? 0 : sidebar.offsetWidth);
      setIframeWidth(`${newWidth}px`);
    }
  };

  useEffect(() => {
    updateIframeWidth();
    window.addEventListener('resize', updateIframeWidth);
    return () => {
      window.removeEventListener('resize', updateIframeWidth);
    };
  }, []);

  const reloadIframe = () => {
    setIframeLoaded(false);
    setTimeout(() => {
      setIframeLoaded(true);
    }, 5000);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-12 bg-custom2 shadow-2xl border-solid border-2 border-green-600 rounded-3xl p-1 mt-4">
      <div className="px-3 pt-3">
        {/* <button
          className="bg-transparent text-lg text-gray-600 py-1 px-2"
          onClick={reloadIframe}
          title="reload frame"
        >
          <FontAwesomeIcon icon={faSync} />
        </button> */}
        <header className="flex justify-between items-start">
          {/* Additional header content can be added here if needed */}
        </header>
        <div className="relative">
          {iframeLoaded ? null : (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={`https://${localStorage.getItem('ELKUrl')}:5601/app/dashboards#/view/4b531290-3779-11ee-85ff-515c798d3c8d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-query-input=true&show-time-filter=true&hide-filter-bar=true`}
            height="3825"
            width={iframeWidth}
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default KibanaDashboard01;
