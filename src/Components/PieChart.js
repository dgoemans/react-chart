import React, { Component } from 'react';
import {render} from 'react-dom';
import './Common.css';
import './PieChart.css';

class PieChart extends Component {

    componentWillMount() {
        this.colors = [
            '#3982D2',
            '#899EE8',
            '#8B7AEB',
            '#935BCD',
            '#BB6BCE',
            '#CF4384',
            '#EA3A22',
            '#EE7B28',
            '#F3AF2F',
            '#FBE739',
            '#76CE38',
            '#4DA338',
            '#61C478',
            '#65D1AE',
            '#93DADC',
            '#75B6D2',
            '#A6D9FD'
        ];

        this.setState({
            tooltip: '',
            mouseX: 0,
            mouseY: 0
        });
    }

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
            let colorIndex = Math.floor( (index/data.length) * this.colors.length);
            let color = dataSet.color || this.colors[colorIndex];
            let computed = this._getArc(dataSet.name, dataSet.amount, startAngle, center, radius, color);
            arcs.push(computed);

            if(dataSet.name === this.state.hovered) {
                hoveredArc = computed;
            }

            startAngle += dataSet.amount * Math.PI*2;

            let legendItem = this._getLegend(dataSet.name, dataSet.amount, color);

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

    _getLegend(name, percent, color) {

        return (<div key={name} className='react-chart-legend-row'>
                <div className='react-chart-legend-box' style={{backgroundColor: color}}></div>
                <span className='react-chart-legend-label'>{name}</span>
            </div>);
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
        
        return (<path key={dataSetName} d={`M ${x} ${y}
                A ${radiusLessStroke} ${radiusLessStroke}, 0, 0, 1, ${x2} ${y2}
                L ${center} ${center} Z`}
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

    _setTooltip(event, name = '', percent = null) {

        let percentText = '';

        if(percent !== null) {
            percentText = ' (' + Math.round(percent*10000)/100 + '%)';
        }

        this.setState({
            hovered: name,
            tooltip: name + percentText,
            mouseX: event.clientX,
            mouseY: event.clientY
        });
    }
}

PieChart.defaultProps = {
    legend: true,
    hoverColor: '#ccc',
    strokeColor: '#ffffff'
}

export default PieChart;