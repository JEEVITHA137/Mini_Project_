
import React, { Component } from "react";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import './Widget.css';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class Graph extends Component {
  state = {
    type: 'pie3d',
    renderAt: 'chart-container',
    width: '700',
    height: '500',
    dataFormat: 'json',
    dataSource: {
        chart: {
            caption: "Moisture Level Measure",
            numberPrefix: "",
            showPercentInTooltip: "100",
            theme: "fusion"
        },
        data:[
          {
              label:"Moisture Level",
              value:""
          },
          {
              label:"Non-Moisture Level",
              value:""
          }
        ]
    }
  }

  componentDidMount(){
    this.getGraphValues()
  }

  getGraphValues = _ =>{
    fetch(`http://localhost:4000/rainsensor/${this.props.ApiKey}`)
    .then(response=>response.json())
    .then(response=>{
      var newData = this.state.dataSource;
      newData.data[0].value = response.data[0].moisture;
      newData.data[1].value = response.data[0].Nonmoisture;
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

export default Graph;
