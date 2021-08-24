import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import one from './images/one.jpg'
import history from './images/history.jpg'
import Kids from './images/Kids.jpg'
import Space from './images/Space.jpg'
import Agriculture from './images/Agriculture.jpg'
import Journalism from './images/Journalism.jpg'
import Psychology from './images/Psycology.jpg'
import Literature from './images/Literature.jpg'
import Engineering from './images/Engineering.jpg'
import Regional from './images/Reginol.jpg'
import Two from './images/Two.jpg'
import Health from './images/Health.jpg'
import './Home.css'

const axios = require('axios').default;
export default class HomeCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {

            idArrays: [],
            categId: "",
            finalCardArray: []
        }


    }

    componentDidMount() {
        axios.get(`http://localhost:5000/category/getId`)
            .then((response) => {


                let cardArray = [];

                cardArray.push(
                    <>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[2].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={one} />

                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Business"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[3].categoryId, categName: response.data[3].categoryName }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={history} style={{ objectFit: "cover" }} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"History"}</h2>
                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[9].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Space} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Space Science"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[8].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Agriculture} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Agriculture"}</h2>

                                </figcaption>
                            </div>
                        </Link>

                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[1].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Journalism} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Journalism"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[4].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Psychology} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Psychology"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[5].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Literature} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Literature"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[10].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Engineering} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Engineering"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[6].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Regional} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Regional"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[0].categoryId, categName: response.data[0].categoryName }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Kids} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"Kids"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/specificproduct",
                            state: { categId: response.data[7].categoryId }

                        }}>
                            <div className="card">
                                <figure>
                                    <img src={Two} />
                                </figure>
                                <figcaption className="card-body">
                                    <h2>{"JEE/NEET"}</h2>

                                </figcaption>
                            </div>
                        </Link>
                        <div className="card">
                            <figure>
                                <img src={Health} />
                            </figure>
                            <figcaption className="card-body">
                                <h2>{"Health"}</h2>

                            </figcaption>
                        </div>
                    </>
                )

                this.setState({
                    finalCardArray: cardArray
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }
    render() {
        return (
            <>
                <div className="TopCategories">
                    <div className="TopCategoryHeader">
                        <h2>Categories</h2>
                    </div>

                    <div className="CategoriesCard">

                        {this.state.finalCardArray}
                    </div>
                </div>

            </>
        )
    }
}
