import React, { Component } from 'react'

import ProductCard from './ProductCard'

export default class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {

        return (


            <div className="AllignProductForm">


                <div className="container">

                    <ProductCard />

                </div>
            </div>

        )
    }
}
