import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./Home.css";

const axios = require('axios').default;
class AutoComplete extends Component {
    constructor(props) {
        super(props);

        this.item = ["Kids Story Books", "Psycology", "Literature", "Regional", "JEE NEET", "Agriculture Science ", "Space Science", "Engineering", "History", "Buisness"]
        this.state = {
            suggestions: [],
            text: "",
            round: false
        }
    }

    componentDidMount() {

    }


    handleAutoChange = (e) => {
        const value = e.target.value;
        let suggestions = []
        if (value.length > 0) {

            suggestions = this.item.sort().filter((v) => this.state.text === '' || v.includes(this.state.text))
            this.setState({ suggestions, text: value, round: true })
        } else {
            this.setState({ round: false })
        }
        this.setState({ suggestions, text: value })

    }

    suggestionsSelected = (item) => {
        this.setState({
            text: item,
            suggestions: [],
            round: false
        }, () => {

            axios.get(`http://localhost:5000/category/getId`)
                .then((response) => {

                    response.data.map((cat, index, array) => {

                        if (array[index].categoryName === item) {

                            this.props.history.push({
                                pathname: '/specificproduct',
                                state: { categId: array[index].categoryId }
                            })
                        }

                    })

                }).catch((err) => {
                    alert(err.message)
                })
        })
    }

    render() {
        return (
            <>
                <div className="SearchHolder">
                    <input type="search" className="Search"
                        value={this.state.text}
                        onChange={this.handleAutoChange} />

                </div>

                <ul className={this.state.round ? "searchList" : "visiSearch"}>
                    {this.state.suggestions.map((item) => <li onClick={() => this.suggestionsSelected(item)}>{item}</li>)}
                </ul>
            </>
        )
    }
}
export default withRouter(AutoComplete)