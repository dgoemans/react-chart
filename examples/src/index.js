import React from 'react';
import {render} from 'react-dom';
import { PieChart, BarChart } from '../../dist/react-chart';
import './style.css';

class App extends React.Component {

    render () {
        return (<div className='root'>
            <div className='chart'>
                <span className='chart-title'>Pie Chart</span>
                <PieChart 
                    data={
                    [
                        {name: "USA", amount: 0.4254},
                        {name:"Netherlands", amount: 0.2322},
                        {name:"South Africa", amount: 0.1716},
                        {name:"Maldives", amount: 0.121},
                        {name:"Belgium", amount: 0.0498}
                    ]}
                    legend={true}
                    size={400}
                />
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
        </div>);
    }
}

render(<App/>, document.getElementById('app'));