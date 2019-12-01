import React from 'react';
import { colors } from './Constants'
import { BaseChart } from './'

import './Common.css';
import './LineChart.css';


export const LineChart = class extends BaseChart {
    render() {

        let strokeWidth = 3;
        let data = this.props.data;
        let height = this.props.height - strokeWidth*2;
        let legend = [];
        let graphs = [];

        let maxPoints = Math.max.apply(Math, data.map(dataSet =>  dataSet.points.length));

        let pointSpacing = this.props.width / (maxPoints-1);

        let maxAmount = Math.max.apply(Math, data.map(dataSet =>  Math.max.apply(Math, dataSet.points)));
        

        data.forEach((dataSet, index) => {
            let colorIndex = Math.floor( (index/data.length) * colors.length);
            let color = dataSet.color || colors[colorIndex];
            let name = dataSet.name;

            let pathData = '';
            
            let x = 0;
            let y = 0;

            let graphPoints = [];

            dataSet.points.forEach((point, index) => {
                
                x = pointSpacing*index;
                y = height - (point/maxAmount)*(height - strokeWidth);

                pathData += x + ',' + y + ' ';

                let node = <circle 
                        key={dataSet.name + '-' + index}
                        cx={x} 
                        cy={y} 
                        r={strokeWidth}
                        fill={color}
                        onMouseOver={(event) => this._setTooltip(event, name, point)}
                        onMouseOut={(event) => this._setTooltip(event, '')}
                        onMouseMove={(event) => this._setTooltip(event, name, point)}
                    />;

                graphPoints.push(node);
            });

            if(this.props.fillArea) {
                pathData += x + ',' + this.props.height + ' ';
                pathData += 0 + ',' + this.props.height + ' ';
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

            graphs.push(path);
            
            graphs = graphs.concat(graphPoints);
        });

        return (<div className='react-chart'>
                <svg height={height} width={this.props.width} xmlns="http://www.w3.org/2000/svg">
                    {graphs}
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
}

LineChart.defaultProps = {
    legend: true,
    fillArea: false
}