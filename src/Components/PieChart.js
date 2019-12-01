import React from 'react';
import { colors } from './Constants'
import { BaseChart } from './'

import './Common.css';
import './PieChart.css';

export const PieChart = class extends BaseChart {
    render() {
        let data = this.props.data;

        let size = this.props.size;
        let arcs = [];
        let legend = [];
        let center = size/2;
        let radius = size/2;
        
        // Start at North
        let startAngle = -Math.PI/2;

        let hoveredArc = null;

        data.forEach((dataSet, index) => {
            let colorIndex = Math.floor( (index/data.length) * colors.length);
            let color = dataSet.color || colors[colorIndex];
            let computed = this._getArc(dataSet.name, dataSet.amount, startAngle, center, radius, color);
            arcs.push(computed);

            if(dataSet.name === this.state.hovered) {
                hoveredArc = computed;
            }

            startAngle += dataSet.amount * Math.PI*2;

            let legendItem = this._getLegend(dataSet.name, color);

            legend.push(legendItem);
        });

        arcs.sort((a,b) => {
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
        let strokeWidth = 4;
        let isHovered = dataSetName === this.state.hovered;
        let radiusLessStroke = radius - strokeWidth;
        let angle = percent * Math.PI*2;
        let x = Math.cos(startAngle)*radiusLessStroke + center;
        let y = Math.sin(startAngle)*radiusLessStroke + center;
        let endAngle = startAngle + angle;
        let x2 = Math.cos(endAngle)*radiusLessStroke + center;
        let y2 = Math.sin(endAngle)*radiusLessStroke + center;

        let closing = `L ${center} ${center} Z`;

        let large = (endAngle - startAngle) > Math.PI;

        if(this.props.donut) {
            let innerRadius = radiusLessStroke*this.props.donutThickness;
            let xInner = Math.cos(startAngle)*innerRadius + center;
            let yInner = Math.sin(startAngle)*innerRadius + center;
            let x2Inner = Math.cos(endAngle)*innerRadius + center;
            let y2Inner = Math.sin(endAngle)*innerRadius + center;

            closing = `L ${x2Inner} ${y2Inner}
                A ${innerRadius} ${innerRadius}, 0, ${large?1:0}, 0, ${xInner} ${yInner} Z`;
        }
        
        return (<path key={dataSetName} d={`M ${x} ${y}
                A ${radiusLessStroke} ${radiusLessStroke}, 0, ${large?1:0}, 1, ${x2} ${y2}
                ${closing}`}
                fill={arcColor}
                onMouseOver={(event) => this._setTooltip(event, dataSetName, percent)}
                onMouseOut={(event) => this._setTooltip(event, '')}
                onMouseMove={(event) => this._setTooltip(event, dataSetName, percent)}
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