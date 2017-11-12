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

        data.forEach((dataSet, index) => {
            let colorIndex = Math.floor( (index/data.length) * this.colors.length);
            let color = dataSet.color || this.colors[colorIndex];
            let computed = this._getArc(dataSet.name, dataSet.amount, startAngle, center, radius, color);
            arcs.push(computed);
            startAngle += dataSet.amount * Math.PI*2;

            let legendItem = this._getLegend(dataSet.name, dataSet.amount, color);

            legend.push(legendItem);
        });

        return (<div className='react-chart'>
            <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
                {arcs}
            </svg>
            <div className={'react-chart-tooltip ' + (this.state.tooltip ? 'visible' : 'hidden')} 
                style={{top: this.state.mouseY, left: this.state.mouseX }}>
                {this.state.tooltip}
            </div>
            <div className='react-chart-legend'>
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
        let angle = percent * Math.PI*2;
        let x = Math.cos(startAngle)*radius + center;
        let y = Math.sin(startAngle)*radius + center;
        let endAngle = startAngle + angle;
        let x2 = Math.cos(endAngle)*radius + center;
        let y2 = Math.sin(endAngle)*radius + center;
        
        return (<path key={dataSetName} d={`M ${x} ${y}
                A ${radius} ${radius}, 0, 0, 1, ${x2} ${y2}
                L ${center} ${center} Z`}
                fill={arcColor}
                onMouseOver={(event) => this._setTooltip(event, dataSetName)}
                onMouseOut={(event) => this._setTooltip(event, '')}
                onMouseMove={(event) => this._setTooltip(event, dataSetName)}
                className='react-chart-segment'>
            </path>);
    }

    _setTooltip(event, name) {
        this.setState({
            tooltip: name,
            mouseX: event.clientX,
            mouseY: event.clientY
        });
    }
}

export default PieChart;