import React, { Component } from 'react';
import {render} from 'react-dom';

class BaseChart extends Component {

    componentWillMount() {
        this.setState({
            tooltip: '',
            mouseX: 0,
            mouseY: 0
        });
    }

    _getAmountString(amount) {
        return amount.toFixed(2);
    }

    _setTooltip(event, name = '', amount = null) {
        
        let percentText = '';

        if(amount !== null) {
            percentText = ' (' + this._getAmountString(amount) + ')';
        }

        this.setState({
            hovered: name,
            tooltip: name + percentText,
            mouseX: event.clientX,
            mouseY: event.clientY
        });
    }

    _getLegend(name, percent, color) {
        
        return (<div key={name} className={'react-chart-legend-row' + ((this.state.hovered === name) ? '  selected' : '') }>
                <div className='react-chart-legend-box' style={{backgroundColor: color}}></div>
                <span className='react-chart-legend-label'>{name}</span>
            </div>);
    }
};

export default BaseChart;