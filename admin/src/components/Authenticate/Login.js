import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";

import SimpleReactValidator from 'simple-react-validator';
import { DataContext } from '../Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './login.css'
import './Signup.css'

import { notifyFailure, notifySuccess } from '../../NotifyFunctions';


class Login extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showPassword: false
        }
        this.validator = new SimpleReactValidator()
    }



    handlelogin = async (e) => {
        if (this.validator.allValid()) {

            let loginData = {
                email: this.state.email,
                password: this.state.password
            }

            this.props.loginUser(loginData)
                .then((result) => {
                    setTimeout(() => {
                        var a = localStorage.getItem('token');

                        if (a !== null) {
                            this.props.history.push('/')
                            notifySuccess("LoggedIn Successfully")
                        } else {

                            notifyFailure("wrong password or email")
                        }

                    }, 100)

                }).catch((err) => {
                    notifyFailure(err.message)
                })

        } else {
            this.validator.showMessages();

            this.forceUpdate();
        }



    }



    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
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

                        <div style={{ marginBottom: "5px" }}
                            className=" passwordInput"
                        >

                            <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} className="PasswordIcon" onClick={
                                this.handleClickShowPassword} />
                            <input type={this.state.showPassword ? "text" : "password"}
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

                        <Link to="/forgotpassword" className="linkStyle">
                            <div className="ForgotPassword">
                                <span style={{ fontSize: "20px", fontWeight: "600", cursor: "pointer" }}

                                >Forgot Password?</span>
                            </div>
                        </Link>


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