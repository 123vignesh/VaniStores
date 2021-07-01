import React, { Component } from 'react'
import { Link } from 'react-router-dom'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../../styleFunctions'


import "./ProductCard.css"
import { DataContext } from '../Context'

const axios = require('axios').default;

export default class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Products: "",

        }

    }
    static contextType = DataContext;
    componentDidMount() {
        axios.get(`http://localhost:5000/category`)
            .then((response) => {
                console.log(response.data)
                var array = []
                for (let j = 0; j < response.data.length; j++) {

                    if (response.data[j].Products.length > 0) {

                        for (let k = 0; k < response.data[j].Products.length; k++) {

                            let data = response.data[j].Products[k];

                            data.Category = response.data[j].Category
                            data.catId = response.data[j]._id
                            data.proId = response.data[j].Products[k]._id

                            array.push(
                                <div className="card" >
                                    <div className="card-head">
                                        <img src={`http://localhost:5000/${data.mainImage[0].filename}`} alt="Shoe" className="product-img"
                                            width="350px" height="350px" />
                                    </div>
                                    <div className="card-body">
                                        <div className="product-desc">

                                            <span className="product-title">
                                                <b>{data.productName}</b>
                                                <span class="badge">
                                                    New
                                                </span>
                                            </span>

                                            <span className="product-rating">
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStar}
                                                />
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStar}
                                                />
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStar}
                                                />
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStar}
                                                />
                                                <FontAwesomeIcon icon={faStarHalf}
                                                    style={IconStyling.styleListStar}
                                                />

                                            </span>

                                        </div>
                                        <div class="product-properties">
                                            <span className="product-button1Space">

                                                <Link to={{
                                                    pathname: "/productdetails",
                                                    state: { fromProduct: data }

                                                }}
                                                >
                                                    <button className="product-button1">View Details</button>
                                                </Link>
                                            </span>
                                            <span >
                                                <button className="product-button2"
                                                    onClick={
                                                        () => this.context.addCart(data)





                                                    }

                                                >Add to Cart</button>
                                            </span>


                                            <span >
                                                <div className="ProductPrice">  ₹<b>{data.productPrice}</b></div>

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                    }

                }

                this.setState({
                    Products: array,

                })
            }).catch((err) => {
                console.log(err)
            });
    }


    render() {




        return (
            <>

                {this.state.Products}
            </>
        )
    }
}
