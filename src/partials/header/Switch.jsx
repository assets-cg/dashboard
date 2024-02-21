// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { createContext, useState } from 'react';
import ReactSwitch from 'react-switch';

export const ThemeContext = createContext(null);

function Switch() {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
      };
  return (
    <div className='app' id={theme}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="switch1">
    <label> {theme === "light" ? "☀️" : "🌙"}</label>
    <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
  </div>
  </ThemeContext.Provider>
  </div>
  )
}

export default Switch