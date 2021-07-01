import React, { Component } from 'react'
import { Link } from "react-router-dom";

import './Signup.css'
import SimpleReactValidator from 'simple-react-validator';
const axios = require('axios').default;



export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            password: ""
        }
        this.validator = new SimpleReactValidator(
            {
                validators: {
                    password: {
                        message: '* Set Strong password with special char & number',
                        rule: (val, params, validator) => {
                            return validator.helpers.testRegex(val, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i) && params.indexOf(val) === -1
                        },

                        required: true  // optional
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

            axios.post(`http://localhost:5000/users/signup`, SignUpData)
                .then((result) => {
                    if (result.data.success) {
                        alert("User Successfully Registered")
                        this.props.history.push('/login')
                    }
                    else {

                        alert(result.data.err.message)
                        this.setState({
                            firstName: "",
                            lastName: "",
                            mobileNumber: "",
                            email: "",
                            password: ""
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            this.validator.showMessages();

            this.forceUpdate();
        }

        e.preventDefault()
    }


    render() {


        return (
            <>
                <section className="SignupSection">

                    <form className="SignupForm">
                        <div className="StoreCard">

                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <input type="text" className="SignupInputs"
                                value={this.state.firstName}
                                placeholder="First Name" onChange={
                                    (e) => {
                                        this.setState({
                                            firstName: e.target.value
                                        })
                                    }
                                }


                                onBlur={() => this.validator.showMessageFor('firstName')} />
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('firstName', this.state.firstName, 'required|alpha')}
                            </div>


                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <input type="text" className="SignupInputs"
                                value={this.state.lastName}
                                placeholder="Last Name" required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            lastName: e.target.value
                                        })
                                    }
                                }

                                onBlur={() => this.validator.showMessageFor('lastName')}
                            />
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('lastName', this.state.lastName, 'required|alpha')}
                            </div>
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <input type="tel" className="SignupInputs"
                                value={this.state.mobileNumber}
                                placeholder="Mobile No" required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            mobileNumber: e.target.value
                                        })
                                    }
                                }

                                onBlur={() => this.validator.showMessageFor('mobileNumber')}
                            />

                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('mobileNumber', this.state.mobileNumber, 'required|phone')}
                            </div>
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                            <input type="email" className="SignupInputs"
                                value={this.state.email}
                                placeholder="Email" required
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
                            <input type="password" className="SignupInputs"
                                value={this.state.password}
                                placeholder="Password" required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                }
                                onBlur={() => this.validator.showMessageFor('password')}
                            />
                            <div style={{ color: "#E75922 " }}>
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
