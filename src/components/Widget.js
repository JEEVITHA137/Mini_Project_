import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

// Preparing the chart data
const chartData = [
  {
    label: "1",
    value: "3"
  },
  {
    label: "2",
    value: "2"
  },
  {
    label: "3",
    value: "4"
  },
  {
    label: "4",
    value: "5"
  },
  {
    label: "5",
    value: "1"
  },
  
];


const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: {
   chart: {
   caption: "IR SENSOR",  
   subCaption: "",
   xAxisName: "no of trials",
   yAxisName: "object found or not",
   numberSuffix: "",
   theme: "fusion"
 },
 data: chartData
  }
};

class Widget extends Component {
  render () {
    return <ReactFC {...chartConfigs} />;
  }
}

export default Widget;
