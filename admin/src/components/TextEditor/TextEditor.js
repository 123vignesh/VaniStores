import React, { Component } from 'react'

import CKEditor from "react-ckeditor-component";

import './TextEditor.css'

export default class TextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        }
    }

    componentDidMount() {
        this.setState({
            content: this.props.disc
        })
    }
    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }

    onChange = (evt) => {
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();

        this.setState({
            content: newContent,

        })

    }

    onBlur(evt) {
        //console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt) {
        //console.log("afterPaste event called with event info: ", evt);
    }

    render() {
        return (
            <CKEditor
                activeClass="p10"
                content={this.state.content}
                events={{
                    "blur": this.onBlur,
                    "afterPaste": this.afterPaste,
                    "change": this.onChange
                }}

            >
                {this.props.disc}
            </CKEditor>
        )
    }
}



