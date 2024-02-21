// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React from 'react';
import {XYPlot, XAxis, YAxis, HeatmapSeries} from 'react-vis';



function MetricsDashboard53() {

  const data = [
    {x: 1, y: 0, color: 10},
    {x: 1, y: 5, color: 12},
    {x: 1, y: 10, color: 5},
    {x: 1, y: 15, color: 15},
  ] 
  
  return (
    <XYPlot width={300} height={300}>
      <XAxis />
      <YAxis />
      <HeatmapSeries
        className="heatmap-series-example"
        data={data}
      />
    </XYPlot>
  );
}

export default MetricsDashboard53;