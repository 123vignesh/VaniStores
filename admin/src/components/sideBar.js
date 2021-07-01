import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './header.css'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faStore, faChartLine, faComment, faBook, faSitemap } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../styleFunctions'

export default class sideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

            NavListIcon: this.props.NavListIcon
        }

    }
    render() {

        return (

            <section className="sideBar" style={this.props.NavListIcon ? IconStyling.SideBarHidden : IconStyling.SideBarVisible}>
                <li className="HeaderName"><h2>Vani Stores</h2></li>
                <img />
                <div className="menuList">

                    <Link to="/dashboard" className="linkStyle">
                        <li className="sidebarList "><span style={{ paddingRight: "6px" }}><FontAwesomeIcon icon={faChartLine}
                        /></span>Dashboard</li>
                    </Link>


                    <Link to="/category" className="linkStyle">
                        <li className="sidebarList" ><span style={{ paddingRight: "6px" }}><FontAwesomeIcon icon={faSitemap}
                        /></span>Category</li>
                    </Link>

                    <Link to="/addproduct" className="linkStyle">
                        <li className="sidebarList"><span style={{ paddingRight: "6px" }}><FontAwesomeIcon icon={faCartPlus}
                        /></span>Add Products</li>
                    </Link>

                    <Link to="/product" className="linkStyle">
                        <li className="sidebarList"><span style={{ paddingRight: "6px" }}><FontAwesomeIcon icon={faStore}
                        /></span>Products</li>
                    </Link>

                    <Link to="/order" className="linkStyle">
                        <li className="sidebarList"><span style={{ paddingRight: "6px" }}><FontAwesomeIcon icon={faBook}
                        /></span>Orders</li>
                    </Link>

                    <Link to="#" className="linkStyle">
                        <li className="sidebarList"><span style={{ paddingRight: "6px" }}><FontAwesomeIcon icon={faComment}
                        /></span>Customer Chat</li>
                    </Link>
                </div>
            </section>
        )
    }
}

