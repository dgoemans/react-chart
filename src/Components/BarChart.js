import React from 'react';
import { colors } from './Constants'
import { BaseChart } from './'

import './Common.css';
import './BarChart.css';


export const BarChart = class extends BaseChart {

    render() {
        const { data, height } = this.props;

        let bars = [];
        let legend = [];
        
        const maxAmount = Math.max.apply(Math, data.map(data => data.amount));

        data.forEach((dataSet, index) => {
            const colorIndex = Math.floor( (index/data.length) * colors.length);
            const color = dataSet.color || colors[colorIndex];

            const barHeight = dataSet.amount/maxAmount * height;            
            const computed = this._getBar(dataSet.name, dataSet.amount, barHeight, color);
            bars.push(computed);

            const legendItem = this._getLegend(dataSet.name, color);
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
        const showTooltip = (event) => {
            this._setTooltip(event, name, amount)
        }
        const clearTooltip = (event) => this._clearTooltip(event);

        return <div key={name} 
                style={{backgroundColor: color, height: height}} 
                className='react-chart-bar'
                onMouseOver={showTooltip}
                onMouseOut={clearTooltip}
                onMouseMove={showTooltip}
            >
            </div>
    }
}

BarChart.defaultProps = {
    legend: true,
}