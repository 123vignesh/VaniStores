import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../styleFunctions'

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from './Context'


const axios = require('axios').default;

class HeaderComponent extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    notifySuccessLogout = () => toast.success("Logged-out Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 1500 });
    render() {
        const { cart, fetchCart } = this.context;

        const StyledBadge = withStyles((theme) => ({
            badge: {
                right: -2,
                top: 8,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '15 4px',
                fontSize: "15px"

            },
        }))(Badge);

        let handleLogout = () => {
            this.props.logoutUser()
            this.notifySuccessLogout()
            fetchCart()

        }

        return (
            <>
                <header className="HeaderSection">
                    <section className="App-header">
                        <div className="HeaderFonts">
                            <div className="StoreLogo">

                            </div>
                            <div>
                                <Link to="/cart"  >
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={cart.length}
                                            color="primary">
                                            <ShoppingCartIcon
                                                style={IconStyling.styleListShopIcon} />
                                        </StyledBadge>
                                    </IconButton>
                                </Link>
                            </div>
                            <div className="user">
                                <div className={this.props.auth.isAuthenticated ? "NotSignedHidden" : "NotSigned"}>
                                    <Link to='/signup'>
                                        <button className="HeaderButton">
                                            Signup / Login
                                        </button>
                                    </Link>
                                </div>

                                <div className="KeepVisible">
                                    <div className={this.props.auth.isAuthenticated ? "SignedUser" : "NotSignedHidden"}>
                                        <h2>V</h2>
                                    </div>

                                    <div class="dropdown-content">

                                        <Link to="/dashboard" style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                            <li
                                                className={this.props.auth.isAuthenticated ? (this.props.auth.user.email === "vigneshmsmg2000@gmail.com" ? "visi" : "NonVisi") : "nav__submenu-item "}>
                                                <a>Dashboard</a>
                                            </li>
                                        </Link>

                                        <Link to='/category' style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                            <li className={this.props.auth.isAuthenticated ? (this.props.auth.user.email === "vigneshmsmg2000@gmail.com" ? "visi" : "NonVisi") : "nav__submenu-item "}>
                                                <a>Category</a>
                                            </li>
                                        </Link>

                                        <Link to='/addproduct' style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                            <li className={this.props.auth.isAuthenticated ? (this.props.auth.user.email === "vigneshmsmg2000@gmail.com" ? "visi" : "NonVisi") : "nav__submenu-item "}>
                                                <a>Add Products</a>
                                            </li>
                                        </Link>

                                        <Link to="/product" style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                            <li className="nav__submenu-item ">
                                                <a>Products</a>
                                            </li>
                                        </Link>

                                        <Link to='/order' style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                            <li className={this.props.auth.isAuthenticated ? (this.props.auth.user.email === "vigneshmsmg2000@gmail.com" ? "visi" : "NonVisi") : "nav__submenu-item "}>
                                                <a>Orders</a>
                                            </li>
                                        </Link>

                                        <Link to='/home' style={{ textDecoration: 'none', color: "black", width: "100%" }}>
                                            <li className="nav__submenu-item "
                                                onClick={handleLogout}
                                            >
                                                <a>Logout</a>
                                            </li>
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>


                    </section>

                </header >
            </>
        )
    }
}

export default withRouter(HeaderComponent);

