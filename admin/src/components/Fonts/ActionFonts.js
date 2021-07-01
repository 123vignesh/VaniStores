import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalForm from '../Table/Modal';

const axios = require('axios').default;

/*    */



export default class ActionFonts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isClose: false
        }
    }

    componentDidMount() {


    }
    render() {


        return (
            <div>

                <div className="fontContainer">
                    <div>
                        <FontAwesomeIcon icon={faTrash}
                            className="fontDelEdit"
                            onClick={this.props.handleDelete}

                        />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEdit}
                            className="fontDelEdit"

                            onClick={this.props.handleEdit}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
