import React, { Component } from 'react';
import Graph from './Graph.js';
import BarGraph from './BarGraph';
import './Widget.css'

class Widget extends Component {

  render () {
    return (
       <div className="bg">
            <Graph ApiKey={this.props.ApiKey}/>
            <BarGraph ApiKey={this.props.ApiKey}/>
       </div>
    );
  }
}

export default Widget;
