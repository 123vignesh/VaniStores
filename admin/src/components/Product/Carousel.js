import React, { Component } from 'react'
import { Carousel } from "react-responsive-carousel";
export default class Carousels extends Component {


    render() {

        return (

            <Carousel>
                {this.props.children}
            </Carousel>

        )
    }
}
