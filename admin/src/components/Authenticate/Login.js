import React, { Component } from 'react'

import { Link, withRouter } from "react-router-dom";


import './login.css'
import './Signup.css'
import SimpleReactValidator from 'simple-react-validator';
import { DataContext } from '../Context'
const axios = require('axios').default;

class Login extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            checked: false
        }
        this.validator = new SimpleReactValidator()
    }

    handlelogin = (e) => {
        if (this.validator.allValid()) {

            let loginData = {
                email: this.state.email,
                password: this.state.password
            }

            this.props.loginUser(loginData)
                .then((result) => {
                    this.context.fetchCart()
                    this.props.history.push('/home')
                }).catch((err) => {
                    alert(err)
                })
            e.preventDefault()
        } else {
            this.validator.showMessages();

            this.forceUpdate();
        }



    }

    render() {
        return (
            <>
                <section className="LoginSection">

                    <form className="loginForm">
                        <div className="StoreCard">

                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <input type="email"
                                value={this.state.email}
                                className="SignupInputs" placeholder="Email" required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            email: e.target.value
                                        })
                                    }
                                }
                                onBlur={() => this.validator.showMessageFor('email')}
                            />
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('email', this.state.email, 'required|email')}
                            </div>
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <input type="password"
                                value={this.state.password}
                                className="SignupInputs" placeholder="Password" required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                }
                                onBlur={() => this.validator.showMessageFor('password')}
                            />
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('password', this.state.password, 'required')}
                            </div>
                        </div>

                        <div>
                            <input type="checkbox" id="forgot" name="forgot" value={this.state.checked} />
                            <label style={{ fontSize: "20px", fontWeight: "600" }} for="forgot">Forgot Password?</label>
                        </div>

                        <div>
                            <button type="submit" className="SignupButton"
                                onClick={this.handlelogin}
                            >Login</button>
                        </div>

                        <Link to="/signup" className="linkStyle">
                            <div className="PageChange" style={{ display: 'flex', justifyContent: 'center' }}>
                                Signup ?
                            </div>
                        </Link>
                    </form>
                </section>

            </>
        )
    }
}

export default withRouter(Login);