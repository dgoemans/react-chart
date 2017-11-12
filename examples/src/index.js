import React from 'react';
import {render} from 'react-dom';
import { PieChart } from '../../dist/react-chart';
import './style.css';

class App extends React.Component {

    render () {
        return (<div className='root'>
            <div className='chart'>
                <span className='chart-title'>Pie Chart</span>
                <PieChart 
                    data={
                    [
                        {name: "USA", amount: 0.4},
                        {name:"Netherlands", amount: 0.25},
                        {name:"South Africa", amount: 0.10},
                        {name:"Maldives", amount: 0.15},
                        {name:"Belgium", amount: 0.15}
                    ]}
                    legend={true}
                    size={400}
                />
            </div>
        </div>);
    }
}

render(<App/>, document.getElementById('app'));