import React, { Component } from 'react'

import OrderDataTable from './OrderTable'

import "../Category/Category.css"

export default class Order extends Component {

    render() {
        return (

            <div className="AllignTable">
                <OrderDataTable />
            </div>



        )
    }
}
