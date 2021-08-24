import React, { Component } from 'react'

import { Modal } from 'react-responsive-modal';

import "./ModalForm.css"

export default class ModalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {


        return (
            <>
                <Modal open={this.props.open} onClose={this.props.onClose} center>
                    {this.props.children}

                </Modal>
            </>
        )
    }
}









