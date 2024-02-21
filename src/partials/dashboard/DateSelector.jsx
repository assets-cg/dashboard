// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateSelector = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
      showTimeSelect={true}
      propperPlacement={'right'}
    />
  );
};

export default DateSelector;
