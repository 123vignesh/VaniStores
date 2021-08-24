import React, { Component } from 'react';

import SimpleReactValidator from 'simple-react-validator';

import { notifyFailure, notifyInfo } from '../../NotifyFunctions'
import { forgotpasswordUrl } from '../../Link';
import { PostFunction } from '../../AxiosFunctions.js'

export default class Email extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: ""
        }
        this.validator = new SimpleReactValidator()
    }




    handleEmailLink = (e) => {

        let data = {
            email: this.state.email
        }

        let result = PostFunction(data, forgotpasswordUrl)

        result
            .then((response) => {
                notifyInfo(response.data.message)
            })
            .catch((err) => {
                notifyFailure(err)
            })


        e.preventDefault()
    }


    render() {
        return (
            <>
                <section className="LoginSection">
                    <form className="loginForm">
                        <div style={{ marginBottom: "5px" }}>
                            <input type="email"
                                value={this.state.email}
                                className="SignupInputs" placeholder="Registered Email" required
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

                            <div>
                                <button type="submit" className="SignupButton"
                                    onClick={(e) => this.handleEmailLink(e)}
                                >Send Link</button>
                            </div>
                        </div>

                    </form>
                </section>
            </>
        )
    }

}

