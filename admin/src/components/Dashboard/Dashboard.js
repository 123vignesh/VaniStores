import React, { Component } from 'react'
import Chart from '../chart/chart'
import Example from './PiChart'
import MTable from './UserTable'

import './DashboardUi.scss'
export default class Dashboard extends Component {
    render() {
        return (


            <div className="ChartAllign">
                <Example />
                <Chart />
                <MTable />
            </div>



        )
    }
}
