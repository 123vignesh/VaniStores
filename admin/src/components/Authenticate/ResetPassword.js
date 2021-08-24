import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { notifyFailure, notifyInfo } from '../../NotifyFunctions'
import { PostFunction } from '../../AxiosFunctions';
const axios = require('axios').default;

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            confirmPassword: ""
        }
        this.validator = new SimpleReactValidator()
    }


    handleResetPassword = (e) => {
        if (this.state.confirmPassword === this.state.password) {

            let data = {
                confirmPassword: this.state.confirmPassword
            }

            const { id, token } = this.props.match.params;

            let ResetPasswordUrl = `http://localhost:5000/users/reset-password/:${id}/:${token}`

            let result = PostFunction(data, ResetPasswordUrl)
            result
                .then((response) => {

                    notifyInfo(response.data.message)

                }).catch((error) => {
                    notifyFailure(error)
                })
        } else {
            notifyInfo("Indifferent Passwords")
            this.setState({
                confirmPassword: ""
            })
        }

        e.preventDefault()
    }


    render() {

        return (
            <>
                <section className="LoginSection">
                    <form className="loginForm">
                        <div style={{ marginBottom: "5px" }}
                            className=" passwordInput"
                        >

                            <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} className="PasswordIcon" onClick={
                                this.handleClickShowPassword} />
                            <input type={this.state.showPassword ? "text" : "password"}
                                value={this.state.password}
                                className="SignupInputs" placeholder="New Password" required
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



                        <div style={{ marginBottom: "5px" }}
                            className=" passwordInput"
                        >

                            <FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} className="PasswordIcon" onClick={
                                this.handleClickShowPassword} />
                            <input type={this.state.showPassword ? "text" : "password"}
                                value={this.state.confirmPassword}
                                className="SignupInputs" placeholder="Confirm Password" required
                                onChange={
                                    (e) => {
                                        this.setState({
                                            confirmPassword: e.target.value
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
                            <button type="submit" className="SignupButton"
                                onClick={(e) => this.handleResetPassword(e)}
                            >Reset</button>
                        </div>
                    </form>
                </section>
            </>
        )

    }

}

