import React, { Component } from 'react'
import { Checkbox } from 'antd';

import './CheckBox.css'

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.priceList = [
            {
                "_id": 1,
                "price": ">2000"
            },
            {
                "_id": 2,
                "price": "1000-2000"
            },
            {
                "_id": 3,
                "price": "500-1000"
            },
            {
                "_id": 4,
                "price": "100-500"
            },
        ]

        this.state = {
            Checked: []
        }
    }

    handleToggle = (value) => {

        const currentIndex = this.state.Checked.indexOf(value);
        const newChecked = [...this.state.Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }


        this.setState({
            Checked: newChecked
        })
        this.props.handleFilters(newChecked)


    }


    render() {
        let renderCheckboxLists = () => this.priceList && this.priceList.map((value, index) => (
            <React.Fragment key={index}>
                <div className="CheckboxStyle">
                    <Checkbox
                        onChange={() => this.handleToggle(value._id)}
                        type="checkbox"
                        checked={this.state.Checked.indexOf(value._id) === -1 ? false : true}

                    />
                    <span className="FilterRupees">{value.price}<span style={{ paddingLeft: "5px" }}>₹</span></span>
                </div>
            </React.Fragment>
        ))
        return (
            <>
                <div className="CheckBoxHolder">
                    <h2>Filter By Price</h2>
                    {renderCheckboxLists()}
                    <b>______________________________</b>

                </div>


            </>
        )
    }
}
