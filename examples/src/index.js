import React from 'react';
import {render} from 'react-dom';
import { PieChart, BarChart, LineChart } from '../../dist/react-chart';
import './style.css';

class App extends React.Component {

    render () {
        return (<div className='root'>
            <div className='chart'>
                <span className='chart-title'>Pie Chart</span>
                <PieChart 
                    data={
                    [
                        {name: "USA", amount: 0.7254},
                        {name:"Netherlands", amount: 0.1322},
                        {name:"South Africa", amount: 0.0716},
                        {name:"Maldives", amount: 0.021},
                        {name:"Belgium", amount: 0.0498}
                    ]}
                    legend={true}
                    size={400}
                />
            </div>
            <div className='chart'>
                <span className='chart-title'>Bar Chart</span>
                <BarChart 
                    data={
                    [
                        {name: "USA", amount: 101},
                        {name:"Netherlands", amount: 56.5},
                        {name:"South Africa", amount: 23.2555},
                        {name:"Maldives", amount: 3},
                        {name:"Belgium", amount: 45.76}
                    ]}
                    legend={true}
                    height={200}
                />
            </div>
            <div className='chart'>
                <span className='chart-title'>Line Chart</span>
                <LineChart 
                    data={
                    [
                        {name: "USA", points: [151,105,97,100,96]},
                        {name:"Netherlands", points: [65,51,62,75,35]},
                        {name:"South Africa", points: [42,32,54,67,23]},
                        {name:"Belgium", points: [32,46,12,48,23]},
                        {name:"Maldives", points: [25,12,5,0,37]}
                    ]}
                    legend={true}
                    height={200}
                    width={400}
                    fillArea={true}
                />
            </div>
        </div>);
    }
}

render(<App/>, document.getElementById('app'));