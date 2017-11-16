import React, { Component } from 'react';
import {render} from 'react-dom';
import * as Constants from './Constants'
import BaseChart from './BaseChart'

import './Common.css';
import './LineChart.css';


class LineChart extends BaseChart {
    render() {

        let strokeWidth = 3;
        let data = this.props.data;
        let height = this.props.height - strokeWidth;
        let legend = [];
        let lines = [];
        let pointSpacing = this.props.width / (data.length-1);

        // TODO: Max of data across all data sets

        let maxAmount = Math.max.apply(Math, data.map(dataSet =>  Math.max.apply(Math, dataSet.points)));
        

        data.forEach((dataSet, index) => {
            let colorIndex = Math.floor( (index/data.length) * Constants.colors.length);
            let color = dataSet.color || Constants.colors[colorIndex];
            let name = dataSet.name;

            let pathData = ''
            
            let x = 0;
            let y = 0;

            dataSet.points.forEach((point, index) => {
                
                x = pointSpacing*index;
                y = height - (point/maxAmount)*height + strokeWidth/2;

                pathData += x + ',' + y + ' ';
            });

            if(this.props.fillArea) {
                pathData += x + ',' + height + ' ';
                pathData += 0 + ',' + height + ' ';
            }

            let legendItem = this._getLegend(name, color);
            legend.push(legendItem);

            let path = <polyline key={dataSet.name} 
                points={pathData} 
                className='react-chart-line'
                stroke={color}
                strokeWidth={strokeWidth}
                fill={this.props.fillArea ? color: 'none'}
                fillOpacity={this.props.fillArea ? 0.9 : 0}
                strokeLinecap='round'
                strokeLinejoin='round'
            />;

            lines.push(path);
            
        });

        return (<div className='react-chart'>
                <svg height={height} width={this.props.width} xmlns="http://www.w3.org/2000/svg">
                    {lines}
                </svg>
                <div className={'react-chart-tooltip ' + (this.state.hovered ? 'visible' : 'hidden')} 
                    style={{top: this.state.mouseY, left: this.state.mouseX }}>
                    <span>{this.state.tooltip}</span>
                </div>
                <div className={'react-chart-legend ' + (this.props.legend ? 'visible' : 'hidden')}>
                    {legend}
                </div>
            </div>);
    }

    _
}

LineChart.defaultProps = {
    legend: true,
    fillArea: false
}

export default LineChart;