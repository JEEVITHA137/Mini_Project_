import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import './Widget.css';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);



class BarGraph extends Component {
  state = {
    type: 'column2d',
    width: 710,
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
   data: []
    }
  };

 componentDidMount(){
      this.getBarGraphValues()
 }

 getBarGraphValues = _ =>{
      fetch(`http://localhost:4000/irsensor/${this.props.ApiKey}`)
      .then(response=>response.json())
      .then(response=>{
        var newData = this.state.dataSource;
        newData.data = response.data;
        this.setState({dataSource:newData})
      })
      .catch(err=>console.log(err))
  }
  render () {
    return (
      <div className="graph">
         <ReactFC {...this.state} />
      </div>
    );
  }
}

export default BarGraph;
