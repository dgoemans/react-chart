import React from 'react';
import { colors } from './Constants'
import { BaseChart } from './'

import './Common.css';
import './BarChart.css';


export const BarChart = class extends BaseChart {

    render() {
        let data = this.props.data;

        let height = this.props.height;
        let bars = [];
        let legend = [];
        
        let hoveredBar = null;

        let maxAmount = Math.max.apply(Math, data.map(data => data.amount));

        data.forEach((dataSet, index) => {
            let colorIndex = Math.floor( (index/data.length) * colors.length);
            let color = dataSet.color || colors[colorIndex];

            let barHeight = dataSet.amount/maxAmount * height;            
            let computed = this._getBar(dataSet.name, dataSet.amount, barHeight, color);
            bars.push(computed);

            if(dataSet.name === this.state.hovered) {
                hoveredBar = computed;
            }

            let legendItem = this._getLegend(dataSet.name, color);
            legend.push(legendItem);
        });

        return (<div className='react-chart'>
                <div className='react-chart-bars'>
                    {bars}
                </div>
                <div className={'react-chart-tooltip ' + (this.state.hovered ? 'visible' : 'hidden')} 
                    style={{top: this.state.mouseY, left: this.state.mouseX }}>
                    <span>{this.state.tooltip}</span>
                </div>
                <div className={'react-chart-legend ' + (this.props.legend ? 'visible' : 'hidden')}>
                    {legend}
                </div>
            </div>);
    }

    _getBar(name, amount, height, color) {
        return <div key={name} 
                style={{backgroundColor: color, height: height}} 
                className='react-chart-bar'
                onMouseOver={(event) => this._setTooltip(event, name, amount)}
                onMouseOut={(event) => this._setTooltip(event, '')}
                onMouseMove={(event) => this._setTooltip(event, name, amount)}
            >
            </div>
    }
}

BarChart.defaultProps = {
    legend: true,
}