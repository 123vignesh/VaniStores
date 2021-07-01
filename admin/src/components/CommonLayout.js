import React, { Component } from 'react'
import HeaderComponent from './header';

import '../App.css';
import SideBar from './sideBar';


const axios = require('axios').default;

export default class CommonLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navListIcon: false,

        }
    }
    render() {
        let ToggleFunction = () => {
            this.state.navListIcon ? this.setState({
                navListIcon: false
            }) : this.setState({
                navListIcon: true
            })

        }


        return (
            <>
                <SideBar NavListIcon={this.state.navListIcon} />
                <div className="Main">
                    <HeaderComponent NavListIcon={this.state.NavListIcon} onClick={() => ToggleFunction()}


                    />


                    <section className="MainBody" >

                        {this.props.children}
                    </section>
                </div>
            </>
        )
    }
}
