import React, { Component } from 'react'
import { Link } from "react-router-dom";

import SimpleReactValidator from 'simple-react-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './Signup.css'

import { notifySuccess, notifyFailure } from '../../NotifyFunctions';
import { signupUrl } from '../../Link';
import { PostFunction } from '../../AxiosFunctions.js'


export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            password: "",
            showPassword: false
        }
        this.validator = new SimpleReactValidator(
            {
                validators: {
                    password: {
                        message: '* Set Strong password with special char & number',
                        rule: (val, params, validator) => {
                            return validator.helpers.testRegex(val, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i) && params.indexOf(val) === -1
                        },

                        required: true
                    }
                }
            });
    }



    handleSubmit = (e) => {
        if (this.validator.allValid()) {
            let SignUpData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                mobileNumber: this.state.mobileNumber,
                email: this.state.email,
                password: this.state.password
            }

            let result = PostFunction(SignUpData, signupUrl)

            result
                .then((result) => {
                    if (result.data.success) {
                        notifySuccess("Registered Successfully");
                        this.props.history.push('/login')
                    } else {
                        notifyFailure("Registration Failed")
                    }
                }).catch((err) => {
                    notifyFailure(err)
                })

        } else {
            this.validator.showMessages();

            this.forceUpdate();
        }

        e.preventDefault()
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    render() {


        return (
            <>
                <section className="SignupSection">

                    <form className="SignupForm">

                        <div className="StoreCard"></div>

                        <div className="InputDiv">

                            <input
                                type="text"
                                className="SignupInputs"
                                value={this.state.firstName}
                                placeholder="First Name"
                                onChange={
                                    (e) => {
                                        this.setState({
                                            firstName: e.target.value
                                        })
                                    }
                                }
                                onBlur={() => this.validator.showMessageFor('firstName')}
                            />

                            <div className="ErrorMessage">
                                {this.validator.message('firstName', this.state.firstName, 'required|alpha')}
                            </div>


                        </div>

                        <div className="InputDiv">

                            <input
                                type="text"
                                className="SignupInputs"
                                value={this.state.lastName}
                                placeholder="Last Name"
                                required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            lastName: e.target.value
                                        })
                                    }
                                }

                                onBlur={() => this.validator.showMessageFor('lastName')}
                            />

                            <div className="ErrorMessage">
                                {this.validator.message('lastName', this.state.lastName, 'required|alpha')}
                            </div>
                        </div>

                        <div className="InputDiv">

                            <input
                                type="tel"
                                className="SignupInputs"
                                value={this.state.mobileNumber}
                                placeholder="Mobile No"
                                required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            mobileNumber: e.target.value
                                        })
                                    }
                                }

                                onBlur={() => this.validator.showMessageFor('mobileNumber')}
                            />

                            <div className="ErrorMessage">
                                {this.validator.message('mobileNumber', this.state.mobileNumber, 'required|phone')}
                            </div>
                        </div>

                        <div className="InputDiv">

                            <input
                                type="email"
                                className="SignupInputs"
                                value={this.state.email}
                                placeholder="Email"
                                required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            email: e.target.value
                                        })
                                    }
                                }


                                onBlur={() => this.validator.showMessageFor('email')}
                            />

                            <div className="ErrorMessage">
                                {this.validator.message('email', this.state.email, 'required|email')}
                            </div>
                        </div>

                        <div className=" passwordInput InputDiv">

                            <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} className="PasswordIcon" onClick={
                                this.handleClickShowPassword} />
                            <input
                                className="SignupInputs"
                                type={this.state.showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                }

                                onBlur={() => this.validator.showMessageFor('password')}


                            />
                            <div className="ErrorMessage">
                                {this.validator.message('password', this.state.password, 'required|password')}
                            </div>

                        </div>

                        <div className="SignButtonDiv">
                            <button type="submit" className="SignupButton"
                                onClick={this.handleSubmit}
                            >SignUp</button>
                        </div>

                        <Link to="/login" className="linkStyle">
                            <div className="PageChange">
                                Login ?
                            </div>
                        </Link>
                    </form>

                </section>
            </>
        )
    }
}
