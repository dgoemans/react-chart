import React from 'react';
import { colors } from './Constants'
import { BaseChart } from './'

import './Common.css';
import './PieChart.css';

export const PieChart = class extends BaseChart {
    render() {
        const { data, size } = this.props;
        let arcs = [];
        let legend = [];
        let center = size/2;
        let radius = size/2;
        
        // Start at North
        let startAngle = -Math.PI/2;

        let hoveredArc = null;

        data.forEach((dataSet, index) => {
            const colorIndex = Math.floor( (index/data.length) * colors.length);
            const color = dataSet.color || colors[colorIndex];
            const computed = this._getArc(dataSet.name, dataSet.amount, startAngle, center, radius, color);
            arcs.push(computed);

            if(dataSet.name === this.state.hovered) {
                hoveredArc = computed;
            }

            startAngle += dataSet.amount * Math.PI*2;

            let legendItem = this._getLegend(dataSet.name, color);

            legend.push(legendItem);
        });

        arcs.sort((a,_) => {
            if(a === hoveredArc) {
                return 1;
            } else {
                return 0;
            }
        })

        return (<div className='react-chart'>
                <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
                    {arcs}
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

    _getAmountString(amount) {
        return Math.round(amount*10000)/100 + '%';
    }

    _getArc(dataSetName, percent, startAngle, center, radius, arcColor) {
        const strokeWidth = 4;
        const isHovered = dataSetName === this.state.hovered;
        const radiusLessStroke = radius - strokeWidth;
        const angle = percent * Math.PI*2;
        const x = Math.cos(startAngle)*radiusLessStroke + center;
        const y = Math.sin(startAngle)*radiusLessStroke + center;
        const endAngle = startAngle + angle;
        const x2 = Math.cos(endAngle)*radiusLessStroke + center;
        const y2 = Math.sin(endAngle)*radiusLessStroke + center;

        let closing = `L ${center} ${center} Z`;

        const large = (endAngle - startAngle) > Math.PI;

        if(this.props.donut) {
            const innerRadius = radiusLessStroke*this.props.donutThickness;
            const xInner = Math.cos(startAngle)*innerRadius + center;
            const yInner = Math.sin(startAngle)*innerRadius + center;
            const x2Inner = Math.cos(endAngle)*innerRadius + center;
            const y2Inner = Math.sin(endAngle)*innerRadius + center;

            closing = `L ${x2Inner} ${y2Inner}
                A ${innerRadius} ${innerRadius}, 0, ${large?1:0}, 0, ${xInner} ${yInner} Z`;
        }

        const showTooltip = (event) => {
            this._setTooltip(event, dataSetName, percent)
        }

        const clearTooltip = (event) => this._clearTooltip(event);
        
        return (<path key={dataSetName} d={`M ${x} ${y}
                A ${radiusLessStroke} ${radiusLessStroke}, 0, ${large?1:0}, 1, ${x2} ${y2}
                ${closing}`}
                fill={arcColor}
                onMouseOver={showTooltip}
                onMouseOut={clearTooltip}
                onMouseMove={showTooltip}
                className='react-chart-segment'
                stroke={isHovered ? this.props.hoverColor : this.props.strokeColor}
                strokeWidth={strokeWidth}
                strokeLinejoin='round'>
            </path>);
    }
}

PieChart.defaultProps = {
    legend: true,
    hoverColor: '#ccc',
    strokeColor: '#ffffff',
    donut: true,
    donutThickness: 0.6
}